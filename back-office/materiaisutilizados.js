
  document.addEventListener("DOMContentLoaded", function () {
  
  // === MENU DROPDOWN ===
  
const dropdownBtns = document.querySelectorAll(".dropdown-btn");

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

  // === FUNÇÃO REUTILIZÁVEL PARA GRÁFICOS ===
  function criarGraficoPizza(ctx, titulo, labels, data, cores) {
    new Chart(ctx, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          data: data,
          backgroundColor: cores,
          borderColor: '#fff',
          borderWidth: 2
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        layout: {
          padding: 20
        },
        animation: {
          animateScale: true,
          animateRotate: true
        },
        plugins: {
          title: {
            display: true,
            text: titulo,
            font: {
              size: 20,
              weight: 'bold'
            },
            color: '#1a3d63',
            padding: {
              bottom: 15
            }
          },
          legend: {
            position: 'bottom',
            align: 'center',
            labels: {
              boxWidth: 10,
              padding: 8,
              font: {
                size: 11,
                maxHeight: 80
              },
              color: '#444'
            }
          }
        }
      }
    });
  }

  // === GRÁFICO 1: Higiene ===
  criarGraficoPizza(
    document.getElementById('graficoPizzaHigiene').getContext('2d'),
    'Materiais de Higiene Utilizados',
    ['Spray Desinfetante (48%)', 'Kit de Limpeza (52%)'],
    [48, 52],
    ['#1976d2', '#64b5f6']
  );

  // === GRÁFICO 2: Segurança ===
  criarGraficoPizza(
    document.getElementById('graficoPizzaSeguranca').getContext('2d'),
    'Materiais de Segurança Utilizados',
    ['Botas de Biqueira de Aço (75%)', 'Kit de Primeiros Socorros (25%)'],
    [75, 25],
    ['#81c784', '#aed581']
  );

  // === GRÁFICO 3: Monitorização ===
  criarGraficoPizza(
    document.getElementById('graficoPizzaMonitorizacao').getContext('2d'),
    'Materiais de Monitorização Utilizados',
    ['Câmara Térmica (19%)', 'Termohigrómetro (15%)', 'Sensor de Temperatura (39%)', 'Sensor de Quebra de Fio (27%)'],
    [19, 15, 39, 27],
    ['#fbc02d', '#f9a825', '#ff9800', '#fdd835']
  );
});
