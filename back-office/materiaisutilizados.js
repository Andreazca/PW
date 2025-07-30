document.addEventListener("DOMContentLoaded", function () {
    // Dropdown menu
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

    // === GRÁFICO DE PIZZA ===
  const ctxHigiene = document.getElementById('graficoPizzaHigiene').getContext('2d');
  new Chart(ctxHigiene, {
    type: 'pie',
    data: {
      labels: [
        'Spray Desinfetante (48%)', 'Kit de Limpeza (52%)'
      ],
      datasets: [{
        data: [48, 52],
        backgroundColor: [
          // Azuis
          '#1976d2', '#64b5f6',
        ]
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Materiais de Higiene Utilizados',
          font: { size: 18, weight: 'bold' },
          color: '#1a3d63'
        },
        legend: {
          position: 'bottom',
          align: 'center',
          labels: {
            boxWidth: 10,
            padding: 8,
            font: {
              size: 11 
            }
          },
          maxHeight: 80,
        }
      }
    }
  });
   // === GRÁFICO DE PIZZA ===
   const ctxSeguranca = document.getElementById('graficoPizzaSeguranca').getContext('2d');
   new Chart(ctxSeguranca, {
     type: 'pie',
     data: {
       labels: [
         'Botas de Biqueira de Aço (75%)', 'Kit de Primeiros Socorros (25%)'
       ],
       datasets: [{
         data: [75, 25],
         backgroundColor: [
           
          // Verdes
          '#81c784', '#aed581', 
        
         ]
       }]
     },
     options: {
       responsive: true,
       maintainAspectRatio: false,
       plugins: {
         title: {
           display: true,
           text: 'Materiais de Segurança Utilizados',
           font: { size: 18, weight: 'bold' },
           color: '#1a3d63'
         },
         legend: {
           position: 'bottom',
           align: 'center',
           labels: {
             boxWidth: 10,
             padding: 8,
             font: {
               size: 11 
             }
           },
           maxHeight: 80,
         }
       }
     }
   });
    // === GRÁFICO DE PIZZA ===
  const ctxMonotorizacao = document.getElementById('graficoPizzaMonitorizacao').getContext('2d');
  new Chart(ctxMonotorizacao, {
    type: 'pie',
    data: {
      labels: [
        'Câmara Térmica(19%)', 'Termohigrómetro (15%)', 'Sensor de Temperatura (39%)', 'Sensor de Quebra de Fio (27%)'
      ],
      datasets: [{
        data: [19, 15, 39,27],
          backgroundColor: [
            '#fbc02d', '#f9a825','#ff9800', '#fdd835'
          ]
          
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        title: {
          display: true,
          text: 'Materiais de Monitorização Utilizados',
          font: { size: 18, weight: 'bold' },
          color: '#1a3d63'
        },
        legend: {
          position: 'bottom',
          align: 'center',
          labels: {
            boxWidth: 10,
            padding: 8,
            font: {
              size: 11 
            }
          },
          maxHeight: 80,
        }
      }
    }
  });
});