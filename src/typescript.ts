let valor: number = 3000;
let qualquer: any = "";
qualquer = 4;

//Arrays
const lista = [];
lista.push("Jhon", "Ave");

const lista2: number[] = [];
lista2.push(2, 4);

// Tipos Personalizados (Type Alias)
type Transacao = {
  tipoTransacao: TipoTransacao;
  data: Date;
  valor: number;
};

// Enum
enum TipoTransacao {
  DEPOSITO = "Depósito",
  TRANSFERENCIA = "Transferência",
  PAGAMENTO_BOLETO = "Pagamento de Boleto",
}

const novaTransacao: Transacao = {
  tipoTransacao: TipoTransacao.DEPOSITO,
  data: new Date(),
  valor: 0,
};
