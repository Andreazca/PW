document.addEventListener("DOMContentLoaded", () => {
    const inputBusca = document.querySelector(".search-container #searchInput");

    inputBusca.addEventListener("input", (e) => {
        const termo = e.target.value.toLowerCase();
        const linhas = document.querySelectorAll(".info-table tr");
        linhas.forEach((linha) => {
            const textoLinha = linha.innerText.toLowerCase();
            linha.style.display = textoLinha.includes(termo) ? "" : "none";
        });
    });

    // Recupera o pedido armazenado no localStorage
    const pedido = JSON.parse(localStorage.getItem("pedidoSelecionado"));
    console.log("Pedido recuperado do localStorage:", pedido); // Log para verificar o pedido recuperado

    if (pedido) {
        // Preenche os campos com os dados do pedido
        document.getElementById("pedido-id").innerText = pedido.id;
        document.getElementById("pedido-tipo").innerText = pedido.tipo;
        document.getElementById("pedido-descricao").innerText = pedido.descricao;
        document.getElementById("pedido-detalhes").innerText = pedido.detalhes;
        document.getElementById("pedido-cliente").innerText = pedido.email;
        document.getElementById("pedido-data").innerText = pedido.data;
    } else {
        // Exibe um alerta se o pedido não foi encontrado
        alert("Nenhum pedido selecionado.");
    }

    const rejeitarBtn = document.querySelector(".btn-rejeitar");
    const aprovarBtn = document.querySelector(".btn-aprovar");
    const infoBtn = document.querySelector(".btn-info");

    rejeitarBtn.addEventListener("click", () => {
        alert("Pedido rejeitado com sucesso.");
    });

    aprovarBtn.addEventListener("click", () => {
        alert("Pedido aprovado com sucesso.");
    });

    infoBtn.addEventListener("click", () => {
        alert("Mais informações disponíveis sobre este pedido.");
    });

    const dadosPendentes = [
      { id: 55555, tipo: "Higiene", descricao: "Acumulação de pó", detalhes: "Solicita-se auditoria de higiene devido à acumulação excessiva de pó e resíduos têxteis na zona de operação das máquinas de fiar.", email: "jane@gmail.com", data: "02/03/2025" },
      { id: 567867, tipo: "Segurança", descricao: "Equipamento de proteção", detalhes: "Falta de equipamentos de proteção individual na área de trabalho.", email: "floyd@gmail.com", data: "03/03/2025" },
      { id: 456778, tipo: "Monitorização", descricao: "Monitorização de máquinas", detalhes: "Problemas na monitorização de máquinas de produção.", email: "ronald@gmail.com", data: "04/03/2025" },
      { id: 333333, tipo: "Monitorização", descricao: "Monitorização de temperatura", detalhes: "Temperatura elevada em áreas críticas.", email: "marvin@gmail.com", data: "05/03/2025" },
      { id: 456755, tipo: "Segurança", descricao: "Saídas de emergência", detalhes: "Saídas de emergência bloqueadas.", email: "jerome@gmail.com", data: "06/03/2025" }
    ];
});
