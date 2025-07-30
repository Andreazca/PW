// --- listaocorrencias.js ---

document.addEventListener("DOMContentLoaded", function () {
  const tabela = document.querySelector("#tabelaOcorrencias tbody");

  function carregarOcorrencias() {
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const historico = pedidos.filter(p => p.estado !== "pendente");
    renderTabela(historico);
  }

  function renderTabela(lista) {
    tabela.innerHTML = "";
    lista.forEach(pedido => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${pedido.id}</td>
        <td>${pedido.descricao}</td>
        <td>${pedido.cliente}</td>
        <td>${pedido.data}</td>
        <td class="${pedido.estado}">${pedido.estado.toUpperCase()}</td>
      `;
      tabela.appendChild(row);
    });
  }

  carregarOcorrencias();
});
