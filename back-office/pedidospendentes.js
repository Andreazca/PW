// --- pedidospendentes.js com localStorage ---

document.addEventListener("DOMContentLoaded", async function () {
  const tabela = document.querySelector("#tabelaPendentes tbody");
  let pedidos = [];

  async function carregarPedidos() {
    try {
      const guardados = localStorage.getItem("pedidos");
      if (guardados) {
        pedidos = JSON.parse(guardados);
      } else {
        const resposta = await fetch("pedidos.json");
        pedidos = await resposta.json();
        guardarPedidosLocalmente();
      }
      renderPedidos();
    } catch (erro) {
      console.error("Erro ao carregar pedidos:", erro);
    }
  }

  function guardarPedidosLocalmente() {
    localStorage.setItem("pedidos", JSON.stringify(pedidos));
  }

  function renderPedidos() {
    tabela.innerHTML = "";
    pedidos.forEach((pedido, index) => {
      if (pedido.estado === "pendente") {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${pedido.id}</td>
          <td>${pedido.descricao}</td>
          <td>${pedido.cliente}</td>
          <td>${pedido.data}</td>
          <td>
            <button class="btn-aprovar" onclick="aprovarPedido(${index})">Aprovar</button>
            <button class="btn-rejeitar" onclick="rejeitarPedido(${index})">Rejeitar</button>
            <button class="btn-devolver" onclick="devolverPedido(${index})">Devolver</button>
          </td>
        `;
        tabela.appendChild(row);
      }
    });
  }

  window.aprovarPedido = function(index) {
    pedidos[index].estado = "aprovado";
    guardarPedidosLocalmente();
    alert("Pedido aprovado!");
    renderPedidos();
  };

  window.rejeitarPedido = function(index) {
    pedidos[index].estado = "rejeitado";
    guardarPedidosLocalmente();
    alert("Pedido rejeitado!");
    renderPedidos();
  };

  window.devolverPedido = function(index) {
    pedidos[index].estado = "devolver";
    guardarPedidosLocalmente();
    alert("Pedido devolvido para mais informações!");
    renderPedidos();
  };

  await carregarPedidos();
});

