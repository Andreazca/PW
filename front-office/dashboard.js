function logout() {
    window.location.href = "landingpage.html";
  }
  
  document.addEventListener("DOMContentLoaded", function () {
    window.openOccurrenceModal = function () {
      // Usar a classe 'show' para exibir o modal
      document.getElementById("occurrenceModal").classList.add('show');
      document.getElementById("occurrenceView").style.display = "none";
    };
  
    window.closeOccurrenceModal = function () {
      document.getElementById("occurrenceModal").classList.remove('show');
    };
  
    window.showOccurrenceView = function () {
      document.getElementById("occurrenceView").style.display = "flex";
      document.getElementById("occurrenceModal").classList.remove('show');
      filterOccurrences("pendente");
    };
  
    const allOccurrences = [
      { descricao: "Higiene", email: "jane@gmail.com", data: "03/03/2025", status: "recusado" },
      { descricao: "Monitorização", email: "floyd@gmail.com", data: "03/03/2025", status: "pendente" },
      { descricao: "Monitorização", email: "ronald@gmail.com", data: "04/03/2025", status: "aceite" },
      { descricao: "Segurança", email: "jerome@gmail.com", data: "04/03/2025", status: "recusado" },
      { descricao: "Segurança", email: "floyd@gmail.com", data: "06/03/2025", status: "pendente" },
      { descricao: "Higiene", email: "kathryn@gmail.com", data: "06/03/2025", status: "recusado" },
      { descricao: "Monitorização", email: "ronald@gmail.com", data: "08/03/2025", status: "aceite" },
      { descricao: "Higiene", email: "jane@gmail.com", data: "09/03/2025", status: "aceite" }
    ];
  
    window.filterOccurrences = function (status) {
      const tbody = document.getElementById("occurrenceBody");
      tbody.innerHTML = "";
    
      const icons = {
        aceite: "✔️",
        recusado: "❌",
        pendente: "⚠️"
      };
    
      const isAdmin = sessionStorage.getItem("userType") === "admin";
    
      const filtered = loadOccurrences()
        .map((item, index) => ({ ...item, index }))
        .filter(item => item.status === status);
    
      filtered.forEach(item => {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${item.descricao}</td>
          <td>${item.email}</td>
          <td>${item.data}</td>
          <td>
            ${
              isAdmin
                ? `<select onchange="updateStatus(${item.index}, this.value)">
                     <option value="pendente" ${item.status === "pendente" ? "selected" : ""}>⚠️ Pendente</option>
                     <option value="aceite" ${item.status === "aceite" ? "selected" : ""}>✔️ Aceite</option>
                     <option value="recusado" ${item.status === "recusado" ? "selected" : ""}>❌ Recusado</option>
                   </select>`
                : `<span class="status-icon ${item.status}">${icons[item.status]}</span>`
            }
          </td>
        `;
        tbody.appendChild(row);
      });
    };    
  });

  // ... filterOccurrences() termina aqui

function updateStatus(index, newStatus) {
  const occurrences = loadOccurrences();
  occurrences[index].status = newStatus;
  saveOccurrences(occurrences);
  filterOccurrences(newStatus);
}

  function loadOccurrences() {
    const saved = localStorage.getItem("occurrences");
    return saved ? JSON.parse(saved) : [];
  }
  
  function saveOccurrences(data) {
    localStorage.setItem("occurrences", JSON.stringify(data));
  }
  function submitOccurrence() {
    const inputs = document.querySelectorAll(".occurrence-left input");
    const descricaoTextarea = document.querySelector(".occurrence-right textarea");
  
    const tipoProblema = inputs[0].value.trim();
    const local = inputs[1].value.trim();
    const telefone = inputs[2].value.trim();
    const email = inputs[3].value.trim();
    const descricao = descricaoTextarea.value.trim();
  
    if (!tipoProblema || !local || !telefone || !email || !descricao) {
      alert("Por favor, preencha todos os campos.");
      return;
    }
  
    const nova = {
      descricao: tipoProblema,
      email: email,
      data: new Date().toLocaleDateString(),
      status: "pendente"
    };
  
    const ocorrencias = loadOccurrences();
    ocorrencias.push(nova);
    saveOccurrences(ocorrencias);
  
    alert("Ocorrência submetida com sucesso!");
    closeOccurrenceModal();
    inputs.forEach(input => input.value = "");
    descricaoTextarea.value = "";
  }
    