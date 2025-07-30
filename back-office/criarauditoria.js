// --- criarauditoria.js ---

document.addEventListener("DOMContentLoaded", function () {
  // === MENU DROPDOWN ===
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");

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

  const dataInput = document.getElementById("data");
  if (dataInput) {
    const hoje = new Date();
    const yyyy = hoje.getFullYear();
    const mm = String(hoje.getMonth() + 1).padStart(2, '0');
    const dd = String(hoje.getDate()).padStart(2, '0');
    dataInput.min = `${yyyy}-${mm}-${dd}`;
  }

  const materiaisMultiselect = document.getElementById("materiais-multiselect");
  const materiaisSelected = document.getElementById("materiais-selected");
  const materiaisOptions = document.getElementById("materiais-options");
  const materiaisHidden = document.getElementById("materiais");
  let materiaisSelecionados = [];

  function renderMateriaisTags() {
    materiaisSelected.innerHTML = "";
    const maxWidth = materiaisSelected.clientWidth || 260;
    let usedWidth = 0;
    let countShown = 0;
    let hiddenCount = 0;

    if (materiaisSelecionados.length === 0) {
      materiaisSelected.textContent = "Selecionar";
    } else {
      materiaisSelecionados.forEach((mat, idx) => {
        const tag = document.createElement("span");
        tag.className = "multiselect-tag";
        tag.textContent = mat;
        const remove = document.createElement("span");
        remove.className = "remove-tag";
        remove.textContent = "×";
        remove.onclick = (e) => {
          e.stopPropagation();
          materiaisSelecionados = materiaisSelecionados.filter(m => m !== mat);
          updateMateriaisCheckboxes();
          renderMateriaisTags();
        };
        tag.appendChild(remove);
        materiaisSelected.appendChild(tag);

        const temp = tag.cloneNode(true);
        temp.style.visibility = "hidden";
        temp.style.position = "absolute";
        temp.style.pointerEvents = "none";
        document.body.appendChild(temp);
        const tagWidth = temp.offsetWidth + 6;
        document.body.removeChild(temp);

        if (usedWidth + tagWidth > maxWidth - 40) {
          hiddenCount = materiaisSelecionados.length - countShown;
          tag.remove();
        } else {
          usedWidth += tagWidth;
          countShown++;
        }
      });

      if (hiddenCount > 0) {
        const more = document.createElement("span");
        more.className = "multiselect-tag";
        more.style.background = "#bbb";
        more.style.cursor = "default";
        more.textContent = `+${hiddenCount}`;
        materiaisSelected.appendChild(more);
      }
    }
    materiaisHidden.value = materiaisSelecionados.join(",");
    materiaisHidden.setCustomValidity(materiaisSelecionados.length ? "" : "Selecione pelo menos um material");
  }

  function updateMateriaisCheckboxes() {
    Array.from(materiaisOptions.querySelectorAll("input[type=checkbox]")).forEach(cb => {
      cb.checked = materiaisSelecionados.includes(cb.value);
    });
  }

  materiaisSelected.addEventListener("click", () => {
    materiaisMultiselect.classList.toggle("open");
    if (materiaisMultiselect.classList.contains("open")) {
      updateMateriaisCheckboxes();
    }
  });

  materiaisSelected.addEventListener("blur", () => {
    setTimeout(() => materiaisMultiselect.classList.remove("open"), 150);
  });

  Array.from(materiaisOptions.querySelectorAll("input[type=checkbox]")).forEach(cb => {
    cb.addEventListener("change", function () {
      if (this.checked) {
        if (!materiaisSelecionados.includes(this.value)) {
          materiaisSelecionados.push(this.value);
        }
      } else {
        materiaisSelecionados = materiaisSelecionados.filter(m => m !== this.value);
      }
      renderMateriaisTags();
    });
  });

  renderMateriaisTags();

  const form = document.getElementById("formAuditoria");

  form.addEventListener("submit", function (e) {
    e.preventDefault();

    const nomeAuditoria = document.getElementById("nomeAuditoria").value.trim();
    const origem = document.getElementById("origem").value;
    const descricao = document.getElementById("descricao").value.trim();
    const tipo = document.getElementById("tipo").value.trim();
    const local = document.getElementById("local").value.trim();
    const rua = document.getElementById("rua").value.trim();
    const numero = document.getElementById("numero").value.trim();
    const codigoPostal = document.getElementById("codigoPostal").value.trim();
    const perito = document.getElementById("perito").value;
    const materiais = materiaisHidden.value.split(",").filter(Boolean);
    const data = dataInput.value;
    const duracao = document.getElementById("duracao").value;

    if (!nomeAuditoria || !origem || !descricao || !tipo || !local || !rua || !numero || !codigoPostal || !perito || !materiais.length || !data || !duracao) {
      mostrarToast("Preencha todos os campos obrigatórios!");
      return;
    }

    // Verificar se o perito já tem uma auditoria no mesmo dia
    const auditoriasExistentes = JSON.parse(localStorage.getItem("auditoriasEmProgresso")) || [];
    const peritoJaTemAuditoria = auditoriasExistentes.some(auditoria => {
      return auditoria.perito === perito && auditoria.data === data;
    });

    if (peritoJaTemAuditoria) {
      mostrarToast("Este perito já tem uma auditoria neste dia!");
      return;
    }

    const materiaisExistentes = JSON.parse(localStorage.getItem("materiais")) || [];
    materiais.forEach(nomeMat => {
      const mat = materiaisExistentes.find(m => m.nome === nomeMat);
      if (mat && mat.stock > 0) {
        mat.stock -= 1;
      }
    });
    localStorage.setItem("materiais", JSON.stringify(materiaisExistentes));
    window.dispatchEvent(new StorageEvent("storage", { key: "materiais" }));

    const precoPorMaterial = {
      "Spray Desinfetante": 10,
      "Kit de Limpeza": 25,
      "Botas de Biqueira de Aço": 40,
      "Kit de Primeiros Socorros": 30,
      "Câmara Térmica": 150,
      "Termohigrómetro": 60,
      "Sensor de Temperatura": 45,
      "Sensor de Quebra de Fio": 55
    };
    const custoHoras = 50 * Number(duracao);
    let custoMateriais = 0;
    materiais.forEach(nomeMat => {
      if (precoPorMaterial[nomeMat]) custoMateriais += precoPorMaterial[nomeMat];
    });
    const custo = custoHoras + custoMateriais;

    auditoriasExistentes.push({
      id: Date.now(),
      nomeAuditoria,
      origem,
      descricao,
      tipo,
      local,
      rua,
      numero,
      codigoPostal,
      perito,
      materiais,
      data,
      duracao,
      custo,
      estado: "em progresso"
    });
    localStorage.setItem("auditoriasEmProgresso", JSON.stringify(auditoriasExistentes));

    mostrarToast("Auditoria criada com sucesso!");
    form.reset();
  });

  function mostrarToast(mensagem) {
    const antigo = document.getElementById("toast-alert");
    if (antigo) antigo.remove();

    const toast = document.createElement("div");
    toast.id = "toast-alert";
    toast.textContent = mensagem;
    toast.style.position = "fixed";
    toast.style.top = "32px";
    toast.style.left = "50%";
    toast.style.transform = "translateX(-50%)";
    toast.style.background = "#f9f6ef";
    toast.style.color = "#1a3d63";
    toast.style.padding = "16px 32px";
    toast.style.borderRadius = "10px";
    toast.style.fontSize = "17px";
    toast.style.boxShadow = "0 2px 12px rgba(0,0,0,0.13)";
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
});
