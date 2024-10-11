<?php
require __DIR__ . '/vendor/autoload.php'; // Carrega o autoload do Composer para o Mercado Pago

// Configuração das credenciais do Mercado Pago
MercadoPago\SDK::setAccessToken('SEU_ACCESS_TOKEN');

// Captura os dados enviados pelo formulário
$nome = $_POST['nome'];
$email = $_POST['email'];
$telefone = $_POST['telefone'];
$nome_plano = $_POST['nome_plano'];
$preco = $_POST['preco'];

// Criação da preferência de pagamento
$preference = new MercadoPago\Preference();

// Configuração do item a ser pago
$item = new MercadoPago\Item();
$item->title = $nome_plano;
$item->quantity = 1;
$item->unit_price = floatval($preco);
$preference->items = array($item);

// Configuração para pagamento via PIX
$preference->payment_methods = array(
    "excluded_payment_types" => array(),
    "default_payment_method_id" => "pix"
);

// URLs de retorno
$preference->back_urls = array(
    "success" => "https://seusite.com/sucesso.php",
    "failure" => "https://seusite.com/falha.php",
    "pending" => "https://seusite.com/pendente.php"
);
$preference->auto_return = "approved";

// Salva a preferência
$preference->save();

// Redireciona para o link de pagamento do Mercado Pago
header("Location: " . $preference->init_point);
exit;
