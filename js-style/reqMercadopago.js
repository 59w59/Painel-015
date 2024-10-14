async function startPayment(valor) {

    if(valor === 70.00){

        try {
            // console.log(`Iniciando pagamento de ${valor} reais`);
    
            const response = await fetch('http://localhost:3000/create-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ valor })
            });
    
            const data = await response.json();
    
            // console.log('Dados recebidos da API:', data);
    
            if (data.chavePix && data.qrCodeImg) {

                document.querySelector(`#qrOne`).src = data.qrCodeImg;
    
                document.getElementById('modalOne').style.display = 'none';
                document.getElementById('payOne').style.display = 'flex';
            } else {
                console.error('Erro ao obter o QR code ou chave PIX.');
            }
        } catch (error) {
            console.error('Erro ao iniciar o pagamento:', error);
        }

    }
    else if(valor === 250){

        try {
            // console.log(`Iniciando pagamento de ${valor} reais`);
    
            const response = await fetch('http://localhost:3000/create-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ valor })
            });
    
            const data = await response.json();
    
            // console.log('Dados recebidos da API:', data); // Depuração
    
            if (data.chavePix && data.qrCodeImg) {
                
                document.querySelector(`#qrTwo`).src = data.qrCodeImg;
    
                document.getElementById('modalTwo').style.display = 'none';
                document.getElementById('payTwo').style.display = 'flex';
            } else {
                console.error('Erro ao obter o QR code ou chave PIX.');
            }
        } catch (error) {
            console.error('Erro ao iniciar o pagamento:', error);
        }

    }
    else if(valor === 750){

        try {
            // console.log(`Iniciando pagamento de ${valor} reais`);
    
            const response = await fetch('http://localhost:3000/create-payment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ valor })
            });
    
            const data = await response.json();
    
            // console.log('Dados recebidos da API:', data); // Depuração
    
            if (data.chavePix && data.qrCodeImg) {
                
                document.querySelector(`#qrThree`).src = data.qrCodeImg;
    
                document.getElementById('modalThree').style.display = 'none';
                document.getElementById('payThree').style.display = 'flex';
            } else {
                console.error('Erro ao obter o QR code ou chave PIX.');
            }
        } catch (error) {
            console.error('Erro ao iniciar o pagamento:', error);
        }

    }
    
}