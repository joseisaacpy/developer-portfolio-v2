// Container dos projetos
let containerProjetos = document.getElementById("container-projetos");

// Função pra consumir API e renderizar os projetos
async function renderProjetos() {
  let response = await fetch("/api/projetos");
  let data = await response.json();
  containerProjetos.innerHTML = ""; // Limpa o container antes de renderizar os projetos
  // Para cada projeto, cria um card
  data.forEach((projeto) => {
    // Cria uma div para o card do projeto
    let cardProjeto = document.createElement("div");
    // Define a classe do card
    cardProjeto.className = "card-projeto";
    // Preenche o card com as informações do projeto
    cardProjeto.innerHTML = `
      <h2>${projeto.nome}</h2>
      <p>${projeto.descricao}</p>
      <p>${projeto.data_criacao}</p>
      <p>${projeto.status}</p>
    `;
    // Adiciona o card ao container de projetos
    containerProjetos.appendChild(cardProjeto);
  });
}

// Chama função para renderizar os projetos ao carregar a página
document.addEventListener("DOMContentLoaded", renderProjetos);
