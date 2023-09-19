document.getElementById('login-button').addEventListener('click', function() {
    const password = document.getElementById('password').value;
    if (password === '0000') {
        window.location.href = 'home.html'; // Redireciona para a página home após o login bem-sucedido
    } else {
        alert('Senha incorreta. Tente novamente.');
    }
});
