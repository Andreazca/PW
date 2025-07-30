document.addEventListener("DOMContentLoaded", function () {
  // === MENU DROPDOWN ===
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");

  // Garante que todos os submenus estão fechados e setas para cima ao carregar
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

      // Corrige: encontra o submenu correto dentro do <li>
      let submenu = this.parentElement.querySelector(".submenu");
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

  // === GRÁFICO DE PIZZA (agora maior) ===
  const ctxPizza = document.getElementById('graficoPizza').getContext('2d');
  new Chart(ctxPizza, {
    type: 'pie',
    data: {
      labels: [
        'Janeiro (50)', 'Fevereiro (10)', 'Março (35)', 'Abril (40)',
        'Maio (25)', 'Junho (40)', 'Julho (20)', 'Agosto (70)',
        'Setembro (30)', 'Outubro (80)', 'Novembro (20)', 'Dezembro (30)'
      ],
      datasets: [{
        data: [50, 10, 35, 40, 25, 40, 20, 70, 30, 80, 20, 30],
        backgroundColor: [
          '#1976d2', '#64b5f6', '#0d47a1',
          '#81c784', '#aed581', '#66bb6a',
          '#ffb300', '#ff9800', '#f57c00',
          '#a1887f', '#bcaaa4', '#8d6e63'
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Total Ocorrências de 2024',
          font: { size: 18, weight: 'bold' },
          color: '#1a3d63'
        },
        legend: {
          position: 'bottom',
          align: 'center',
          labels: {
            boxWidth: 10,
            padding: 8,
            font: { size: 11 }
          },
          maxHeight: 80
        }
      }
    }
  });

  // === GRÁFICO DE BARRAS (agora menor) ===
  const ctxBarras = document.getElementById('graficoBarras').getContext('2d');
  new Chart(ctxBarras, {
    type: 'bar',
    data: {
      labels: ['2021', '2022', '2023', '2024', '2025'],
      datasets: [{
        label: 'Ocorrências Resolvidas',
        data: [200, 400, 150, 500, 100],
        backgroundColor: '#9bd2f7',
        barPercentage: 0.7,
        categoryPercentage: 0.6
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        title: {
          display: true,
          text: 'Ocorrências Resolvidas por Período',
          font: { size: 18, weight: 'bold' },
          color: '#1a3d63'
        }
      },
      scales: {
        y: {
          beginAtZero: true,
          ticks: { stepSize: 100 }
        }
      }
    }
  });

  // === GRÁFICO DE LINHA ===
  // Configuração do gráfico de linha
  const ctxLinha = document.getElementById('graficoLinha').getContext('2d');
  new Chart(ctxLinha, {
    type: 'line', // Tipo de gráfico: linha
    data: {
      labels: ['2021', '2022', '2023', '2024', '2025'], // Rótulos do eixo X
      datasets: [{
        label: '€', // Legenda do conjunto de dados
        data: [10000, 20000, 12000, 25000, 5000], // Dados para cada ano
        borderColor: '#f57c00', // Cor da linha
        backgroundColor: 'transparent', // Fundo transparente
        tension: 0.3 // Suaviza a curva da linha
      }]
    },
    options: {
      responsive: true, // Torna o gráfico responsivo
      maintainAspectRatio: false, // Permite ajustar a proporção do gráfico
      plugins: {
        legend: { display: false }, // Oculta a legenda
        title: {
          display: true, // Exibe o título do gráfico
          text: 'Custo Total', // Texto do título
          font: { size: 18, weight: 'bold' }, // Estilo do título
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
});
