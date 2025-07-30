document.addEventListener("DOMContentLoaded", function () {
  // === MENU DROPDOWN ===
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");

  // Garante que todos os submenus estão fechados e setas para cima ao carregar
  document.querySelectorAll(".submenu").forEach(s => s.style.display = "none");
  document.querySelectorAll(".arrow").forEach(a => a.style.transform = "rotate(0deg)");

  dropdownBtns.forEach(btn => {
    btn.addEventListener("mouseenter", function () {
      const arrow = this.querySelector(".arrow");
      if (arrow && (!this.nextElementSibling || this.nextElementSibling.style.display !== "block")) {
        arrow.style.transform = "rotate(180deg)";
      }
    });
    btn.addEventListener("mouseleave", function () {
      const arrow = this.querySelector(".arrow");
      if (arrow && (!this.nextElementSibling || this.nextElementSibling.style.display !== "block")) {
        arrow.style.transform = "rotate(0deg)";
      }
    });
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      let submenu = this.nextElementSibling;
      if (!submenu || !submenu.classList.contains("submenu")) {
        submenu = Array.from(this.parentElement.children).find(
          el => el.classList && el.classList.contains("submenu")
        );
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

  // Configuração do gráfico de Auditorias Realizadas por Área
  const graficoAuditorias = document.getElementById('graficoAuditorias');
  if (graficoAuditorias) {
    const ctx = graficoAuditorias.getContext('2d');

    // Cria um gráfico de barras usando a biblioteca Chart.js
    new Chart(ctx, {
      type: 'bar', // Tipo de gráfico: barras
      data: {
        labels: ['2020', '2021', '2022', '2023', '2024'], // Rótulos do eixo X
        datasets: [
          {
            label: 'Monitorização de Equipamentos Industriais', // Legenda do conjunto de dados
            data: [30, 20, 50, 40, 40], // Dados para cada ano
            backgroundColor: '#f2762e' // Cor das barras
          },
          {
            label: 'Auditoria da Segurança no Trabalho', // Legenda do conjunto de dados
            data: [40, 30, 60, 50, 30], // Dados para cada ano
            backgroundColor: '#009de0' // Cor das barras
          },
          {
            label: 'Gestão de Inspeções Periódicas', // Legenda do conjunto de dados
            data: [10, 10, 30, 30, 20], // Dados para cada ano
            backgroundColor: '#3da100' // Cor das barras
          }
        ]
      },
      options: {
        responsive: true, // Torna o gráfico responsivo
        maintainAspectRatio: false, // Permite ajustar a proporção do gráfico
        plugins: {
          legend: {
            display: false // Oculta a legenda
          },
          title: {
            display: true, // Exibe o título do gráfico
            text: 'Auditorias Realizadas por Período', // Texto do título
            font: {
              size: 20, // Tamanho da fonte do título
              weight: 'bold' // Negrito
            },
            color: '#1a3d63' // Cor do título
          }
        },
        scales: {
          y: {
            beginAtZero: true // Inicia o eixo Y no zero
          }
        }
      }
    });
  }
});
