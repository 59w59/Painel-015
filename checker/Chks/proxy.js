const axios = require('axios');
const fs = require('fs');
const chalk = require('chalk');
const readline = require('readline');
const { Worker } = require('worker_threads');

// Função para checar o proxy
async function checkProxy(proxy, port, dblive) {
    try {
        const response = await axios.get('https://ipinfo.io/json', {
            proxy: {
                host: proxy,
                port: port
            },
            timeout: 5000
        });

        const data = response.data;
        const city = data.city || 'Cidade nao disponivel';
        const region = data.region || 'Regiao nao disponivel';
        const country = data.country || 'Pais nao disponivel';

        console.log(chalk.green(`[ LIVE ] ${proxy}:${port} - [ ${city}, ${region} - ${country} ]`));

        if (dblive) {
            const item = `${proxy}:${port} | ${city}, ${region} - ${country} \n`;
            fs.appendFileSync(dblive, item, 'utf-8');
        }
    } catch (error) {
        console.log(chalk.red(`[ DIE ] ${proxy}:${port} `));
    }
}

// Função principal
function main() {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout
    });

    rl.question('Insira a lista a ser checada >>>  ', (db) => {
        rl.question('Insira a lista para armazenar as proxys live >>>  ', (dblive) => {
            const fileContent = fs.readFileSync(db, 'utf-8').split('\n');
            const threads = [];

            fileContent.forEach(line => {
                const [proxy, port] = line.split(':');
                if (proxy && port) {
                    const worker = new Worker(() => {
                        checkProxy(proxy, port, dblive);
                    });
                    threads.push(worker);
                }
            });

            // Aguarda todas as threads terminarem
            Promise.all(threads).then(() => {
                rl.close();
            });
        });
    });
}

// Iniciar o programa
main();
