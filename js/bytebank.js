let saldo = 3000;

const elementoSaldo = document.querySelector(".saldo-valor .valor");
elementoSaldo.textContent = saldo;

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

  let tipoTransacao = inputTipoTransacao.value;
  let valor = inputValor.value;
  let data = inputData.value;

  //valor = Number(valor);

  if (tipoTransacao == "Depósito") {
    saldo += valor;
  } else if (
    tipoTransacao == "Transferência" ||
    tipoTransacao == "Pagamento de Boleto"
  ) {
    saldo -= valor;
  } else {
    alert("Tipo de transação inválida!");
    return;
  }

  elementoSaldo.textContent = saldo;

  const novaTransacao = {
    tipoTransacao: tipoTransacao,
    valor: Number(valor),
    data: data,
  };

  console.log(novaTransacao);
  elementoFormulario.reset();
});
