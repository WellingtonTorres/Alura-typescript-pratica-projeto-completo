import { Transacao } from "../types/Transacao.js";
import { TipoTransacao } from "../types/TipoTransacao.js";
import SaldoComponent from "./saldo-component.js";
import Conta from "../types/Conta-antiga.js";
import ExtratoComponent from "./extrato-component.js";

const elementoFormulario = document.querySelector(
  ".block-nova-transacao form"
) as HTMLFormElement;
//console.log(elementoFormulario);
elementoFormulario.addEventListener("submit", function () {
  try {
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
    let tipoTransacao: TipoTransacao =
      inputTipoTransacao.value as TipoTransacao; //a string vinda do formular deve estar contida no enum criado TipoTransacao
    let valor: number = inputValor.valueAsNumber;
    let data: Date = new Date(inputData.value + " 00:00:00");

    const novaTransacao: Transacao = {
      tipoTransacao: tipoTransacao,
      valor: Number(valor),
      data: data,
    };

    Conta.registrarTransacao(novaTransacao);
    SaldoComponent.atualizar();
    ExtratoComponent.atualizar();
    elementoFormulario.reset();
  } catch (erro) {
    alert(erro.message);
  }
});
