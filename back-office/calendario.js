document.addEventListener("DOMContentLoaded", function () {
  // === MENU DROPDOWN ===
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");

  // Garante que todos os submenus estão fechados e setas para cima ao carregar
  document.querySelectorAll(".submenu").forEach(s => s.style.display = "none");
  document.querySelectorAll(".arrow").forEach(a => a.style.transform = "rotate(0deg)");

  dropdownBtns.forEach(btn => {
    btn.addEventListener("mouseenter", function () {
      const arrow = this.querySelector(".arrow");
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

      let submenu = null;
      if (this.parentElement && this.parentElement.classList.contains("dropdown")) {
        submenu = this.parentElement.querySelector(".submenu");
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


  // --- CALENDÁRIO ---
  const datesEl = document.getElementById("dates");
  const monthYearEl = document.getElementById("month-year");
  const prevBtn = document.getElementById("prev");
  const nextBtn = document.getElementById("next");

  let currentDate = new Date();
  let selectedDate = null;

  // Guarda os pedidos aprovados organizados por data
  let pedidos = {};

  function carregarPedidosDoLocalStorage() {
  const dados = localStorage.getItem("pedidos");
  if (!dados) return;

  const listaPedidos = JSON.parse(dados);

  pedidos = {};

  listaPedidos.forEach(pedido => {
    if (pedido.estado === "aprovado") {
      if (!pedidos[pedido.data]) {
        pedidos[pedido.data] = [];
      }
      // Guarda o pedido completo e não só a descrição
      pedidos[pedido.data].push(pedido);
    }
  });
}

  window.addEventListener('storage', function(e) {
  if (e.key === 'pedidos') {
    carregarPedidosDoLocalStorage();
    renderCalendar(currentDate);
    showPedidos(selectedDate);
  }
});

  function renderCalendar(date) {
    const year = date.getFullYear();
    const month = date.getMonth();

    let firstDay = new Date(year, month, 1).getDay();
    firstDay = firstDay === 0 ? 6 : firstDay - 1;
    const prevMonthDays = new Date(year, month, 0).getDate();
    const totalDays = new Date(year, month + 1, 0).getDate();

    monthYearEl.textContent = date.toLocaleString("pt-PT", { month: "long", year: "numeric" }).toUpperCase();
    datesEl.innerHTML = "";

    // Dias do mês anterior (cinza)
    for (let i = firstDay - 1; i >= 0; i--) {
      const dia = prevMonthDays - i;
      datesEl.innerHTML += `<div class="other-month">${dia}</div>`;
    }

    // Dias do mês atual
    for (let i = 1; i <= totalDays; i++) {
      const dataAtual = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;

      let classes = "calendar-date";
      let eventLabel = "";

    if (pedidos[dataAtual] && pedidos[dataAtual].length > 0) {
      classes += " event";
      const count = pedidos[dataAtual].length;
      eventLabel = `
        <span class="event-indicator-bar" title="Auditoria aprovada"></span>
        <span class="event-indicator-count" title="${count} auditoria(s) aprovada(s)">${count}</span>
      `;
    } 

      // Dia de hoje
      const today = new Date();
      const todayStr = today.toISOString().slice(0, 10);
      let hojeLabel = "";
      if (dataAtual === todayStr) {
        classes += " today";
       hojeLabel = `<span class="hoje-label" style="position:absolute;top:6px;right:10px;background:#ffc107;color:#1a3d63;font-size:16px;padding:2px 7px;border-radius:8px;font-weight:bold;">hoje</span>`;

      }

      // Dia selecionado
      if (dataAtual === selectedDate) {
        classes += " selected";
      }

      datesEl.innerHTML += `<div class="${classes}" data-date="${dataAtual}" style="position:relative;">${i}${hojeLabel}${eventLabel}</div>`;
    }

    // Dias do próximo mês (cinza)
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

  // Mostra pedidos do dia selecionado no elemento abaixo do calendário
  function showPedidos(date) {
    let details = document.getElementById('event-details');
    if (!details) {
      details = document.createElement('div');
      details.id = 'event-details';
      details.className = 'event-details';
      datesEl.parentNode.appendChild(details);
    }
    else {
  // Se não houver pedidos para o dia, limpa o conteúdo e esconde o elemento
    details.innerHTML = "";
    details.classList.remove('active');
  }

  }

  prevBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    selectedDate = null;
    carregarPedidosDoLocalStorage();
    renderCalendar(currentDate);
    let details = document.getElementById('event-details');
    if (details) details.innerHTML = '';
  });

  nextBtn.addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    selectedDate = null;
    carregarPedidosDoLocalStorage();
    renderCalendar(currentDate);
    let details = document.getElementById('event-details');
    if (details) details.innerHTML = '';
  });

  // Inicializa o calendário e destaca o dia de hoje
  const todayStr = new Date().toISOString().slice(0, 10);
  selectedDate = todayStr;

  carregarPedidosDoLocalStorage();
  renderCalendar(currentDate);
  showPedidos(selectedDate);

  // Pop-up para mostrar pedidos do dia
  const datesContainer = document.getElementById("dates");
  const popup = document.getElementById("popup");
  const closePopup = document.getElementById("close-popup");
  const popupDate = document.getElementById("popup-date");
  const taskList = document.getElementById("task-list");
  const exitPopup = document.getElementById("exit-popup"); // Botão de Sair

  datesContainer.addEventListener("click", function (e) {
    const dayDiv = e.target.closest(".calendar-date");
    if (!dayDiv) return;

    const selectedDate = dayDiv.dataset.date;
    popupDate.textContent = `Pedidos: ${selectedDate}`;
    taskList.innerHTML = "";

   if (pedidos[selectedDate] && pedidos[selectedDate].length > 0) {
      pedidos[selectedDate].forEach(pedido => {
        const li = document.createElement("li");
        li.innerHTML = `<strong>ID:</strong> ${pedido.id} <br>
                        <strong>Descrição:</strong> ${pedido.descricao} <br>
                        <strong>Cliente:</strong> ${pedido.cliente}`;
        taskList.appendChild(li);
      });
} else {
  const li = document.createElement("li");
  li.textContent = "Sem pedidos aprovados para este dia.";
  taskList.appendChild(li);
}


    popup.classList.remove("hidden");
  });

  closePopup.addEventListener("click", function () {
    popup.classList.add("hidden");
  });

  exitPopup.addEventListener("click", function () {
    popup.classList.add("hidden");
  });

  // Removi o botão adicionar tarefa e o seu evento, conforme pedido
});
