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
  tipoTransacao: string;
  data: Date;
  valor: number;
};

const novaTransacao: Transacao = {
  tipoTransacao: "",
  data: new Date(),
  valor: 0,
};
