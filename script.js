document.getElementById('login-button').addEventListener('click', function() {
    const password = document.getElementById('password').value;
    if (password === '6969') {
        window.location.href = 'root/dashboard'; // Redireciona para a página de dashboard após o login bem-sucedido
    } else {
        alert('Senha incorreta. Tente novamente.');
    }
});
