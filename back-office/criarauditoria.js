document.addEventListener("DOMContentLoaded", function () {
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");
  dropdownBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const submenu = this.nextElementSibling;
      const arrow = this.querySelector(".arrow");

      if (submenu && submenu.classList.contains("submenu")) {
        submenu.style.display = submenu.style.display === "block" ? "none" : "block";
        arrow.style.transform = submenu.style.display === "block" ? "rotate(180deg)" : "rotate(0deg)";
      }
    });
  });

  let materiaisExistentes = [];

  // Carregar materiais: tenta localStorage primeiro
  const local = localStorage.getItem("materiais");
  if (local) {
    materiaisExistentes = JSON.parse(local);
    preencherSelectMateriais(materiaisExistentes);
  } else {
    fetch("materiais.json")
      .then(res => res.json())
      .then(data => {
        materiaisExistentes = data;
        localStorage.setItem("materiais", JSON.stringify(data));
        preencherSelectMateriais(data);
      })
      .catch(() => {
        alert("Erro ao carregar materiais.");
      });
  }

  function preencherSelectMateriais(lista) {
    const select = document.getElementById("materiais");
    if (!select) return;

    select.innerHTML = "";

    lista.forEach(mat => {
      if (mat.stock > 0) {
        const option = document.createElement("option");
        option.value = mat.nome;
        option.textContent = `${mat.nome} (${mat.stock} disponíveis)`;
        select.appendChild(option);
      }
    });
  }

  const form = document.getElementById("formAuditoria");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nomeAuditoria = document.getElementById("nomeAuditoria").value.trim();
    const origem = document.getElementById("origem").value;
    const descricao = document.getElementById("descricao").value.trim();
    const tipo = document.getElementById("tipo").value.trim();
    const local = document.getElementById("local").value.trim();
    const morada = document.getElementById("morada").value.trim();
    const equipa = document.getElementById("equipa").value;
    const materiaisSelect = document.getElementById("materiais");
    const materiais = Array.from(materiaisSelect.selectedOptions).map(option => option.value);
    const dataInput = document.getElementById("data").value;
    const duracao = parseInt(document.getElementById("duracao").value.trim(), 10);

    const hoje = new Date();
    hoje.setHours(0, 0, 0, 0);
    const dataSelecionada = new Date(dataInput);
    dataSelecionada.setHours(0, 0, 0, 0);

    if (dataSelecionada < hoje) {
      alert("A data da auditoria não pode ser anterior ao dia de hoje.");
      return;
    }

    const data = dataInput;

    const semStock = materiais.some(nomeMat => {
      const mat = materiaisExistentes.find(m => m.nome === nomeMat);
      return !mat || mat.stock <= 0;
    });

    if (semStock) {
      alert("Um ou mais materiais selecionados estão sem stock disponível.");
      return;
    }

    // Reduz stock
    materiais.forEach(nomeMat => {
      const mat = materiaisExistentes.find(m => m.nome === nomeMat);
      if (mat && mat.stock > 0) {
        mat.stock -= 1;
      }
    });

    localStorage.setItem("materiais", JSON.stringify(materiaisExistentes));

    const custoMateriais = materiais.reduce((total, nomeMat) => {
      const mat = materiaisExistentes.find(m => m.nome === nomeMat);
      return total + (mat?.preco || 0);
    }, 0);

    const custoHoras = duracao * 50;
    const custoTotal = custoMateriais + custoHoras;

    const auditoriasEmProgresso = JSON.parse(localStorage.getItem("auditoriasEmProgresso")) || [];
    const conflito = auditoriasEmProgresso.some(a => a.equipa === equipa && a.data === data && a.estado === "em progresso");

    if (conflito) {
      alert(`O perito ${equipa} já está alocado a uma auditoria na data ${data}.`);
      return;
    }

    const novaAuditoria = {
      id: Date.now(),
      nomeAuditoria,
      origem,
      descricao,
      tipo,
      local,
      morada,
      equipa,
      materiais,
      data,
      duracao,
      custo: custoTotal,
      estado: "em progresso"
    };

    auditoriasEmProgresso.push(novaAuditoria);
    localStorage.setItem("auditoriasEmProgresso", JSON.stringify(auditoriasEmProgresso));

    alert("Plano de auditoria criado com sucesso!");
    window.location.href = "auditoriasemprogresso.html";
  });

  // Função para finalizar uma auditoria e repor o stock
  window.finalizarAuditoria = function (idAuditoria) {
    const auditorias = JSON.parse(localStorage.getItem("auditoriasEmProgresso")) || [];
    const auditoria = auditorias.find(a => a.id === idAuditoria);

    if (!auditoria || auditoria.estado === "finalizada") {
      alert("Auditoria não encontrada ou já finalizada.");
      return;
    }

    const materiais = JSON.parse(localStorage.getItem("materiais")) || [];

    auditoria.materiais.forEach(nomeMat => {
      const mat = materiais.find(m => m.nome === nomeMat);
      if (mat) {
        mat.stock += 1;
      }
    });

    auditoria.estado = "finalizada";

    localStorage.setItem("materiais", JSON.stringify(materiais));
    localStorage.setItem("auditoriasEmProgresso", JSON.stringify(auditorias));

    alert("Auditoria finalizada e materiais repostos com sucesso.");
    preencherSelectMateriais(materiais); // Atualiza <select>
  };
});
