document.addEventListener('DOMContentLoaded', async function () {
    const form = document.getElementById('loginToDash');
    if (form) {
        form.addEventListener('submit', async function (event) {
            event.preventDefault();

            const user = document.getElementById('user').value;
            const senha = document.getElementById('senha').value;
            const errorText = document.getElementById('errorText');

            function time(n) {
                return new Promise(function (resolve) {
                    setTimeout(resolve, n * 1000);
                });
            }


            async function validateUser(user, senha) {
                try {
                    const response = await fetch(`http://localhost/Sites/Central%20015/private/db/schemas/auth_login.php?user=${encodeURIComponent(user)}&senha=${encodeURIComponent(senha)}`);
                    const data = await response.json();

                    if (data.error) {

                        console.log('Houve um erro ao validar usuário.');
                        return null;

                    } else if (data.exists) {

                        return 'Existe';
                    } else {
                        return 'Não Existe';
                    }
                } catch (error) {
                    console.error("Erro na requisição:", error);
                    return null;
                }
            }

            async function checkUser(user, senha) {
                const result = await validateUser(user, senha);

                return result
            }


            const resultUser = await checkUser(user, senha)
            console.log(resultUser)


            if (resultUser == 'Existe') {

                Toastify({
                    text: "Login realizado com sucesso! Redirecionando...",
                    duration: 3000,
                    style: {
                        background: "#07bd1f",
                    }
                }).showToast();


                setTimeout(() => {
                    window.location.href = "../public/dashboard.php";
                }, 3000);

            } else {

                Toastify({
                    text: "As credências inseridas não são validas.",
                    duration: 2000,
                    style: {
                        background: "#ff0505",
                    }
                }).showToast();

            }
        });
    } else {
        console.error('Formulário não encontrado.');
    }
});