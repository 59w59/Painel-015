<?php
include 'includes/admin_check.php';

if (!verificarAdmin()) {
    echo "Acesso negado.";
    exit;
}
?>
<!-- Conteúdo da página -->
