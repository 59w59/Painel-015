<link rel="stylesheet" href="../../css/modal.css">
<!-- subscribeModal.php -->
<div id="plano2Modal" class="modal">
    <div class="modal-content">
        <span class="close" onclick="fecharModal('plano2Modal')">&times;</span>
        <h2>Assinar Plano 2</h2>
        <form action="processarPlano.php" method="POST">
            <div class="input-group">
                <label for="username">Nome de Usuário</label>
                <input type="text" id="username" name="username" placeholder="Como você quer ser chamado?" required>
            </div>
            <div class="input-group">
                <label for="email">Endereço de E-mail</label>
                <input type="email" id="email" name="email" placeholder="Seu email principal aqui" required>
            </div>
            <div class="input-group">
                <label for="password">Senha de Acesso</label>
                <input type="password" id="password" name="password" placeholder="Crie uma senha forte e segura" required>
            </div>
            <div class="payment-methods">
                <h3>Como deseja pagar?</h3>
                <button type="button" class="payment-btn">PIX</button>
                <button type="button" class="payment-btn">Bitcoin</button>
                <button type="button" class="payment-btn">Ethereum</button>
                <button type="button" class="payment-btn">Litecoin</button>
            </div>
            <div class="modal-actions">
                <button type="button" class="btn-cancel" onclick="fecharModal('plano2Modal')">Fechar</button>
                <button type="submit" class="btn-primary">Continuar</button>
            </div>
        </form>
    </div>
</div>
