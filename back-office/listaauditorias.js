document.addEventListener("DOMContentLoaded", function () { 
  // === MENU DROPDOWN ===
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");

  // Fecha todos os submenus e coloca setas para cima ao carregar
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

      // Fecha outros submenus e reseta setas
      document.querySelectorAll(".submenu").forEach(s => {
        if (s !== submenu) s.style.display = "none";
      });
      document.querySelectorAll(".arrow").forEach(a => {
        if (a !== arrow) a.style.transform = "rotate(0deg)";
      });

      // Alterna submenu clicado
      if (submenu && submenu.style.display === "block") {
        submenu.style.display = "none";
        if (arrow) arrow.style.transform = "rotate(0deg)";
      } else if (submenu) {
        submenu.style.display = "block";
        if (arrow) arrow.style.transform = "rotate(180deg)";
      }
    });
  });
});

// --- Código para carregar, mostrar auditorias e pesquisar ---

document.addEventListener("DOMContentLoaded", function () {
  const tabela = document.querySelector("#tabelaAuditorias tbody");
  let auditorias = [];

  function carregarAuditorias() {
    auditorias = JSON.parse(localStorage.getItem("pedidos")) || [];
    const aprovados = auditorias.filter(p => p.estado === "aprovado");
    renderAuditorias(aprovados);
  }

  function mostrarMensagemTabela(msg) {
    tabela.innerHTML = "";
    const row = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 5;
    td.textContent = msg;
    td.classList.add("tabela-vazia");
    row.appendChild(td);
    tabela.appendChild(row);
  }

  function renderAuditorias(lista, origem = "") {
    tabela.innerHTML = "";

    if (lista.length === 0) {
      mostrarMensagemTabela(
        origem === "pesquisa" 
          ? "Nenhum resultado encontrado." 
          : "Sem auditorias aprovadas."
      );
      return;
    }

    lista.forEach(pedido => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${pedido.id}</td>
        <td>${pedido.descricao}</td>
        <td>${pedido.cliente}</td>
        <td>${pedido.data}</td>
        <td class="estado verde">
          <img src="aprovado.svg" alt="Aprovado" width="34" height="34" />
        </td>
      `;
      tabela.appendChild(row);
    });
  }

  document.getElementById("searchBtn").addEventListener("click", function () {
    const termo = document.getElementById("searchInput").value.toLowerCase().trim();
    if (!termo) {
      renderAuditorias(auditorias.filter(p => p.estado === "aprovado"));
      return;
    }
    const resultados = auditorias.filter(p => {
      return (
        p.estado === "aprovado" &&
        (
          String(p.id).includes(termo) ||
          p.descricao.toLowerCase().includes(termo) ||
          p.cliente.toLowerCase().includes(termo) ||
          p.data.toLowerCase().includes(termo)
        )
      );
    });
    renderAuditorias(resultados, "pesquisa");
  });

  document.getElementById("searchInput").addEventListener("input", function () {
    if (this.value.trim() === "") {
      renderAuditorias(auditorias.filter(p => p.estado === "aprovado"));
    }
  });

  carregarAuditorias();
});
