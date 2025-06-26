export async function renderProjetos(admin = false) {
  let containerProjetos = document.getElementById("container-projetos");
  let response = await fetch("/api/projetos");
  let data = await response.json();
  containerProjetos.innerHTML = "";

  data.forEach((projeto) => {
    let cardProjeto = document.createElement("div");
    cardProjeto.className =
      "flex flex-col gap-1 items-start justify-center p-4 rounded-lg shadow-md bg-red-400 w-full";

    cardProjeto.innerHTML = `
      <h2 class="text-xl font-bold">${projeto.nome}</h2>
      <p>${projeto.descricao}</p>
      <p>${projeto.data_criacao}</p>
      <p><strong>Status:</strong> ${projeto.status}</p>
      <a href="${
        projeto.link
      }" class="text-blue-800 underline" target="_blank">Link</a>
      ${
        admin
          ? `<div class="flex gap-2 mt-2">
              <button data-id="${projeto.id}" class="btn-editar bg-yellow-400 px-3 py-1 rounded">Editar</button>
              <button data-id="${projeto.id}" class="btn-excluir bg-red-600 text-white px-3 py-1 rounded">Excluir</button>
            </div>`
          : ""
      }
    `;

    containerProjetos.appendChild(cardProjeto);
  });

  if (admin) {
    // Adiciona funções aos botões de editar
    // Adiciona funções aos botões de excluir
    document.querySelectorAll(".btn-excluir").forEach((btn) => {
      btn.addEventListener("click", async () => {
        const id = btn.dataset.id;
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
