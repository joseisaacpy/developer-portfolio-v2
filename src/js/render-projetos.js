// Função para renderizar os projetos com modo de admin e modo usuário
export async function renderProjetos(admin = false) {
  // Container de projetos
  let containerProjetos = document.getElementById("container-projetos");
  let response = await fetch("/api/projetos");
  let data = await response.json();
  // Limpa o container de projetos
  containerProjetos.innerHTML = "";
  // Para cada projeto, cria um card
  data.forEach((projeto) => {
    let cardProjeto = document.createElement("div");

    cardProjeto.className =
      "flex flex-col gap-1 items-start justify-center p-4 rounded-lg shadow-md bg-red-400 w-full";

    cardProjeto.innerHTML = `
      <h2 class="text-xl font-bold"><i class="fa-solid fa-briefcase mr-1"></i> ${
        projeto.nome
      }</h2>
      <p><i class="fa-solid fa-comment mr-1"></i> ${projeto.descricao}</p>
      <p><i class="fa-solid fa-calendar mr-1"></i>Data de Criação: ${
        projeto.data_criacao
      }</p>
      <p><i class="fa-solid fa-star mr-1"></i>Status: ${projeto.status}</p>
      <a target="_blank" href="${
        projeto.link
      }" class="text-blue-800 underline" target="_blank"> <i class="fa-solid fa-link mr-1"></i>Link do Projeto</a>
      
      ${
        admin
          ? `<div class="flex gap-2 mt-2">
              <button data-id="${projeto.id}" class="btn-editar bg-yellow-400 px-3 py-1 rounded">Editar</button>
              <button data-id="${projeto.id}" class="btn-excluir bg-red-600 text-white px-3 py-1 rounded">Excluir</button>
            </div>`
          : ""
      }
    `;
    // Container armazena os cards
    containerProjetos.appendChild(cardProjeto);
  });

  // Se estiver no modo admin
  if (admin) {
    // Valida se há projetos cadastrados
    if (containerProjetos.childElementCount === 0) {
      containerProjetos.innerHTML = `
      <p class="text-2xl text-center text-black font-bold animate-pulse">Nenhum projeto cadastrado</p>
      `;
    }
    // Adiciona funções aos botões de editar (em breve...)
    // Adiciona funções aos botões de excluir
    document.querySelectorAll(".btn-excluir").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
        const confirmar = confirm(
          "Tem certeza que deseja excluir esse projeto?"
        );
        if (!confirmar) return; // se clicar em "Cancelar", nada acontece

        await fetch(`/api/projetos/${id}`, { method: "DELETE" });
        renderProjetos(true); // recarrega lista no modo admin
      });
    });
  }
}

// Chama renderProjetos ao carregar a página
document.addEventListener("DOMContentLoaded", () => {
  renderProjetos(false); // modo admin com botões de editar/excluir
});
