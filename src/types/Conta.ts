import { GrupoTransacao } from "./GrupoTransacao.js";
import { TipoTransacao } from "./TipoTransacao.js";
import { Transacao } from "./Transacao.js";
import { Armazenador } from "./Armazenador.js";

export class Conta {
  protected nome: string;
  protected saldo: number = Armazenador.obter<number>("saldo") || 0;
  private transacoes: Transacao[] =
    Armazenador.obter<Transacao[]>("transacoes", (key: string, value: any) => {
      if (key === "data") {
        return new Date(value);
      }
      return value;
    }) || [];

  constructor(nome: string) {
    this.nome = nome;
  }

  public geTitular() {
    return this.nome;
  }

  getGruposTransacoes(): GrupoTransacao[] {
    const gruposTransacoes: GrupoTransacao[] = [];
    const listaTrasacoes: Transacao[] = structuredClone(this.transacoes);
    const transacoesOrdenadas: Transacao[] = listaTrasacoes.sort(
      (t1, t2) => t2.data.getTime() - t1.data.getTime()
    );
    let lebelAtualGrupoTransacao: string = "";

    for (let transacao of transacoesOrdenadas) {
      let labelGrupoTransacao: string = transacao.data.toLocaleDateString(
        "pt-br",
        { month: "long", year: "numeric" }
      );
      if (lebelAtualGrupoTransacao != labelGrupoTransacao) {
        lebelAtualGrupoTransacao = labelGrupoTransacao;
        gruposTransacoes.push({
          label: labelGrupoTransacao,
          transacoes: [],
        });
      }
      gruposTransacoes.at(-1).transacoes.push(transacao);
    }
    return gruposTransacoes;
  }

  getSaldo() {
    return this.saldo;
  }

  getDataAcesso(): Date {
    return new Date();
  }

  registrarTransacao(novaTransacao: Transacao): void {
    if (novaTransacao.tipoTransacao == TipoTransacao.DEPOSITO) {
      this.depositar(novaTransacao.valor);
    } else if (
      novaTransacao.tipoTransacao == TipoTransacao.TRANSFERENCIA ||
      novaTransacao.tipoTransacao == TipoTransacao.PAGAMENTO_BOLETO
    ) {
      this.debitar(novaTransacao.valor);
      novaTransacao.valor *= -1;
    } else {
      throw new Error("Tipo de transação inválida!");
    }
    this.transacoes.push(novaTransacao);
    console.log(this.getGruposTransacoes());
    Armazenador.salvar("transacoes", JSON.stringify(this.transacoes));
  }

  debitar(valor: number): void {
    if (valor <= 0) {
      throw new Error("O Valor a ser debitado deve ser maior que zero");
    }

    if (valor > this.saldo) {
      throw new Error("Saldo Insuficiente");
    }

    this.saldo -= valor;
    Armazenador.salvar("saldo", this.saldo.toString());
  }

  depositar(valor: number): void {
    if (valor <= 0) {
      throw new Error("O Valor a ser depositar deve ser maior que zero");
    }

    this.saldo += valor;
    Armazenador.salvar("saldo", this.saldo.toString());
  }
}

export class ContaPremium extends Conta {
  registrarTransacao(transacao: Transacao): void {
    if (transacao.tipoTransacao === TipoTransacao.DEPOSITO) {
      console.log("Ganhou 0.50 centavos");
      transacao.valor += 0.5;
    }
    super.registrarTransacao(transacao);
  }
}

const conta = new Conta("Joana da Silva Oliveira");
const contaPremium = new ContaPremium("Wellington");
console.log(conta.geTitular());
export default conta;
