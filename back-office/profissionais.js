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

  // === GRÁFICO PIZZA - Profissionais em Ação ===
  const ctxAcoes = document.getElementById('graficoPizza').getContext('2d');
  new Chart(ctxAcoes, {
    type: 'doughnut',
    data: {
      labels: ['Disponíveis', 'Em Auditoria', 'Ocupados com outras tarefas', 'Indisponíveis'],
      datasets: [{
        label: 'Funcionários',
        data: [100, 75, 15, 10],
        backgroundColor: ['#1976d2', '#81c784', '#ffb300', '#f57c00'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: 'right'
        }
      }
    }
  });

  // === GRÁFICO DE BARRAS - Profissionais em Auditoria ===
  const ctxBarras = document.getElementById('graficoBarras').getContext('2d');
new Chart(ctxBarras, {
  type: 'bar',
  data: {
    labels: [
      ['Inspeções', 'Periódicas'],
      'Higiene',
      'Segurança',
      'Monitorização'
    ],
    datasets: [{
      label: 'Profissionais',
      data: [2, 1, 1, 2], // <-- Ajusta aos teus dados reais!
      backgroundColor: '#f57c00'
    }]
  },
  options: {
    indexAxis: 'x',
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'bottom',
        align: 'start',
        labels: {
          color: '#1E3A5F',
          font: {
            size: 10
          }
        }
      }
    },
    scales: {
      y: {
        beginAtZero: true,
        max: 6,
        ticks: {
          stepSize: 1
        }
      }
    }
  }
});


  // === TABELA E PAGINAÇÃO ===
  const tabela = document.querySelector("#tabela tbody");
  const paginacao = document.getElementById("paginacao");
  let currentPage = 1;
  const rowsPerPage = 4;

  const profissionais = [
    { id: 1, nome: "João Martins", email: "joao@gmail.com", disponibilidade: "Em Auditoria", atividade: "Inspeções Periódicas" },
    { id: 2, nome: "Carolina Teixeira", email: "carolina@gmail.com", disponibilidade: "Disponível", atividade: "A aguardar auditoria" },
    { id: 3, nome: "Lara Brandão", email: "lara@gmail.com", disponibilidade: "Indisponível", atividade: "Licença Médica" },
    { id: 4, nome: "Bernardo Ataíde", email: "bernardo@gmail.com", disponibilidade: "Em Auditoria", atividade: "Monitorização ; Inspeções Periódicas" },
    { id: 5, nome: "André Cardoso", email: "andre@gmail.com", disponibilidade: "Em Auditoria", atividade: "Segurança ; Monitorização" },
    { id: 6, nome: "Rodirgo Vilhena", email: "rodrigo@gmail.com", disponibilidade: "Disponível", atividade: "Higiene" },
  ];

  function renderTabela(lista) {
    tabela.innerHTML = "";
    lista.forEach(prof => {
      const tr = document.createElement("tr");
      tr.innerHTML = `
        <td>${prof.id}</td>
        <td>${prof.nome}</td>
        <td>${prof.email}</td>
        <td>${prof.disponibilidade}</td>
        <td>${prof.atividade}</td>
      `;
      tabela.appendChild(tr);
    });
  }

  function renderPaginacao(total) {
    const paginas = Math.ceil(total / rowsPerPage);
    paginacao.innerHTML = "";

    for (let i = 1; i <= paginas; i++) {
      const btn = document.createElement("button");
      btn.innerText = i;
      btn.classList.toggle("active", i === currentPage);
      btn.addEventListener("click", () => {
        currentPage = i;
        atualizarTabelaPaginada();
      });
      paginacao.appendChild(btn);
    }
  }

  function atualizarTabelaPaginada() {
    const inicio = (currentPage - 1) * rowsPerPage;
    const fim = inicio + rowsPerPage;
    const dadosPagina = profissionais.slice(inicio, fim);
    renderTabela(dadosPagina);
    renderPaginacao(profissionais.length);
  }

  atualizarTabelaPaginada();
});