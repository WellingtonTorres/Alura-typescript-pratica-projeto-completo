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
});
