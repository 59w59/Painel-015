<?php
require 'vendor/autoload.php'; // Carrega a biblioteca do Stripe

// Inicializa a API do Stripe com a chave secreta de produção
\Stripe\Stripe::setApiKey('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'); // Substitua com sua chave secreta de produção

// Exibir erros para depuração
error_reporting(E_ALL);
ini_set('display_errors', 1);

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    if (isset($_POST['stripeToken'])) {
        $token = $_POST['stripeToken']; // Recebe o token do Stripe.js
        
        try {
            // Cria uma cobrança mínima para verificar o cartão
            $charge = \Stripe\Charge::create([
                'amount' => 100, // 1 USD em centavos
                'currency' => 'usd',
                'source' => $token,
                'description' => 'Verificação de cartão',
            ]);
            
            // Retorna resposta de sucesso em JSON
            echo json_encode(['message' => 'Cartão validado com sucesso']);
        } catch (\Stripe\Exception\CardException $e) {
            // Retorna erro detalhado se houver falha com o cartão
            echo json_encode(['message' => 'Erro com o cartão: ' . $e->getError()->message]);
        } catch (\Stripe\Exception\ApiErrorException $e) {
            // Retorna erro de API se houver algum problema com a API
            echo json_encode(['message' => 'Erro de API: ' . $e->getMessage()]);
        } catch (Exception $e) {
            // Captura qualquer outro erro
            echo json_encode(['message' => 'Erro inesperado: ' . $e->getMessage()]);
        }
    } else {
        echo json_encode(['message' => 'Token não fornecido']);
    }
} else {
    echo json_encode(['message' => 'Método inválido']);
}
?>
