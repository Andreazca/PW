document.addEventListener("DOMContentLoaded", async function () {
  // === MENU DROPDOWN ===
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");

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
      let submenu = this.parentElement.querySelector(".submenu");
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

  const team = [
    { nome: "André Cardoso", email: "andre@gmail.com", foto: "andre.png", auditoriasAtuais: [], auditoriasFuturas: [], auditoriasRealizadas: [] },
    { nome: "Bernardo Ataíde", email: "bernardo@gmail.com", foto: "bernardo.png", auditoriasAtuais: [], auditoriasFuturas: [], auditoriasRealizadas: [] },
    { nome: "Carolina Teixeira", email: "carolina@gmail.com", foto: "carolina.png", auditoriasAtuais: [], auditoriasFuturas: [], auditoriasRealizadas: [] },
    { nome: "João Martins", email: "joao@gmail.com", foto: "joao.png", auditoriasAtuais: [], auditoriasFuturas: [], auditoriasRealizadas: [] },
    { nome: "Lara Brandão", email: "lara@gmail.com", foto: "lara.png", auditoriasAtuais: [], auditoriasFuturas: [], auditoriasRealizadas: [] },
    { nome: "Rodrigo Vilhena", email: "rodrigo@gmail.com", foto: "rodrigo.png", auditoriasAtuais: [], auditoriasFuturas: [], auditoriasRealizadas: [] }
  ];

  function carregarAuditoriasFinalizadas() {
    const auditorias = JSON.parse(localStorage.getItem("auditoriasEmProgresso")) || [];
    
    const hoje = new Date();
    const hojeString = hoje.toISOString().split('T')[0]; // yyyy-mm-dd

    team.forEach(perito => {
      perito.auditoriasAtuais = [];
      perito.auditoriasFuturas = [];
      perito.auditoriasRealizadas = [];
    });

    auditorias.forEach(auditoria => {
      const perito = team.find(p => p.nome.includes(auditoria.perito));
      if (perito) {
        if (auditoria.data === hojeString) {
          // Auditorias de hoje
          perito.auditoriasAtuais.push({
            nome: auditoria.nomeAuditoria,
            data: auditoria.data,
            estado: auditoria.estado
          });
        } else if (auditoria.data > hojeString) {
          // Auditorias Futuras
          perito.auditoriasFuturas.push({
            nome: auditoria.nomeAuditoria,
            data: auditoria.data,
            estado: auditoria.estado
          });
        } else if (auditoria.estado === "finalizado" && auditoria.data < hojeString) {
          // Auditorias Realizadas
          perito.auditoriasRealizadas.push({
            nome: auditoria.nomeAuditoria,
            data: auditoria.data
          });
        }
      }
    });
  }

  function criarCards() {
    const container = document.querySelector(".main-content");
    const existingGallery = document.querySelector(".gallery");
    if (existingGallery) existingGallery.remove();

    const gallery = document.createElement("div");
    gallery.className = "gallery";

    team.forEach(perito => {
      const card = document.createElement("div");
      card.className = "card";

      const img = document.createElement("img");
      img.src = perito.foto;
      img.alt = `Foto de ${perito.nome}`;

      const nome = document.createElement("h3");
      nome.textContent = perito.nome;

      const email = document.createElement("p");
      email.textContent = perito.email;

      const consultarBtn = document.createElement("button");
      consultarBtn.className = "consultar-btn";
      consultarBtn.textContent = "Consultar";

      consultarBtn.addEventListener("click", () => abrirModal(perito));

      card.appendChild(img);
      card.appendChild(nome);
      card.appendChild(email);
      card.appendChild(consultarBtn);

      gallery.appendChild(card);
    });

    container.appendChild(gallery);
  }

  function abrirModal(perito) {
    const modal = document.getElementById("modal");
    const modalContent = document.getElementById("modal-content");

    carregarAuditoriasFinalizadas(); // Atualiza auditorias mais recentes

    const peritoAtualizado = team.find(p => p.nome === perito.nome);

    modalContent.innerHTML = `
      <h2>${peritoAtualizado.nome}</h2>
      <p><strong>Email:</strong> ${peritoAtualizado.email}</p>

      <h3>Auditorias Atuais:</h3>
      <ul>
        ${peritoAtualizado.auditoriasAtuais.length > 0 
          ? peritoAtualizado.auditoriasAtuais.map(a => `<li>${a.nome} - ${a.data} (${a.estado})</li>`).join("")
          : "<li>Sem auditorias para hoje</li>"
        }
      </ul>

      <h3>Auditorias Futuras:</h3>
      <ul>
        ${peritoAtualizado.auditoriasFuturas.length > 0 
          ? peritoAtualizado.auditoriasFuturas.map(a => `<li>${a.nome} - ${a.data} (${a.estado})</li>`).join("")
          : "<li>Sem auditorias futuras</li>"
        }
      </ul>

      <h3>Auditorias Realizadas:</h3>
      <ul>
        ${peritoAtualizado.auditoriasRealizadas.length > 0 
          ? peritoAtualizado.auditoriasRealizadas.map(a => `<li>${a.nome} - ${a.data}</li>`).join("")
          : "<li>Sem auditorias realizadas</li>"
        }
      </ul>

      <button class="fechar-btn" onclick="fecharModal()">Fechar</button>
    `;
    modal.style.display = "flex";
  }

  window.fecharModal = function () {
    document.getElementById("modal").style.display = "none";
  }

  function render() {
    carregarAuditoriasFinalizadas();
    criarCards();
  }

  window.addEventListener("storage", function (event) {
    if (event.key === "auditoriasEmProgresso") {
      render();
    }
  });

  render();

  // Guarda o estado atual
  let lastState = JSON.stringify(localStorage.getItem("auditoriasEmProgresso"));

  // Verifica a cada 5 segundos se mudou
  setInterval(() => {
    const currentState = JSON.stringify(localStorage.getItem("auditoriasEmProgresso"));
    if (currentState !== lastState) {
      lastState = currentState;
      render(); 
    }
  }, 5000);
});
