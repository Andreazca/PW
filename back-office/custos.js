document.addEventListener("DOMContentLoaded", function () {
  // === SIDEBAR FUNCIONAL ===
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");

  dropdownBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const submenu = this.nextElementSibling;
      const arrow = this.querySelector(".arrow");

      if (submenu.style.display === "block") {
        submenu.style.display = "none";
        arrow.style.transform = "rotate(0deg)";
      } else {
        submenu.style.display = "block";
        arrow.style.transform = "rotate(180deg)";
      }
    });
  });

  // === TABELA DE CUSTOS ===
  const tabela = document.querySelector(".cost-table tbody");

  function renderTabela(dados) {
    tabela.innerHTML = "";

    // Adiciona o custo por hora no topo
    tabela.innerHTML += `
      <tr>
        <td>Custo por Hora</td>
        <td>50€</td>
      </tr>
    `;

    // Adiciona os materiais do ficheiro JSON
    dados.forEach(item => {
      tabela.innerHTML += `
        <tr>
          <td>${item.nome}</td>
          <td>${item.preco || item.custo}€</td>
        </tr>
      `;
    });
  }

  // Carrega os dados de materiais.json
  fetch("materiais.json")
    .then(response => response.json())
    .then(data => {
      renderTabela(data);
    })
    .catch(error => {
      console.error("Erro ao carregar materiais.json:", error);
      tabela.innerHTML = `<tr><td colspan="2">Erro ao carregar a tabela de custos.</td></tr>`;
    });
});
