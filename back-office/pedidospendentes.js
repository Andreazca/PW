// --- pedidospendentes.js com localStorage ---

document.addEventListener("DOMContentLoaded", async function () {
  // === MENU DROPDOWN ===
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");

  document.querySelectorAll(".submenu").forEach(s => s.style.display = "none");
  document.querySelectorAll(".arrow").forEach(a => a.style.transform = "rotate(0deg)");

  dropdownBtns.forEach(btn => {
    btn.addEventListener("mouseenter", function () {
      const arrow = this.querySelector(".arrow");
      let submenu = this.parentElement.querySelector(".submenu");
      if (arrow && (!submenu || submenu.style.display !== "block")) {
        arrow.style.transform = "rotate(180deg)";
      }
    });
    btn.addEventListener("mouseleave", function () {
      const arrow = this.querySelector(".arrow");
      let submenu = this.parentElement.querySelector(".submenu");
      if (arrow && (!submenu || submenu.style.display !== "block")) {
        arrow.style.transform = "rotate(0deg)";
      }
    });
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      let submenu = this.parentElement.querySelector(".submenu");
      const arrow = this.querySelector(".arrow");

      document.querySelectorAll(".submenu").forEach(s => {
        if (s !== submenu) s.style.display = "none";
      });
      document.querySelectorAll(".arrow").forEach(a => {
        if (a !== arrow) a.style.transform = "rotate(0deg)";
      });

      if (submenu && submenu.style.display === "block") {
        submenu.style.display = "none";
        if (arrow) arrow.style.transform = "rotate(0deg)";
      } else if (submenu) {
        submenu.style.display = "block";
        if (arrow) arrow.style.transform = "rotate(180deg)";
      }
    });
  });

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

  function renderPedidos(lista = pedidos, origem = "") {
  tabela.innerHTML = "";

  const pendentes = lista.filter(p => p.estado === "pendente");

  if (pendentes.length === 0) {
    const row = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 5;
    td.textContent = origem === "pesquisa"
      ? "Nenhum resultado encontrado."
      : "Sem pedidos pendentes no momento.";
    td.classList.add("tabela-vazia");
    row.appendChild(td);
    tabela.appendChild(row);
    return;
  }

    pendentes.forEach((pedido, index) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${pedido.id}</td>
        <td>${pedido.descricao}</td>
        <td>${pedido.cliente}</td>
        <td>${pedido.data}</td>
        <td>
          <button class="btn-aprovar" onclick="aprovarPedido(${pedido.id})">Aprovar</button>
          <button class="btn-rejeitar" onclick="rejeitarPedido(${pedido.id})">Rejeitar</button>
          <button class="btn-devolver" onclick="devolverPedido(${pedido.id})">Devolver</button>
        </td>
      `;
      tabela.appendChild(row);
    });
  }

   // === Pesquisa com botão (lupa) ===
  document.getElementById("searchBtn").addEventListener("click", function () {
    const termo = document.getElementById("searchInput").value.toLowerCase().trim();
    if (!termo) {
      renderPedidos();
      return;
    }

    const pedidosFiltrados = pedidos.filter(p => {
      return (
        p.estado === "pendente" &&
        (
          String(p.id).includes(termo) ||
          p.descricao.toLowerCase().includes(termo) ||
          p.cliente.toLowerCase().includes(termo) ||
          p.data.toLowerCase().includes(termo)
        )
      );
    });

    renderPedidos(pedidosFiltrados, "pesquisa");
  });

  // === Voltar à lista completa ao limpar o campo de pesquisa ===
  document.getElementById("searchInput").addEventListener("input", function () {
    if (this.value.trim() === "") {
      renderPedidos();
    }
  });


  // === Funções de ação com toast ===
  window.aprovarPedido = function(id) {
  const idx = pedidos.findIndex(p => p.id === id);
  if (idx !== -1) {
    pedidos[idx].estado = "aprovado";
    guardarPedidosLocalmente();
    mostrarToast("Pedido aprovado com sucesso!");
    renderPedidos();
  }
};

  // === Toast ===
  function mostrarToast(mensagem) {
    const antigo = document.getElementById("toast-alert");
    if (antigo) antigo.remove();

    const toast = document.createElement("div");
    toast.id = "toast-alert";
    toast.textContent = mensagem;
    toast.style.position = "fixed";
    toast.style.top = "32px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#f9f6ef";
    toast.style.color = "#1a3d63";
    toast.style.padding = "16px 32px";
    toast.style.borderRadius = "10px";
    toast.style.fontSize = "17px";
    toast.style.boxShadow = "0 2px 12px rgba(0,0,0,0.13)";
    toast.style.zIndex = "9999";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";

    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = "1"; }, 50);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 400);
    }, 2200);
  }

  function pedirMotivo(titulo, callback) {
  const modal = document.getElementById("motivoModal");
  const input = document.getElementById("motivoInput");
  modal.querySelector("h3").textContent = titulo;
  input.value = "";
  modal.style.display = "flex";
  input.focus();

  function fechar() {
    modal.style.display = "none";
    document.getElementById("motivoCancelar").removeEventListener("click", fechar);
    document.getElementById("motivoConfirmar").removeEventListener("click", confirmar);
  }
  function confirmar() {
    fechar();
    callback(input.value.trim());
  }
  document.getElementById("motivoCancelar").addEventListener("click", fechar);
  document.getElementById("motivoConfirmar").addEventListener("click", confirmar);
}

// Exemplo de uso ao rejeitar:
window.rejeitarPedido = function(id) {
  const idx = pedidos.findIndex(p => p.id === id);
  if (idx !== -1) {
    pedirMotivo("Indique o motivo da rejeição:", function(motivo) {
      pedidos[idx].estado = "rejeitado";
      pedidos[idx].motivo = motivo || "";
      guardarPedidosLocalmente();
      mostrarToast("Pedido rejeitado!");
      renderPedidos();
    });
  }
};

// Exemplo de uso ao devolver:
window.devolverPedido = function(id) {
  const idx = pedidos.findIndex(p => p.id === id);
  if (idx !== -1) {
    pedirMotivo("Indique o motivo da devolução:", function(motivo) {
      pedidos[idx].estado = "devolver";
      pedidos[idx].motivo = motivo || "";
      guardarPedidosLocalmente();
      mostrarToast("Pedido devolvido para mais informações!");
      renderPedidos();
    });
  }
};


  await carregarPedidos();
});
