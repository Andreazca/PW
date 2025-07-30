
document.addEventListener("DOMContentLoaded", function () {
  // === MENU DROPDOWN ===
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");

  // Garante que todos os submenus estão fechados e setas para cima ao carregar
  document.querySelectorAll(".submenu").forEach(s => s.style.display = "none");
  document.querySelectorAll(".arrow").forEach(a => a.style.transform = "rotate(0deg)");

  dropdownBtns.forEach(btn => {
    btn.addEventListener("mouseenter", function () {
      const arrow = this.querySelector(".arrow");
      // Corrige: encontra o submenu correto apenas entre os irmãos do <li>
      let submenu = null;
      if (this.parentElement && this.parentElement.classList.contains("dropdown")) {
        submenu = this.parentElement.querySelector(".submenu");
      }
      if (arrow && (!submenu || submenu.style.display !== "block")) {
        arrow.style.transform = "rotate(180deg)";
      }
    });
    btn.addEventListener("mouseleave", function () {
      const arrow = this.querySelector(".arrow");
      let submenu = null;
      if (this.parentElement && this.parentElement.classList.contains("dropdown")) {
        submenu = this.parentElement.querySelector(".submenu");
      }
      if (arrow && (!submenu || submenu.style.display !== "block")) {
        arrow.style.transform = "rotate(0deg)";
      }
    });
    btn.addEventListener("click", function (e) {
      e.preventDefault();

      // Corrige: encontra o submenu correto apenas entre os irmãos do <li>
      let submenu = null;
      if (this.parentElement && this.parentElement.classList.contains("dropdown")) {
        submenu = this.parentElement.querySelector(".submenu");
      }
      const arrow = this.querySelector(".arrow");

      // Fecha todos os outros submenus e reseta setas
      document.querySelectorAll(".submenu").forEach(s => {
        if (s !== submenu) s.style.display = "none";
      });
      document.querySelectorAll(".arrow").forEach(a => {
        if (a !== arrow) a.style.transform = "rotate(0deg)";
      });

      // Alterna o submenu clicado
      if (submenu && submenu.style.display === "block") {
        submenu.style.display = "none";
        if (arrow) arrow.style.transform = "rotate(0deg)";
      } else if (submenu) {
        submenu.style.display = "block";
        if (arrow) arrow.style.transform = "rotate(180deg)";
      }
    });
  });
  const tabela = document.querySelector("#tabelaMateriais tbody");

  function renderTabela(dados) {
    tabela.innerHTML = "";
    dados.forEach(item => {
      tabela.innerHTML += `
        <tr>
          <td>${item.id}</td>
          <td>${item.nome}</td>
          <td>${item.tipo || ""}</td>
          <td>${item.descricao || ""}</td>
          <td>${item.stock}</td>
          <td>${item.preco !== undefined ? item.preco : (item.custo !== undefined ? item.custo : "")}€</td>
        </tr>
      `;
    });
  }

  // Usa localStorage se existir, senão carrega do ficheiro
  const local = localStorage.getItem("materiais");
  let dados = [];

  if (local) {
    try {
      dados = JSON.parse(local);
    } catch (e) {
      console.warn("Erro ao ler localStorage, limpando...");
      localStorage.removeItem("materiais");
    }
  }

  if (Array.isArray(dados) && dados.length > 0) {
    renderTabela(dados);
  } else {
    fetch("materiais.json")
        .then(response => response.json())
        .then(data => {
          renderTabela(data);
          localStorage.setItem("materiais", JSON.stringify(data));
        })
        .catch(error => {
          console.error("Erro ao carregar materiais.json:", error);
          tabela.innerHTML = `<tr><td colspan="6">Erro ao carregar dados.</td></tr>`;
        });
  }


  // Atualiza a tabela se o localStorage mudar (ex: após criar auditoria ou finalizar)
  window.addEventListener("storage", function (e) {
    if (e.key === "materiais") {
      const dados = JSON.parse(localStorage.getItem("materiais")) || [];
      renderTabela(dados);
    }
  });
});
