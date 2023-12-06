const URL = 'http://localhost:3000/usuarios';

function salvarAlteracoes() {
    const idUsuarioLogado = localStorage.getItem('idUsuarioLogado'); // Obtém o ID do usuário logado do localStorage
    
    const nome = document.getElementById('nome_input').value;
    const telefone = document.getElementById('tel_input').value;
    const genero = document.getElementById('genero').value;
    const rua = document.getElementById('tx_endereco').value;
    const bairro = document.getElementById('bairro').value;
    const numero = document.getElementById('numero_casa').value;
    const cidade = document.getElementById('cidade').value;
    const vinculo = document.getElementById('vinculo').value;

    fetch(`${URL}/${idUsuarioLogado}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            nome,
            telefone,
            genero,
            rua,
            bairro,
            numero,
            cidade,
            vinculo
        })
    })
        .then(res => res.json())
        .then(usuarioAtualizado => {
            console.log('Dados do usuário atualizados:', usuarioAtualizado);
            // Executar alguma ação desejada após salvar as alterações
            alert('Dados do usuário atualizados com sucesso!');
        })
        .catch(error => {
            // Ocorreu um erro ao salvar as alterações
            console.error('Erro ao salvar as alterações:', error);
        });
}

function verificarUsuarioLogado() {
    const idUsuarioLogado = localStorage.getItem('idUsuarioLogado');
    if (idUsuarioLogado) {
        fetch(`${URL}/${idUsuarioLogado}`)
            .then(res => res.json())
            .then(usuario => {
                document.getElementById('nome_input').value = usuario.nome;
                document.getElementById('tel_input').value = usuario.telefone;
                document.getElementById('genero').value = usuario.genero;
                document.getElementById('tx_endereco').value = usuario.rua;
                document.getElementById('bairro').value = usuario.bairro;
                document.getElementById('numero_casa').value = usuario.numero;
                document.getElementById('cidade').value = usuario.cidade;
                document.getElementById('vinculo').value = usuario.vinculo;
            })
            .catch(error => {
                console.error('Erro ao recuperar dados do usuário:', error);
            });
    } else {
        alert('Nenhum usuário logado. Faça o login para acessar essa página!');
        //window.location.href = 'login.html';
    }
}

document.getElementById('btn_SalvarAlteracoes').addEventListener('click', function(event) {
    event.preventDefault();
    const telefone = document.getElementById('tel_input');

    if (telefone.value === "") {
        alert("Preencha o telefone");
    } else if (isNaN(parseInt(telefone.value))) {
        alert(`DIGITE APENAS NÚMEROS NO TELEFONE.
        Siga o padrão: xx9yyyyyyyy
        Sendo xx seu DDD e y seu número`)
    } else if (telefone.value.length != 11 ) {
        alert(`Telefone informado incorretamente.
        Siga o padrão: xx9yyyyyyyy
        Sendo xx seu DDD e y seu número`);
    } else {
        salvarAlteracoes();
    }
});

window.addEventListener('DOMContentLoaded', verificarUsuarioLogado);
