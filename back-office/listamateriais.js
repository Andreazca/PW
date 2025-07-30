document.addEventListener("DOMContentLoaded", function () {
  // === MENU LATERAL ===
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

  const tabela = document.querySelector("#tabelaMateriais tbody");

  // Renderiza a tabela com os dados
  function renderTabela(dados) {
    tabela.innerHTML = "";
    dados.forEach(item => {
      tabela.innerHTML += `
        <tr>
          <td>${item.id}</td>
          <td>${item.nome}</td>
          <td>${item.tipo}</td>
          <td>${item.descricao}</td>
          <td>${item.stock}</td>
          <td>${item.preco || item.custo}€</td>
        </tr>
      `;
    });
  }

  // === NOVO: Verifica localStorage antes de buscar JSON ===
  const local = localStorage.getItem("materiais");

  if (local) {
    // Usa dados do localStorage
    const dados = JSON.parse(local);
    renderTabela(dados);
  } else {
    // Se não houver dados no localStorage, busca o ficheiro
    fetch("materiais.json")
      .then(response => response.json())
      .then(data => {
        renderTabela(data);
        localStorage.setItem("materiais", JSON.stringify(data)); // guarda para uso futuro
      })
      .catch(error => {
        console.error("Erro ao carregar materiais.json:", error);
        tabela.innerHTML = `<tr><td colspan="6">Erro ao carregar dados.</td></tr>`;
      });
  }
});
