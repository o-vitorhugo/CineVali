function alterarQuantidade(button, delta) {
    const card = button.closest('.card, #produto9, #produto10');
    const quantidadeSpan = card.querySelector('.quantidade');
    const precoOriginal = parseFloat(card.dataset.preco);

    let quantidade = parseInt(quantidadeSpan.textContent);
    quantidade += delta;
    if (quantidade < 0) quantidade = 0;

    quantidadeSpan.textContent = quantidade;

    const precoElement = card.querySelector('.preco, .info p');
    
    if (quantidade > 0) {
        const precoAtualizado = (precoOriginal * quantidade).toFixed(2).replace('.', ',');
        precoElement.textContent = `R$ ${precoAtualizado}`;
    } else {
      
        precoElement.textContent = `R$ ${precoOriginal.toFixed(2).replace('.', ',')}`;
    }

    atualizarTotal();
}

function atualizarTotal() {
    const cards = document.querySelectorAll('.card, #produto9, #produto10');

    let total = parseFloat(sessionStorage.getItem("totalCompraIngressos")) || 0;

    const produtosSelecionados = [];

    cards.forEach(card => {
        const id = card.id || card.getAttribute('id');
        const preco = parseFloat(card.dataset.preco);
        const quantidade = parseInt(card.querySelector('.quantidade').textContent);
        const nome = card.querySelector('.titulo')?.textContent || "Produto";

        if (quantidade > 0) {
            produtosSelecionados.push({
                id,
                nome,
                preco,
                quantidade,
                subtotal: parseFloat((preco * quantidade).toFixed(2))
            });

            total += preco * quantidade;
        }
    });

    sessionStorage.setItem('totalCompra', total.toFixed(2));
    sessionStorage.setItem('produtosSelecionados', JSON.stringify(produtosSelecionados));

    const totalElement = document.getElementById('valor-total');
    totalElement.textContent = `R$ ${total.toFixed(2).replace('.', ',')}`;
}

window.onload = atualizarTotal;