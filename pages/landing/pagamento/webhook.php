<!-- webhook.php -->
<?php
// Verifica se a requisição é do Mercado Pago
$input = file_get_contents('php://input');
$event = json_decode($input);

if ($event && $event->type === 'payment') {
    $payment_id = $event->data->id;

    // Aqui, você verifica o status do pagamento com a API do Mercado Pago
    MercadoPago\SDK::setAccessToken('SEU_ACCESS_TOKEN');
    $payment = MercadoPago\Payment::find_by_id($payment_id);

    if ($payment->status === 'approved') {
        // Pagamento aprovado, crie a conta do usuário e ative o plano
        // (Você pode buscar informações do cliente no banco de dados, por exemplo)
    }
}
