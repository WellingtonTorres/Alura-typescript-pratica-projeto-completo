const elementoFormulario = document.querySelector(".block-nova-transacao form");
//console.log(elementoFormulario);
elementoFormulario.addEventListener("submit", function () {
    event.preventDefault();
    if (!elementoFormulario.checkValidity()) {
        alert("Por Favor, preencha todos os campos da transação!");
    }
    const inputTipoTransacao = elementoFormulario.querySelector("#tipoTransacao");
    const inputValor = elementoFormulario.querySelector("#valor");
    const inputData = elementoFormulario.querySelector("#data");
    //let tipoTransacao: string = inputTipoTransacao.value;
    let tipoTransacao = inputTipoTransacao.value; //a string vinda do formular deve estar contida no enum criado TipoTransacao
    let valor = inputValor.valueAsNumber;
    let data = new Date(inputData.value);
    //valor = Number(valor);
    if (tipoTransacao == TipoTransacao.DEPOSITO) {
        saldo += valor;
    }
    else if (tipoTransacao == TipoTransacao.TRANSFERENCIA ||
        tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO) {
        saldo -= valor;
    }
    else {
        alert("Tipo de transação inválida!");
        return;
    }
    elementoSaldo.textContent = saldo.toString();
    const novaTransacao = {
        tipoTransacao: tipoTransacao,
        valor: Number(valor),
        data: data,
    };
    console.log(novaTransacao);
    elementoFormulario.reset();
});
