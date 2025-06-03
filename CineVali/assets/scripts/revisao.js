const sessaoFilme = JSON.parse(sessionStorage.getItem("sessaoFilme")) || {};
const assentos = JSON.parse(sessionStorage.getItem("assentosSelecionados")) || [];
const produtos = JSON.parse(sessionStorage.getItem("produtosSelecionados")) || [];
const dadosPagamento = JSON.parse(sessionStorage.getItem("dadosPagamento")) || {};

const dadosCompra = {
    filme: sessaoFilme.filme || "",
    data: sessaoFilme.data || "",
    genero: sessaoFilme.genero || "",
    horario: sessaoFilme.horario || "",
    preco: parseFloat(sessaoFilme.preco) || 0,
    sala: sessaoFilme.sala || "",
    assentosSelecionados: assentos,
    produtosSelecionados: produtos,
    totalCompraIngressos: assentos.length * parseFloat(sessaoFilme.preco) || 0,
    dadosPagamento: dadosPagamento
};

function carregarFilme() {
    document.getElementById("filme-nome").textContent = dadosCompra.filme;
    document.getElementById("filme-genero").textContent = dadosCompra.genero;
    document.getElementById("filme-horario").textContent = dadosCompra.horario;
    document.getElementById("filme-sala").textContent = dadosCompra.sala;
    document.getElementById("ingresso-preco").textContent = `R$ ${dadosCompra.preco.toFixed(2)}`;
    document.getElementById("quantidade-ingressos").textContent = dadosCompra.assentosSelecionados.length;
    document.getElementById("data-filme").textContent = new Date(dadosCompra.data).toLocaleDateString('pt-BR');
}

function carregarAssentos() {
    const tbodyAssentos = document.getElementById("tbody_assentos");
    tbodyAssentos.innerHTML = "";
    dadosCompra.assentosSelecionados.forEach((assento) => {
        const tr = document.createElement("tr");
        const tdAssento = document.createElement("td");
        tdAssento.textContent = assento;
        tr.appendChild(tdAssento);
        tbodyAssentos.appendChild(tr);
    });
}

function carregarProdutos() {
    const tbodyProdutos = document.getElementById("tbody_produtos");
    tbodyProdutos.innerHTML = "";
    dadosCompra.produtosSelecionados.forEach((produto) => {
        const tr = document.createElement("tr");
        const tdNome = document.createElement("td");
        tdNome.textContent = produto.nome;
        const tdPreco = document.createElement("td");
        tdPreco.textContent = `R$ ${produto.preco.toFixed(2)}`;
        const tdQuantidade = document.createElement("td");
        tdQuantidade.textContent = produto.quantidade;
        const tdSubtotal = document.createElement("td");
        const subtotal = produto.preco * produto.quantidade;
        tdSubtotal.textContent = `R$ ${subtotal.toFixed(2)}`;
        tr.appendChild(tdNome);
        tr.appendChild(tdPreco);
        tr.appendChild(tdQuantidade);
        tr.appendChild(tdSubtotal);
        tbodyProdutos.appendChild(tr);
    });
}

function definirMetodoPagamento() {
    const tituloMetodo = document.getElementById('metodo-pagamento-titulo');
    const valorTotalElemento = document.getElementById('valor-total-geral');
    const valorPagoElemento = document.getElementById('valor-pago');
    const valorTrocoElemento = document.getElementById('valor-troco');
    const metodoPagamento = dadosCompra.dadosPagamento.metodo || "Não definido";
    
    const totalGeral = dadosCompra.totalCompraIngressos + dadosCompra.produtosSelecionados.reduce((total, produto) => {
        return total + produto.preco * produto.quantidade;
    }, 0);

    const valorPago = parseFloat(dadosCompra.dadosPagamento.valorPago) || totalGeral;
    const precisaTroco = dadosCompra.dadosPagamento.precisaTroco || false;

    tituloMetodo.textContent = `Método de Pagamento: ${metodoPagamento === "cartao" ? "Cartão de Crédito/Débito" : "Dinheiro"}`;
    valorTotalElemento.textContent = `R$ ${totalGeral.toFixed(2).replace(".", ",")}`;

    if (metodoPagamento === "dinheiro") {
        if (precisaTroco) {
            if (valorPago >= totalGeral) {
                const troco = (valorPago - totalGeral).toFixed(2).replace(".", ",");
                valorTrocoElemento.textContent = `R$ ${troco}`;
            } else {
                valorTrocoElemento.textContent = "R$ 0,00"; 
            }
        } else {

            valorTrocoElemento.textContent = "R$ 0,00"; 
        }

        valorPagoElemento.textContent = `R$ ${valorPago.toFixed(2).replace(".", ",")}`;
    }

    if (metodoPagamento === "cartao") {
        valorPagoElemento.textContent = "Pagamento com Cartão (sem troco)";
        valorTrocoElemento.textContent = "R$ 0,00";
    }
}

function atualizarValoresTotais() {
    const totalIngressosElement = document.getElementById("valor-total-ingressos");
    const totalProdutosElement = document.getElementById("valor-total-produtos");
    const totalGeralElement = document.getElementById("valor-total-geral");

    const totalIngressos = dadosCompra.totalCompraIngressos;
    totalIngressosElement.textContent = `R$ ${totalIngressos.toFixed(2)}`;

    const totalProdutos = dadosCompra.produtosSelecionados.reduce((total, produto) => {
        return total + produto.preco * produto.quantidade;
    }, 0);
    totalProdutosElement.textContent = `R$ ${totalProdutos.toFixed(2)}`;

    const totalGeral = totalIngressos + totalProdutos;
    totalGeralElement.textContent = `R$ ${totalGeral.toFixed(2)}`;
}

function inicializarPagina() {
    carregarFilme();
    carregarAssentos();
    carregarProdutos();
    atualizarValoresTotais();
    definirMetodoPagamento();
}

window.onload = inicializarPagina;

function finalizarCompra() {
    const modalObrigado = document.getElementById('modal-obrigado');
    const botaoFechar = document.getElementById('fechar-modal-obrigado');
  
    modalObrigado.style.display = 'block';

    botaoFechar.addEventListener('click', () => {
        modalObrigado.style.display = 'none';
        window.location.href = 'index.html'; 
    });
}
