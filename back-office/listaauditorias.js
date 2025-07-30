// --- listaauditorias.js com localStorage ---

document.addEventListener("DOMContentLoaded", function () {
  const tabela = document.querySelector("#tabelaAuditorias tbody");

  function carregarAuditorias() {
    const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const aprovados = pedidos.filter(p => p.estado === "aprovado");
    renderAuditorias(aprovados);
  }

  function renderAuditorias(lista) {
    tabela.innerHTML = "";
    lista.forEach(pedido => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${pedido.id}</td>
        <td>${pedido.descricao}</td>
        <td>${pedido.cliente}</td>
        <td>${pedido.data}</td>
        <td class="estado verde">✔️</td>
      `;
      tabela.appendChild(row);
    });
  }

  carregarAuditorias();
});

