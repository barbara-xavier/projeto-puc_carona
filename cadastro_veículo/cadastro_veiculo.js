const URL = 'http://localhost:3000/usuarios';

function salvarAlteracoesVeiculo() {
  const idUsuarioLogado = localStorage.getItem('idUsuarioLogado'); // Obtém o ID do usuário logado do localStorage

  const CNH = document.getElementById('cnh').value;
  const CRLV = document.getElementById('crlv').value;
  const placa = document.getElementById('placa').value;
  const modelo = document.getElementById('modelo').value;

  fetch(`${URL}/${idUsuarioLogado}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      CNH,
      CRLV,
      placa,
      modelo
    })
  })
    .then(res => res.json())
    .then(usuarioAtualizado => {
      console.log('Dados do usuário atualizados:', usuarioAtualizado);
      // Executar alguma ação desejada após salvar as alterações
      alert('Dados do veículo atualizados com sucesso!');
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
        document.getElementById('cnh').value = usuario.CNH;
        document.getElementById('crlv').value = usuario.CRLV;
        document.getElementById('placa').value = usuario.placa;
        document.getElementById('modelo').value = usuario.modelo;
      })
      .catch(error => {
        console.error('Erro ao recuperar dados do usuário:', error);
      });
  } else {
    alert('Nenhum usuário logado. Faça o login para acessar essa página!');
    // window.location.href = 'login.html';
  }
}

document.getElementById('btn_salvarVeiculos').addEventListener('click', function(event) {
  event.preventDefault();
  salvarAlteracoesVeiculo();
});

window.addEventListener('DOMContentLoaded', verificarUsuarioLogado);
