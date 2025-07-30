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
const tabela = document.querySelector("#tabelaCustos tbody");

  const dadosCustos = [
    { item: "Spray Desinfetante", tipo: "Higiene", custo: 10 },
    { item: "Kit de Limpeza", tipo: "Higiene", custo: 25 },
    { item: "Botas de Biqueira de Aço", tipo: "Segurança", custo: 40 },
    { item: "Kit de Primeiros Socorros", tipo: "Segurança", custo: 30 },
    { item: "Câmara Térmica", tipo: "Monitorização", custo: 150 },
    { item: "Termohigrómetro", tipo: "Monitorização", custo: 60 },
    { item: "Sensor de Temperatura", tipo: "Monitorização", custo: 45 },
    { item: "Sensor de Quebra de Fio", tipo: "Monitorização", custo: 55 }
  ];

  function renderTabela(dados) {
    tabela.innerHTML = "";
    dados.forEach(({ item, tipo, custo }) => {
      const linha = document.createElement("tr");

      linha.innerHTML = `
        <td>${item}</td>
        <td>${tipo}</td>
        <td>${custo}€</td>
      `;

      tabela.appendChild(linha);
    });
  }

  renderTabela(dadosCustos);
});