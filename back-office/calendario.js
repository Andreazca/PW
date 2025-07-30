document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");

  dropdownBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const submenu = this.nextElementSibling; // Obtém o submenu (ul)
      const arrow = this.querySelector(".arrow"); // Obtém a seta dentro do botão

      // Alterna a visibilidade do submenu
      if (submenu.style.display === "block") {
        submenu.style.display = "none"; // Esconde o submenu
        arrow.style.transform = "rotate(0deg)"; // Restaura a seta
      } else {
        submenu.style.display = "block"; // Exibe o submenu
        arrow.style.transform = "rotate(180deg)"; // Rotaciona a seta para baixo
      }
    });
  });

  // --- CALENDÁRIO ---
  const auditorias = [
    { data: "2025-04-18", nome: "Auditoria da Segurança" },
    { data: "2025-04-25", nome: "Auditoria B" },
    { data: "2025-04-30", nome: "Auditoria B" },
  ];

  // Exemplo de pedidos/tarefas por data
  const pedidos = {
    '2025-04-18': ['Auditoria da Segurança', 'Pedido extra'],
    '2025-04-25': ['Auditoria B'],
    '2025-04-30': ['Auditoria B', 'Reunião'],
    // Adicione mais datas conforme necessário
  };

  const datesEl = document.getElementById("dates");
  const monthYearEl = document.getElementById("month-year");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  let currentDate = new Date();
  let selectedDate = null;

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    let firstDay = new Date(year, month, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1;
    const prevMonthDays = new Date(year, month, 0).getDate();
    const totalDays = new Date(year, month + 1, 0).getDate();

    monthYearEl.textContent = date.toLocaleString("pt-PT", { month: "long", year: "numeric" }).toUpperCase();
    datesEl.innerHTML = "";

    // Dias do mês anterior (em cinza)
    for (let i = firstDay - 1; i >= 0; i--) {
      const dia = prevMonthDays - i;
      datesEl.innerHTML += `<div class="other-month">${dia}</div>`;
    }

    // Dias do mês atual
    for (let i = 1; i <= totalDays; i++) {
      const dataAtual = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
      const auditoria = auditorias.find(a => a.data === dataAtual);
      let classes = "calendar-date";
      let eventLabel = "";

      // Evento
      if (auditoria) {
        classes += " event";
        eventLabel = `<div class="event-label">${auditoria.nome}</div>`;
      }

      // Dia de hoje
      const today = new Date();
      const todayStr = today.toISOString().slice(0, 10);
      let hojeLabel = "";
      if (dataAtual === todayStr) {
        classes += " today";
        hojeLabel = `<span class="hoje-label" style="position:absolute;top:6px;right:10px;background:#ffc107;color:#1a3d63;font-size:11px;padding:2px 7px;border-radius:8px;font-weight:bold;">hoje</span>`;
      }

      // Dia selecionado
      if (dataAtual === selectedDate) {
        classes += " selected";
      }

      datesEl.innerHTML += `<div class="${classes}" data-date="${dataAtual}" style="position:relative;">${i}${hojeLabel}${eventLabel}</div>`;
    }

    // Dias do próximo mês (em cinza)
    const totalCells = firstDay + totalDays;
    const nextDays = (7 - (totalCells % 7)) % 7;
    for (let i = 1; i <= nextDays; i++) {
      datesEl.innerHTML += `<div class="other-month">${i}</div>`;
    }
  }

  // Clique nos dias do calendário
  datesEl.addEventListener('click', function(e) {
    const dayDiv = e.target.closest('.calendar-date');
    if (!dayDiv) return;
    document.querySelectorAll('.calendar-date.selected').forEach(el => el.classList.remove('selected'));
    dayDiv.classList.add('selected');
    selectedDate = dayDiv.dataset.date;
    showPedidos(selectedDate);
  });

  // Mostra pedidos/tarefas do dia selecionado
  function showPedidos(date) {
    let details = document.getElementById('event-details');
    if (!details) {
      details = document.createElement('div');
      details.id = 'event-details';
      details.className = 'event-details';
      datesEl.parentNode.appendChild(details);
    }
    if (pedidos[date] && pedidos[date].length > 0) {
      details.innerHTML = `<strong>Tarefas/Pedidos:</strong><ul>${pedidos[date].map(ev => `<li>${ev}</li>`).join('')}</ul>`;
      details.classList.add('active');
    } else {
      details.innerHTML = `<em>Sem tarefas ou pedidos para este dia.</em>`;
      details.classList.add('active');
    }
  }

  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    selectedDate = null;
    renderCalendar(currentDate);
    // Limpa detalhes ao mudar de mês
    let details = document.getElementById('event-details');
    if (details) details.innerHTML = '';
  });

  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    selectedDate = null;
    renderCalendar(currentDate);
    let details = document.getElementById('event-details');
    if (details) details.innerHTML = '';
  });

  // Inicializa o calendário e destaca o dia de hoje
  const todayStr = new Date().toISOString().slice(0, 10);
  selectedDate = todayStr;
  renderCalendar(currentDate);
  showPedidos(selectedDate);
});
