// --- auditoriasemprogresso.js atualizado para sidebar funcional igual aos dashboards ---

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

  // === AUDITORIAS EM PROGRESSO ===
  const tabela = document.querySelector("#tabelaAuditorias tbody");
  const formContainer = document.querySelector(".form-container");
  let auditoriasPorPagina = 8;
  let paginaAtual = 1;
  let auditoriasEmProgresso = [];

  function carregarAuditorias() {
    auditoriasEmProgresso = JSON.parse(localStorage.getItem("auditoriasEmProgresso")) || [];
    const emProgresso = auditoriasEmProgresso.filter(a => a.estado === "em progresso");
    renderTabela(emProgresso, paginaAtual);
    renderPaginacao(emProgresso.length);
  }

  function renderTabela(lista, pagina = 1) {
    tabela.innerHTML = "";
    if (!lista.length) {
      const row = document.createElement("tr");
      row.innerHTML = `<td colspan="6" class="tabela-vazia">Nenhuma auditoria em progresso.</td>`;
      tabela.appendChild(row);
      return;
    }
    const inicio = (pagina - 1) * auditoriasPorPagina;
    const fim = inicio + auditoriasPorPagina;
    const paginaDados = lista.slice(inicio, fim);

    paginaDados.forEach((audi) => {
      // Garante compatibilidade com diferentes nomes de campos
      const cidade = audi.cidade ?? audi.local ?? "";
      const rua = audi.rua ?? "";
      const numero = audi.numero ?? "";
      const codigoPostal = audi.codigoPostal ?? audi.codigopostal ?? audi.cp ?? "";

      // Monta a morada informativa para a tabela
      const moradaInfo = [rua, numero, codigoPostal].filter(Boolean).join(', ') || '—';

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${audi.nomeAuditoria ?? ""}</td>
        <td>${audi.tipo ?? ""}</td>
        <td>${cidade}</td>
        <td>${moradaInfo}</td>
        <td>${audi.data ?? ""}</td>
        <td>${audi.perito ?? ""}</td>
        <td><button class="btn-finalizar" onclick="finalizarAuditoria(${audi.id})">Finalizar</button></td>
      `;
      tabela.appendChild(row);
    });
  }

  function renderPaginacao(total) {
    let paginacao = formContainer.querySelector(".tabela-paginacao");
    if (paginacao) paginacao.remove();

    const totalPaginas = Math.ceil(total / auditoriasPorPagina);
    if (totalPaginas <= 1) return;

    paginacao = document.createElement("div");
    paginacao.className = "tabela-paginacao";

    const btnPrev = document.createElement("button");
    btnPrev.textContent = "Anterior";
    btnPrev.disabled = paginaAtual === 1;
    btnPrev.onclick = () => {
      paginaAtual--;
      renderTabela(auditoriasEmProgresso.filter(a => a.estado === "em progresso"), paginaAtual);
      renderPaginacao(total);
    };
    paginacao.appendChild(btnPrev);

    for (let i = 1; i <= totalPaginas; i++) {
      const span = document.createElement("span");
      span.textContent = i;
      span.className = i === paginaAtual ? "pagina-atual" : "";
      span.style.cursor = "pointer";
      span.onclick = () => {
        paginaAtual = i;
        renderTabela(auditoriasEmProgresso.filter(a => a.estado === "em progresso"), paginaAtual);
        renderPaginacao(total);
      };
      paginacao.appendChild(span);
    }

    const btnNext = document.createElement("button");
    btnNext.textContent = "Seguinte";
    btnNext.disabled = paginaAtual === totalPaginas;
    btnNext.onclick = () => {
      paginaAtual++;
      renderTabela(auditoriasEmProgresso.filter(a => a.estado === "em progresso"), paginaAtual);
      renderPaginacao(total);
    };
    paginacao.appendChild(btnNext);

    formContainer.appendChild(paginacao);
  }

 window.finalizarAuditoria = function(id) {
  let auditorias = JSON.parse(localStorage.getItem("auditoriasEmProgresso")) || [];
  const auditoria = auditorias.find(a => a.id === id);

  if (auditoria) {
    // Ao finalizar, REPOR o stock dos materiais usados
    let materiais = JSON.parse(localStorage.getItem("materiais")) || [];
    if (auditoria.materiais && Array.isArray(auditoria.materiais)) {
      auditoria.materiais.forEach(matSel => {
        let nome = typeof matSel === "string" ? matSel : matSel.nome;
        let qtd = typeof matSel === "string" ? 1 : (matSel.quantidade || 1);
        const mat = materiais.find(m => m.nome === nome);
        if (mat) mat.stock = (parseInt(mat.stock) || 0) + qtd;
      });
      localStorage.setItem("materiais", JSON.stringify(materiais));
      window.dispatchEvent(new StorageEvent("storage", { key: "materiais" }));
    }

    gerarPDF(auditoria);

    auditorias = auditorias.map(a => a.id === id ? { ...a, estado: "finalizado" } : a);
    localStorage.setItem("auditoriasEmProgresso", JSON.stringify(auditorias));

    mostrarToast("Auditoria finalizada - aceda ao relatório!");
    carregarAuditorias();
  }
};


  // Toast simples (alerta visual no topo)
  function mostrarToast(mensagem) {
    // Remove toast antigo se existir
    const antigo = document.getElementById("toast-alert");
    if (antigo) antigo.remove();

    const toast = document.createElement("div");
    toast.id = "toast-alert";
    toast.textContent = mensagem;
    toast.style.position = "fixed";
    toast.style.top = "32px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#f9f6ef"; // Tom de bege claro
    toast.style.color = "#1a3d63";
    toast.style.padding = "16px 32px";
    toast.style.borderRadius = "8px";
    toast.style.fontSize = "17px";
    toast.style.boxShadow = "0 2px 12px rgba(0,0,0,0.15)";
    toast.style.zIndex = "9999";
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s";

    document.body.appendChild(toast);
    setTimeout(() => { toast.style.opacity = "1"; }, 50);
    setTimeout(() => {
      toast.style.opacity = "0";
      setTimeout(() => toast.remove(), 400);
    }, 2200);
  }

  function gerarPDF(auditoria) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Relatório Final de Auditoria", 20, 20);

    doc.setFontSize(12);
    doc.text(`Nome da Auditoria: ${auditoria.nomeAuditoria ?? ""}`, 20, 40);
    doc.text(`Origem: ${auditoria.origem ?? ""}`, 20, 50);
    doc.text(`Descrição: ${auditoria.descricao ?? ""}`, 20, 60);
    doc.text(`Tipo: ${auditoria.tipo ?? ""}`, 20, 70);

    // Garante compatibilidade com diferentes nomes de campos
    const cidade = auditoria.cidade ?? auditoria.local ?? "";
    const rua = auditoria.rua ?? "";
    const numero = auditoria.numero ?? "";
    const codigoPostal = auditoria.codigoPostal ?? auditoria.codigopostal ?? auditoria.cp ?? "";

    // Morada detalhada numa linha
    const moradaPdf = [cidade, rua, numero, codigoPostal].filter(Boolean).join(', ');
    doc.text(`Morada: ${moradaPdf}`, 20, 80);

    doc.text(`Perito: ${auditoria.perito ?? ""}`, 20, 90);
    doc.text(`Materiais: ${(auditoria.materiais && auditoria.materiais.length) ? auditoria.materiais.join(", ") : ""}`, 20, 100);
    doc.text(`Data Prevista: ${auditoria.data ?? ""}`, 20, 110);
    doc.text(`Duração Estimada: ${auditoria.duracao ? auditoria.duracao + " horas" : ""}`, 20, 120);
    doc.text(`Custo Total: ${auditoria.custo !== undefined ? auditoria.custo.toFixed(2) + " euros" : ""}`, 20, 130);

    doc.save(`Relatorio_Auditoria_${auditoria.id}.pdf`);
  }

  carregarAuditorias();
});
