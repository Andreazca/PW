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
  });

  const pedidos = [
    { data: "20/04/2025" },
    { data: "21/04/2025" },
    { data: "22/04/2025" },
    { data: "23/04/2025" },
    { data: "24/04/2025" },
    { data: "25/04/2025" },
    { data: "26/04/2025" },
    { data: "27/04/2025" },
    { data: "28/04/2025" },
  ];
  const badge = document.getElementById("badge");
  badge.textContent = pedidos.length;

  let currentPage = 1;
  const rowsPerPage = 5;
  let dadosFiltrados = [...pedidos]; // Mais recente primeiro
  
  const tabela = document.querySelector("#tabela tbody");
  const paginacao = document.getElementById("paginacao");

  
  function renderTabela(lista) {
    tabela.innerHTML = "";
    lista.forEach(pedido => {
      const tr = document.createElement("tr");
      const td = document.createElement("td");
  
      const card = document.createElement("div");
      card.classList.add("alert-card");
  
      const icon = document.createElement("div");
      icon.classList.add("icon-alert");
      icon.innerHTML = "!";
  
      const content = document.createElement("div");
      content.classList.add("text-content");
  
      const title = document.createElement("strong");
      title.textContent = "Novo Pedido!";
  
      const date = document.createElement("p");
      date.textContent = "Data: " + pedido.data;
  
      content.appendChild(title);
      content.appendChild(date);
  
      card.appendChild(icon);
      card.appendChild(content);
      td.appendChild(card);
      tr.appendChild(td);
      tabela.appendChild(tr);
    });
  }
  
  function renderPaginacao(total) {
    const paginas = Math.ceil(total / rowsPerPage);
    paginacao.innerHTML = "";
  
    for (let i = 1; i <= paginas; i++) {
      const btn = document.createElement("button");
      btn.innerText = i;
      if (i === currentPage) btn.classList.add("active");
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
    renderTabela(dadosFiltrados.slice(inicio, fim));
    renderPaginacao(dadosFiltrados.length);
  }
  
  atualizarTabelaPaginada();
  