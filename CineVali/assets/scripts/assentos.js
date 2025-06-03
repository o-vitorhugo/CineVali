const sessaoRecuperada = sessionStorage.getItem("sessaoFilme");
const dadosSessao = JSON.parse(sessaoRecuperada);
const precoIngresso = dadosSessao.preco;

let assentosSelecionados = [];

function selecionarAssento(assento) {
    const posicao = assento.dataset.posicao;

    if (assento.classList.contains("selecionado")) {
        assento.classList.remove("selecionado");
        assento.src = "./assets/images/assentos/cadeira-disponivel.png";
        assentosSelecionados = assentosSelecionados.filter(a => a !== posicao);
    } else {
        assento.classList.add("selecionado");
        assento.src = "./assets/images/assentos/cadeira-selecionada.png";
        assentosSelecionados.push(posicao);
    }

    atualizarTotal();
}

function atualizarTotal() {
    const total = assentosSelecionados.length * precoIngresso;
    document.getElementById("total").textContent = total.toFixed(2);
    sessionStorage.setItem("assentosSelecionados", JSON.stringify(assentosSelecionados));
    sessionStorage.setItem("totalCompraIngressos", total.toFixed(2));
}