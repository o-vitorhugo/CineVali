document.addEventListener("DOMContentLoaded", () => {
    const filmes = [
        {
            id: 1,
            titulo: "Superman",
            genero: "Ação, Aventura, Ficção Científica",
            sinopse: "O super-herói Kryptoniano, Superman, luta para proteger a Terra contra as forças do mal enquanto tenta manter sua identidade secreta.",
            horarios: ["14:00", "17:30", "20:00"],
            sala: "Sala 1",
            cartaz: "./assets/images/filmes/cartaz_superman.jpg",
            classificacao: "./assets/images/filmes/classificacao-12.png",
            idadeClassificacao: "12 anos",
            preco: 15.00, 
        },
        {
            id: 2,
            titulo: "O Mistério da Floresta",
            genero: "Suspense, Terror",
            sinopse: "Um grupo de amigos enfrenta forças sombrias em uma floresta isolada.",
            horarios: ["15:00", "18:00", "21:00"],
            sala: "Sala 2",
            cartaz: "./assets/images/filmes/cartaz_misterio_floresta.jpeg",
            classificacao: "./assets/images/filmes/classificacao-12.png",
            idadeClassificacao: "12 anos",
            preco: 35.00 
        },
        {
            id: 3,
            titulo: "Encanto",
            genero: "Animação, Aventura, Família",
            sinopse: "Uma jovem garota em uma família mágica luta para descobrir seu próprio poder enquanto lida com as expectativas de sua família.",
            horarios: ["13:30", "16:00", "19:30"],
            sala: "Sala 3",
            cartaz: "./assets/images/filmes/cartaz_encanto.jpg",
            classificacao: "./assets/images/filmes/classificacao-livre.png",
            idadeClassificacao: "Livre",
            preco: 15.00 
        },
        {
            id: 4,
            titulo: "Free Guy",
            genero: "Ação, Comédia, Ficção Científica",
            sinopse: "Um caixa de banco descobre que é um personagem dentro de um videogame e decide se tornar o herói de sua própria história.",
            horarios: ["12:00", "15:30", "19:00"],
            sala: "Sala 4",
            cartaz: "./assets/images/filmes/cartaz_free_guy.jpg",
            classificacao: "./assets/images/filmes/classificacao-12.png",
            idadeClassificacao: "12 anos",
            preco: 25.00 
        },
        {
            id: 5,
            titulo: "A Casa Monstro",
            genero: "Animação, Aventura, Comédia",
            sinopse: "Três crianças descobrem que uma casa na vizinhança é, na verdade, um monstro vivo e precisam impedir que ela cause mais estragos.",
            horarios: ["11:00", "14:30", "18:00"],
            sala: "Sala 5",
            cartaz: "./assets/images/filmes/cartaz_casa_monstro.jpg",
            classificacao: "./assets/images/filmes/classificacao-livre.png",
            idadeClassificacao: "Livre",
            preco: 35.00 
        },
        {
            id: 6,
            titulo: "Gente Grande",
            genero: "Comédia",
            sinopse: "Cinco amigos de infância se reencontram após anos para passar um fim de semana juntos com suas famílias, revivendo velhas amizades e confusões.",
            horarios: ["12:30", "15:00", "17:45"],
            sala: "Sala 6",
            cartaz: "./assets/images/filmes/cartaz_gente_grande.jpg",
            classificacao: "./assets/images/filmes/classificacao-12.png",
            idadeClassificacao: "12 anos",
            preco: 25.00 
        },
        {
            id: 7,
            titulo: "Sonic 2: O Filme",
            genero: "Aventura, Comédia, Família",
            sinopse: "Sonic e Tails enfrentam o Dr. Robotnik e Knuckles em uma aventura emocionante para salvar o mundo.",
            horarios: ["14:30", "17:00", "20:45"],
            sala: "Sala 7",
            cartaz: "./assets/images/filmes/cartaz_sonic_2.jpg",
            classificacao: "./assets/images/filmes/classificacao-10.png",
            idadeClassificacao: "10 anos",
            preco: 15.00 
        },
        {
            id: 8,
            titulo: "Vizinhos",
            genero: "Comédia",
            sinopse: "Após se mudarem para a serra em busca de paz, Walter e Joana veem seus planos irem por água abaixo com a chegada de vizinhos nada tranquilos.",
            horarios: ["10:30", "13:45", "17:00"],
            sala: "Sala 8",
            cartaz: "./assets/images/filmes/cartaz_vizinhos.jpg",
            classificacao: "./assets/images/filmes/classificacao-14.png",
            idadeClassificacao: "14 anos",
            preco: 25.00 
        }
    ];

    const filmesContainer = document.querySelector(".filmes-container");

    filmes.forEach(filme => {
        const filmeCard = document.createElement("div");
        filmeCard.classList.add("card");
        filmeCard.innerHTML = `
            <img src="${filme.cartaz}" alt="${filme.titulo}">
            <p class="titulo">${filme.titulo}</p>
            <div class="info">
                <p class="genero-filme">${filme.genero}</p>
                <img src="${filme.classificacao}" alt="Classificação ${filme.idadeClassificacao}" class="classificacao">
            </div>
            <div class="botao-container">
                <button class="botao botao-detalhes" data-id="${filme.id}">Ver Detalhes</button>
                <button class="botao botao-comprar" data-id="${filme.id}">Comprar</button>
            </div>
        `;
        filmesContainer.appendChild(filmeCard);
    });

    const exibirPopup = (popupId) => {
        document.getElementById(popupId).style.display = "flex";
    };

    const fecharPopup = (popupId) => {
        document.getElementById(popupId).style.display = "none";
    };

    document.body.addEventListener("click", (event) => {
        if (event.target.classList.contains("fechar-popup")) {
            const popup = event.target.closest(".popup");
            if (popup) popup.style.display = "none";
        }
    });
    
    const verificarSelecionado = (botao) => {
        const diaSelecionado = document.querySelector(".dia.ativo");
        const horarioSelecionado = document.querySelector(".agendamento-horario.ativo");
        if (diaSelecionado && horarioSelecionado) {
            botao.disabled = false; 
        } else {
            botao.disabled = true;  
        }
    };
    
    document.body.addEventListener("click", (event) => {
        const { target } = event;

        if (target.classList.contains("botao-detalhes")) {
            const filmeId = target.getAttribute("data-id");
            const filme = filmes.find(f => f.id === parseInt(filmeId));
            if (filme) {
                document.querySelector("#popup h2").textContent = filme.titulo;
                document.querySelector("#genero").textContent = filme.genero;
                document.querySelector("#sinopse").textContent = filme.sinopse;
                document.querySelector("#horarios").textContent = filme.horarios.join(", ");
                document.querySelector("#sala").textContent = filme.sala;
                document.querySelector("#preco-filme").textContent = filme.preco.toFixed(2).replace('.', ',');
                exibirPopup("popup");
            }
        }
    
        if (target.classList.contains("botao-comprar")) {
            const filmeId = target.getAttribute("data-id");
            const filme = filmes.find(f => f.id === parseInt(filmeId));
            
            if (filme) {
                const diasContainer = document.getElementById("dias-container");
                const horariosContainer = document.getElementById("horarios-container");
                const numeroSala = document.getElementById("numero-sala");
                const precoSessao = document.getElementById("preco-sessao");
                const botaoProximo = document.querySelector(".botao-proximo-popup");
    
                numeroSala.textContent = filme.sala;
                precoSessao.textContent = filme.preco.toFixed(2).replace('.', ',');
    
                const gerarDiasDisponiveis = () => {
                    const diasSemana = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
                    const hoje = new Date();
                    diasContainer.innerHTML = "";
    
                    for (let i = 0; i < 5; i++) {
                        const data = new Date();
                        data.setDate(hoje.getDate() + i);
    
                        const diaSemana = diasSemana[data.getDay()];
                        const diaMes = String(data.getDate()).padStart(2, "0");
                        const mes = String(data.getMonth() + 1).padStart(2, "0");
    
                        const diaDiv = document.createElement("div");
                        diaDiv.className = "dia";
                        if (i === 0) diaDiv.classList.add("ativo");
                        diaDiv.dataset.data = `${data.getFullYear()}-${mes}-${diaMes}`;
                        diaDiv.innerHTML = `${diaSemana}<br>${diaMes}/${mes}`;
    
                        diaDiv.addEventListener("click", () => {
                            document.querySelectorAll(".dia").forEach(d => d.classList.remove("ativo"));
                            diaDiv.classList.add("ativo");
                            verificarSelecionado(botaoProximo);
                        });
    
                        diasContainer.appendChild(diaDiv);
                    }
                };
    
                const configurarSelecaoHorarios = () => {
                    horariosContainer.innerHTML = "";
                    filme.horarios.forEach(horario => {
                        const horarioDiv = document.createElement("div");
                        horarioDiv.className = "agendamento-horario";
                        horarioDiv.textContent = horario;
    
                        horarioDiv.addEventListener("click", () => {
                            horariosContainer.querySelectorAll(".agendamento-horario").forEach(h => h.classList.remove("ativo"));
                            horarioDiv.classList.add("ativo");
                            verificarSelecionado(botaoProximo);
                        });
    
                        horariosContainer.appendChild(horarioDiv);
                    });
                };
    
                document.querySelector(".botao-proximo-popup").addEventListener("click", () => {
                    const diaSelecionado = document.querySelector(".dia.ativo")?.dataset.data;
                    const horarioSelecionado = document.querySelector(".agendamento-horario.ativo")?.textContent;
    
                    if (!diaSelecionado || !horarioSelecionado) {
                        alert("Por favor, selecione uma data e um horário.");
                        return;
                    }

                    const dataBase = new Date(diaSelecionado); // Converte para um objeto Date
                    dataBase.setDate(dataBase.getDate() + 1); // Adiciona 1 dia à data base

    
                    const sessao = {
                        filme: filme.titulo,
                        genero: filme.genero,
                        sala: filme.sala,
                        data: dataBase.toISOString().split("T")[0],
                        horario: horarioSelecionado,
                        preco: filme.preco,
                    };
    
                    sessionStorage.setItem("sessaoFilme", JSON.stringify(sessao));
                    alert("Informações salvas com sucesso!");
                    fecharPopup("popup-sessoes");
                    window.location.href = './assentos.html';
                });
    
                gerarDiasDisponiveis();
                configurarSelecaoHorarios();
                exibirPopup("popup-sessoes");
            }
        }
    });
});
