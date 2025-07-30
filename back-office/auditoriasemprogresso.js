document.addEventListener("DOMContentLoaded", function () {
  const tabela = document.querySelector("#tabelaAuditorias tbody");

  function carregarAuditorias() {
    const auditorias = JSON.parse(localStorage.getItem("auditoriasEmProgresso")) || [];
    const emProgresso = auditorias.filter(a => a.estado === "em progresso");
    renderTabela(emProgresso);
  }

  function renderTabela(lista) {
    tabela.innerHTML = "";
    lista.forEach((audi) => {
      const row = document.createElement("tr");
      row.innerHTML = `
        <td>${audi.nomeAuditoria}</td>
        <td>${audi.tipo}</td>
        <td>${audi.local}</td>
        <td>${audi.data}</td>
        <td>${audi.equipa}</td>
        <td><button class="btn-finalizar" onclick="finalizarAuditoria(${audi.id})">Finalizar</button></td>
      `;
      tabela.appendChild(row);
    });
  }

  window.finalizarAuditoria = function(id) {
    let auditorias = JSON.parse(localStorage.getItem("auditoriasEmProgresso")) || [];
    const auditoria = auditorias.find(a => a.id === id);

    if (!auditoria || auditoria.estado === "finalizado") {
      alert("Auditoria não encontrada ou já finalizada.");
      return;
    }

    // Repor stock dos materiais utilizados
    const materiais = JSON.parse(localStorage.getItem("materiais")) || [];

    auditoria.materiais.forEach(nomeMat => {
      const mat = materiais.find(m => m.nome === nomeMat);
      if (mat) {
        mat.stock += 1;
      }
    });

    // Atualiza estado da auditoria
    auditorias = auditorias.map(a =>
      a.id === id ? { ...a, estado: "finalizado" } : a
    );

    localStorage.setItem("materiais", JSON.stringify(materiais));
    localStorage.setItem("auditoriasEmProgresso", JSON.stringify(auditorias));

    gerarPDF(auditoria);

    alert("Auditoria finalizada, relatório gerado e materiais repostos no stock!");
    carregarAuditorias();
  };

  function gerarPDF(auditoria) {
    const { jsPDF } = window.jspdf;
    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Relatório Final de Auditoria", 20, 20);

    doc.setFontSize(12);
    doc.text(`Nome da Auditoria: ${auditoria.nomeAuditoria}`, 20, 40);
    doc.text(`Origem: ${auditoria.origem}`, 20, 50);
    doc.text(`Descrição: ${auditoria.descricao}`, 20, 60);
    doc.text(`Tipo: ${auditoria.tipo}`, 20, 70);
    doc.text(`Local: ${auditoria.local}`, 20, 80);
    doc.text(`Morada: ${auditoria.morada}`, 20, 90);
    doc.text(`Perito: ${auditoria.equipa}`, 20, 100);
    doc.text(`Materiais: ${auditoria.materiais.join(", ")}`, 20, 110);
    doc.text(`Data Prevista: ${auditoria.data}`, 20, 120);
    doc.text(`Duração Estimada: ${auditoria.duracao} horas`, 20, 130);
    doc.text(`Custo Total: ${auditoria.custo.toFixed(2)} euros`, 20, 140);

    doc.save(`Relatorio_Auditoria_${auditoria.id}.pdf`);
  }

  carregarAuditorias();
});
