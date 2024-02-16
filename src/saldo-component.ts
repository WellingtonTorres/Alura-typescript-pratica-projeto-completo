let saldo: number = 3000;

// alert("teste compilacao");
const elementoSaldo = document.querySelector(
  ".saldo-valor .valor"
) as HTMLElement;
const elementoDataAcesso = document.querySelector(
  ".block-saldo time"
) as HTMLElement;

if (elementoSaldo) {
  elementoSaldo.textContent = saldo.toLocaleString("pt-br", {
    currency: "BRL",
    style: "currency",
  });
}

if (elementoDataAcesso) {
  const dataAcesso: Date = new Date();
  elementoDataAcesso.textContent = dataAcesso.toLocaleDateString("pt-br", {
    weekday: "long",
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}
