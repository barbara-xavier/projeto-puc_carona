const URL = 'http://localhost:3000/usuarios';

function realizarLogin() {
    const email = document.getElementById('email_input').value;
    const senha = document.getElementById('senha_input').value;

    fetch(URL)
        .then(res => res.json())
        .then(usuarios => {
            const usuarioEncontrado = usuarios.find(usuario => usuario.email === email && usuario.senha === senha);

            if (usuarioEncontrado) {

               // Armazena o ID do usuário logado no localStorage
                localStorage.setItem('idUsuarioLogado', usuarioEncontrado.id);
                
                // Usuário válido, redirecionar para a página de sucesso ou executar alguma ação desejada
                window.location.href = 'Corridas-Disponiveis.html';
            } else {
                // Usuário inválido, exibir mensagem de erro ou executar alguma ação desejada
                alert('Email ou senha inválidos. Tente novamente, ou faça o cadastro');
            }
        })
        .catch(error => {
            // Ocorreu um erro ao carregar os usuários do JSON
            console.error('Erro ao carregar usuários:', error);
        });
}


// Função para salvar as alterações do usuário logado
function salvarAlteracoes() {
    const idUsuarioLogado = localStorage.getItem('idUsuarioLogado'); // Obtém o ID do usuário logado do localStorage
}



