import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";

let saldo: number = 3000;
const transacoes: Transacao[] =
  JSON.parse(
    localStorage.getItem("transacoes"),
    (key: string, value: string) => {
      if (key === "data") {
        return new Date(value);
      }

      return value;
    }
  ) || [];

function debitar(valor: number): void {
  if (valor <= 0) {
    throw new Error("O Valor a ser debitado deve ser maior que zero");
  }

  if (valor > saldo) {
    throw new Error("Saldo Insuficiente");
  }

  saldo -= valor;
}

function depositar(valor: number): void {
  if (valor <= 0) {
    throw new Error("O Valor a ser depositar deve ser maior que zero");
  }

  saldo += valor;
}

const Conta = {
  getSaldo() {
    return saldo;
  },

  getDataAcesso(): Date {
    return new Date();
  },

  registrarTransacao(novaTransacao: Transacao): void {
    if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
      depositar(novaTransacao.valor);
    } else if (
      novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA ||
      novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO
    ) {
      debitar(novaTransacao.valor);
    } else {
      throw new Error("Tipo de transação inválida!");
    }
    transacoes.push(novaTransacao);
    console.log(novaTransacao);
    localStorage.setItem("transacoes", JSON.stringify(transacoes));
  },
};

export default Conta;
