// Aguarda o carregamento completo do DOM
document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os botões de dropdown da página
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");

  // Adiciona um evento de clique a cada botão de dropdown
  dropdownBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const submenu = this.nextElementSibling; // Obtém o submenu associado
      const arrow = this.querySelector(".arrow"); // Obtém a seta dentro do botão

      // Alterna a visibilidade do submenu
      if (submenu.style.display === "block") {
        submenu.style.display = "none"; // Esconde o submenu
        arrow.style.transform = "rotate(0deg)"; // Restaura a posição da seta
      } else {
        submenu.style.display = "block"; // Exibe o submenu
        arrow.style.transform = "rotate(180deg)"; // Rotaciona a seta para baixo
      }
    });
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
