const elementoFormulario = document.querySelector(
  ".block-nova-transacao form"
) as HTMLFormElement;
//console.log(elementoFormulario);
elementoFormulario.addEventListener("submit", function () {
  event.preventDefault();
  if (!elementoFormulario.checkValidity()) {
    alert("Por Favor, preencha todos os campos da transação!");
  }

  const inputTipoTransacao = elementoFormulario.querySelector(
    "#tipoTransacao"
  ) as HTMLSelectElement;
  const inputValor = elementoFormulario.querySelector(
    "#valor"
  ) as HTMLInputElement;
  const inputData = elementoFormulario.querySelector(
    "#data"
  ) as HTMLInputElement;

  //let tipoTransacao: string = inputTipoTransacao.value;
  let tipoTransacao: TipoTransacao = inputTipoTransacao.value as TipoTransacao; //a string vinda do formular deve estar contida no enum criado TipoTransacao
  let valor: number = inputValor.valueAsNumber;
  let data: Date = new Date(inputData.value);

  //valor = Number(valor);

  if (tipoTransacao == TipoTransacao.DEPOSITO) {
    saldo += valor;
  } else if (
    tipoTransacao == TipoTransacao.TRANSFERENCIA ||
    tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO
  ) {
    saldo -= valor;
  } else {
    alert("Tipo de transação inválida!");
    return;
  }

  // elementoSaldo.textContent = saldo.toLocaleString("pt-br", {
  //   currency: "BRL",
  //   style: "currency",
  // });

  elementoSaldo.textContent = formatarMoeda(saldo);

  const novaTransacao: Transacao = {
    tipoTransacao: tipoTransacao,
    valor: Number(valor),
    data: data,
  };

  console.log(novaTransacao);
  elementoFormulario.reset();
});
