document.addEventListener("DOMContentLoaded", function () {

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

  const tabela = document.querySelector("#tabelaOcorrencias tbody");
  let pedidos = [];

  function carregarOcorrencias() {
    pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
    const historico = pedidos.filter(p => p.estado !== "pendente"); // Só estados finalizados
    renderTabela(historico);
  }

function renderTabela(lista, origem = "") {
  tabela.innerHTML = "";

  if (lista.length === 0) {
    const row = document.createElement("tr");
    const td = document.createElement("td");
    td.colSpan = 5;
    td.textContent = origem === "pesquisa"
      ? "Nenhum resultado encontrado."
      : "Sem ocorrências registadas.";
    td.classList.add("tabela-vazia");
    row.appendChild(td);
    tabela.appendChild(row);
    return;
  }

  lista.forEach(pedido => {
    const row = document.createElement("tr");
    row.innerHTML = `
      <td>${pedido.id}</td>
      <td>${pedido.descricao}</td>
      <td>${pedido.cliente}</td>
      <td>${pedido.data}</td>
      <td class="estado ${pedido.estado}">
        ${
          pedido.estado === "aprovado" ? '<img src="aprovado.svg" alt="Aprovado" width="34" height="34">' :
          pedido.estado === "rejeitado" ? '<img src="rejeitado.svg" alt="Rejeitado" width="34" height="34">' :
          pedido.estado === "devolver" ? '<img src="devolvido.svg" alt="Devolver" width="34" height="34">' :
          ""
        }
      </td>
    `;
    tabela.appendChild(row);
  });
}

  document.getElementById("searchBtn").addEventListener("click", function () {
  const termo = document.getElementById("searchInput").value.toLowerCase().trim();
  if (!termo) {
    renderTabela(pedidos.filter(p => p.estado !== "pendente"));
    return;
  }

  const resultados = pedidos.filter(p => {
    return (
      p.estado !== "pendente" &&
      (
        String(p.id).includes(termo) ||
        p.descricao.toLowerCase().includes(termo) ||
        p.cliente.toLowerCase().includes(termo) ||
        p.data.toLowerCase().includes(termo)
      )
    );
  });
  renderTabela(resultados, "pesquisa");  
});

  document.getElementById("searchInput").addEventListener("input", function () {
    if (this.value.trim() === "") {
      renderTabela(pedidos.filter(p => p.estado !== "pendente"));
    }
  });

  carregarOcorrencias();
});
