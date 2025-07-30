document.addEventListener("DOMContentLoaded", function () {
  // === MENU LATERAL ===
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");

  dropdownBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const submenu = this.nextElementSibling;
      const arrow = this.querySelector(".arrow");

      if (submenu.style.display === "block") {
        submenu.style.display = "none";
        arrow.style.transform = "rotate(0deg)";
      } else {
        submenu.style.display = "block";
        arrow.style.transform = "rotate(180deg)";
      }
    });
  });
  
    const nomeSelect = document.getElementById("materialNome");
    const tipoSelect = document.getElementById("materialTipo");
    const descricaoSelect = document.getElementById("materialDescricao");
    const stockInput = document.getElementById("materialStock");
    const quantidadeInput = document.getElementById("materialQuantidade");
    const IDInput = document.getElementById("materialID");
    const precoInput = document.getElementById("materialPreco");
    const precoUnitarioInput = document.getElementById("materialPrecoUnitario");
    
  
    const nomeParaDados = {
      "Spray Desinfetante": { tipo: "Higiene", descricao: "Higienização de zonas de contacto com máquinas", stock: 200 },
      "Kit de Limpeza": { tipo: "Higiene", descricao: "Inclui :Pano de microfibra antiestático; Escova de cerdas finas; Luvas descartáveis", stock: 900},
      "Botas de Biqueira de Aço": { tipo: "Segurança", descricao: "Calçado de proteção com biqueira reforçada", stock: 300 },
      "Kit de Primeiros Socorros": { tipo: "Segurança", descricao: "Inclui : Pensos rápidos; Soro fisiológico; Máscara descartável; Algodão; Álcool Isopropílico", stock: 150 },
      "Câmara Térmica": { tipo: "Monitorização", descricao: "Deteta aquecimentos anormais nos motores das máquinas e equipamentos elétricos", stock: 200 },
      "Termohigrómetro": { tipo: "Monitorização", descricao: "Mede a temperatura e humidade do ambiente de operação das máquinas", stock: 130  },
      "Sensor de Temperatura": { tipo: "Monitorização", descricao: "Monitoriza a temperatura dos cilindros de secagem do tecido", stock: 500  },
      "Sensor de Quebra de Fio": { tipo: "Monitorização", descricao: "Deteta automaticamente o momento em que o fio parte ou deixa de se mover normalmente", stock: 50 }
    };
  
    const IDPorMaterial = {
      "Spray Desinfetante": "11111",
      "Kit de Limpeza": "22222",
      "Botas de Biqueira de Aço": "33333",
      "Kit de Primeiros Socorros": "44444",
      "Câmara Térmica": "55555",
      "Termohigrómetro": "66666",
      "Sensor de Temperatura": "77777",
      "Sensor de Quebra de Fio": "88888"
    };
  
    const precoPorMaterial = {
      "Spray Desinfetante": 4.99,
      "Kit de Limpeza": 9.99,
      "Botas de Biqueira de Aço": 29.90,
      "Kit de Primeiros Socorros": 14.50,
      "Câmara Térmica": 199.99,
      "Termohigrómetro": 39.90,
      "Sensor de Temperatura": 12.50,
      "Sensor de Quebra de Fio": 8.75
    };
  
    function atualizarPrecoFinal() {
      const nomeSelecionado = nomeSelect.options[nomeSelect.selectedIndex].text;
      const quantidade = parseInt(quantidadeInput.value) || 0;
      const stock = parseInt(stockInput.value) || 0;
  
      // Validate quantity
      if (quantidade > stock) {
        alert("Quantidade excede o stock disponível.");
        quantidadeInput.value = stock;
        return;
      }
  
      // Calculate total price
      const precoUnitario = precoPorMaterial[nomeSelecionado] || 0;
      const precoFinal = (precoUnitario * quantidadeInput.value).toFixed(2);
      precoInput.value = precoFinal;
    }
  

    // Função para mudar de material atravésn do nome 
    nomeSelect.addEventListener("change", function () {
      //Guarda o nome do material selecionado (ex: "Spray Desinfetante") numa variável chamada nomeSelecionado.
      const nomeSelecionado = nomeSelect.options[nomeSelect.selectedIndex].text;

  
      // Se o material existir nos dados:
      if (nomeParaDados[nomeSelecionado]) {
        const dados = nomeParaDados[nomeSelecionado];
        // Preenche automaticamente os campos
        tipoSelect.value = dados.tipo;
        descricaoSelect.value =dados.descricao;
        stockInput.value = dados.stock;
        IDInput.value = IDPorMaterial[nomeSelecionado] || "";
        precoUnitarioInput.value = (precoPorMaterial[nomeSelecionado] || 0).toFixed(2);
      } else { //Se não existir limpa
        tipoSelect.value = "";
        descricaoSelect.innerHTML = '<option value="" disabled selected>Descrição</option>';
        stockInput.value = "";
        quantidadeInput.max = 1;
        IDInput.value = "";
        precoUnitarioInput.value = "";
      }
  
      atualizarPrecoFinal();
    });
    quantidadeInput.addEventListener("input", atualizarPrecoFinal);
});

    