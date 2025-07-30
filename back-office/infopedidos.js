document.addEventListener("DOMContentLoaded", () => {
    const auditoria = JSON.parse(localStorage.getItem("auditoriaSelecionada"));
  
    if (!auditoria) {
      document.querySelector(".form-container").innerHTML = "<p style='color:red;'>Erro: Nenhuma auditoria selecionada.</p>";
      return;
    }
  
    const tabela = document.querySelector(".audit-info");
  
    tabela.innerHTML = `
      <tr>
        <th>ID</th>
        <td>${auditoria.id}</td>
      </tr>
      <tr>
        <th>Descrição</th>
        <td>${auditoria.descricao}</td>
      </tr>
      <tr>
        <th>Responsável</th>
        <td>${auditoria.email}</td>
      </tr>
      <tr>
        <th>Data</th>
        <td>${auditoria.data}</td>
      </tr>
      <tr>
        <th>Estado</th>
        <td class="estado ${auditoria.estado}">${getIcone(auditoria.estado)}</td>
      </tr>
      <tr>
        <th>Notas</th>
        <td>${auditoria.notas || "Sem observações adicionais."}</td>
      </tr>
    `;
  
    function getIcone(estado) {
      switch (estado) {
        case "verde": return "✔️";
        case "amarelo": return "⚠️";
        case "vermelho": return "❌";
      }
    }
  });
  