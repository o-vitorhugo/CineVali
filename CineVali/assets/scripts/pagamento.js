const botaoCartao = document.getElementById('metodo-cartao');
const modalCartao = document.getElementById('modal-cartao');
const fecharModal = document.getElementById('fechar-modal');
const formularioCartao = document.getElementById('formulario-cartao');

const botaoDinheiro = document.getElementById('metodo-dinheiro');
const modalDinheiro = document.getElementById('modal-dinheiro');
const fecharModalDinheiro = document.getElementById('fechar-modal-dinheiro');
const formularioDinheiro = document.getElementById('formulario-dinheiro');

const precisaTroco = document.getElementById('precisa-troco');
const campoTroco = document.getElementById('campo-troco');

botaoCartao.addEventListener('click', () => {
    modalCartao.style.display = 'block';
});

fecharModal.addEventListener('click', () => {
    modalCartao.style.display = 'none';
});

botaoDinheiro.addEventListener('click', () => {
    modalDinheiro.style.display = 'block';
});

fecharModalDinheiro.addEventListener('click', () => {
    modalDinheiro.style.display = 'none';
});

precisaTroco.addEventListener('change', () => {
    campoTroco.style.display = precisaTroco.value === 'sim' ? 'block' : 'none';
});

formularioCartao.addEventListener('submit', function (event) {
    event.preventDefault();

    const nomeCartao = document.getElementById('nome-cartao').value;
    const numeroCartao = document.getElementById('numero-cartao').value.replace(/\s/g, ''); 
    const validade = document.getElementById('validade').value; // Certifique-se de ter o ID correto do campo de validade
    const cvv = document.getElementById('cvv').value;

    if (!validarNumeroCartao(numeroCartao)) {
        alert('Número de cartão inválido!');
        return;
    }

    if (!validarValidade(validade)) {
        alert('Validade do cartão inválida!');
        return;
    }

    if (!/^\d{3}$/.test(cvv)) {
        alert('CVV inválido!');
        return;
    }

    const dadosPagamento = {
        metodo: 'cartao',
        nomeCartao,
        numeroCartao,
        validade,
        cvv
    };

    sessionStorage.setItem('dadosPagamento', JSON.stringify(dadosPagamento));
    window.location.href = './revisao.html';
});

formularioDinheiro.addEventListener('submit', function (event) {
    event.preventDefault();

    const precisa = precisaTroco.value === 'sim';
    const valorTroco = precisa ? parseFloat(document.getElementById('valor-troco').value) : null;

    const totalCompra = parseFloat(sessionStorage.getItem('totalCompra')) || 0;

    if (precisa && valorTroco < totalCompra) {
        alert('O valor de troco informado é menor que o total da compra.');
        return;
    }

    if (precisa && (isNaN(valorTroco) || valorTroco <= 0)) {
        alert('Por favor, informe um valor de troco válido.');
        return;
    }

    const dadosPagamento = {
        metodo: 'dinheiro',
        precisaTroco: precisa,
        valorPago: precisa ? valorTroco.toFixed(2) : null
    };

    sessionStorage.setItem('dadosPagamento', JSON.stringify(dadosPagamento));
    window.location.href = './revisao.html';
});

function mascaraNumeroCartao(event) {
    let input = event.target;
    let valor = input.value.replace(/\D/g, '');
    valor = valor.replace(/(\d{4})(\d{4})(\d{4})(\d{4})/, '$1 $2 $3 $4');
    input.value = valor;
}

function mascaraValidade(event) {
    let input = event.target;
    let valor = input.value.replace(/\D/g, '');
    if (valor.length <= 2) {
        valor = valor.replace(/(\d{2})/g, '$1');
    } else {
        valor = valor.replace(/(\d{2})(\d{2})/, '$1/$2');
    }
    input.value = valor.trim();
}

function mascaraCVV(event) {
    let input = event.target;
    let valor = input.value.replace(/\D/g, '');
    input.value = valor.slice(0, 3);
}

function validarNumeroCartao(numero) {
    numero = numero.replace(/\D/g, '');
    if (!/^[0-9]{13,19}$/.test(numero)) {
        return false;
    }

    let soma = 0;
    let deveDobrar = false;

    for (let i = numero.length - 1; i >= 0; i--) {
        let digito = parseInt(numero[i]);

        if (deveDobrar) {
            digito *= 2;
            if (digito > 9) digito -= 9;
        }

        soma += digito;
        deveDobrar = !deveDobrar;
    }

    return soma % 10 === 0;
}

function validarValidade(validade) {
    const [mes, ano] = validade.split('/').map((v) => parseInt(v, 10));

    if (isNaN(mes) || mes < 1 || mes > 12) {
        return false;
    }

    const dataValidade = new Date(`20${ano}`, mes - 1);
    const dataAtual = new Date();

    return dataValidade >= dataAtual;
}