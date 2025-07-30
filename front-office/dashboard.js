function logout() {
  window.location.href = "landingpage.html";
}

document.addEventListener("DOMContentLoaded", function () {
  // Abre o modal de Submeter Ocorrência
  window.openOccurrenceModal = function () {
    document.getElementById("ocorrenciaModal").style.display = "flex";
    document.getElementById("visualizarOcorrenciasModal").style.display = "none";
  };

  // Fecha o modal de Submeter Ocorrência
  window.closeOccurrenceModal = function () {
    document.getElementById("ocorrenciaModal").style.display = "none";
  };

  // Abre o modal de Visualizar Ocorrências
  window.showOccurrenceView = function () {
    document.getElementById("visualizarOcorrenciasModal").style.display = "flex";
    document.getElementById("ocorrenciaModal").style.display = "none";
    filterOccurrences('aceite'); // Mostra aceites por defeito
  };

  // Fecha o modal de Visualizar Ocorrências
  window.closeOccurrenceView = function () {
    document.getElementById("visualizarOcorrenciasModal").style.display = "none";
  };

  // Filtra e mostra as ocorrências do utilizador pelo estado escolhido
  window.filterOccurrences = function (estado) {
    const tbody = document.getElementById("occurrenceBody");
    tbody.innerHTML = "";

    const email = sessionStorage.getItem("userEmail") || "";

    if (!email) {
      tbody.innerHTML = `<tr><td colspan="5">Por favor, indique o seu email para ver as suas ocorrências.</td></tr>`;
      return;
    }

    const pedidos = loadOccurrences();
    // Filtra por utilizador e estado
    let minhasOcorrencias = pedidos.filter(o => o.cliente === email);

    if (estado === "devolver") {
      minhasOcorrencias = minhasOcorrencias.filter(o => o.estado === "devolver");
    } else if (estado === "aceite") {
      minhasOcorrencias = minhasOcorrencias.filter(o => o.estado === "aceite" || o.estado === "aprovado");
    } else if (estado === "recusado") {
      minhasOcorrencias = minhasOcorrencias.filter(o => o.estado === "recusado" || o.estado === "rejeitado");
    } else if (estado === "pendente") {
      minhasOcorrencias = minhasOcorrencias.filter(o => o.estado === "pendente");
    }

    if (minhasOcorrencias.length === 0) {
      tbody.innerHTML = `<tr><td colspan="5">Nenhuma ocorrência encontrada para este estado.</td></tr>`;
      return;
    }

    minhasOcorrencias.forEach(o => {
      let estadoApresentar = o.estado;
      if (estadoApresentar === "devolver") estadoApresentar = "DEVOLVIDO";
      else estadoApresentar = estadoApresentar.toUpperCase();

      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${o.descricao}</td>
        <td>${o.cliente}</td>
        <td>${o.data}</td>
        <td>${estadoApresentar}</td>
        <td>${o.motivo ? o.motivo : ""}</td>
      `;
      tbody.appendChild(row);
    });
  };
});

// Carrega ocorrências do localStorage
function loadOccurrences() {
  return JSON.parse(localStorage.getItem("pedidos")) || [];
}

// Salva ocorrências no localStorage
function saveOccurrences(ocorrencias) {
  localStorage.setItem("pedidos", JSON.stringify(ocorrencias));
}

// Submete nova ocorrência
function submitOccurrence() {
  const tipoProblema = document.querySelector("input[placeholder='Tipo de problema']").value.trim();
  const local = document.querySelector("input[placeholder='Local (Morada + Código Postal)']").value.trim();
  const telefone = document.querySelector("input[placeholder='Telemóvel']").value.trim();
  const email = document.querySelector("input[placeholder='Email']").value.trim();
  const descricao = document.querySelector("textarea").value.trim();

  if (!tipoProblema || !local || !telefone || !email || !descricao) {
    alert("Por favor, preencha todos os campos.");
    return;
  }

  // Guarda o email do utilizador na sessão para filtrar depois
  sessionStorage.setItem("userEmail", email);

  // Gera um ID sequencial a partir de 10
  let lastId = parseInt(localStorage.getItem("lastPedidoId")) || 9;
  const novoId = lastId + 1;
  localStorage.setItem("lastPedidoId", novoId);

  // Cria o objeto de pedido para o back-office
  const novoPedido = {
    id: novoId,
    descricao: tipoProblema,
    cliente: email,
    local,
    telefone,
    detalhes: descricao,
    data: new Date().toLocaleDateString("pt-PT"),
    estado: "pendente"
  };
  const pedidos = JSON.parse(localStorage.getItem("pedidos")) || [];
  pedidos.push(novoPedido);
  localStorage.setItem("pedidos", JSON.stringify(pedidos));

  alert("Ocorrência submetida com sucesso!");
  closeOccurrenceModal();

  // Limpar campos do formulário
  document.querySelectorAll(".modern-form input, .modern-form textarea").forEach(field => {
    field.value = "";
  });
}

// Torna a função global para o HTML conseguir chamar
window.submitOccurrence = submitOccurrence;
