// Aguarda o carregamento completo do DOM antes de executar o código
document.addEventListener("DOMContentLoaded", function () {
  // Seleciona todos os botões de dropdown
  const dropdownBtns = document.querySelectorAll(".dropdown-btn");

  // Adiciona um evento de clique a cada botão de dropdown
  dropdownBtns.forEach(btn => {
    btn.addEventListener("click", function () {
      const submenu = this.nextElementSibling; // Obtém o submenu associado (ul)
      const arrow = this.querySelector(".arrow"); // Obtém a seta dentro do botão

      // Alterna a visibilidade do submenu
      if (submenu.style.display === "block") {
        submenu.style.display = "none"; // Esconde o submenu
        arrow.style.transform = "rotate(0deg)"; // Restaura a posição da seta
      } else {
        submenu.style.display = "block"; // Exibe o submenu
        arrow.style.transform = "rotate(180deg)"; // Rotaciona a seta para baixo
      }
    });
  });
});
