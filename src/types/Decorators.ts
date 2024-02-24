export function ValidaDebito(
  target: any,
  propertyKey: string,
  descriptor: PropertyDescriptor
) {
  const orignalMethod = descriptor.value;

  descriptor.value = function (valorDoDebito: number) {
    if (valorDoDebito <= 0) {
      throw new Error("O valor a ser debitado precisa ser maior que zero!");
    }

    if (valorDoDebito > this.saldo) {
      throw new Error("Seu saldo é insuficiente para realizar a operação!");
    }

    return orignalMethod.apply(this, [valorDoDebito]);
  };

  return descriptor;
}


export function ValidaDeposito(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
  const orignalMethod = descriptor.value;
  descriptor.value = function (valorDoDeposito: number){
    if (valorDoDeposito <= 0 ) {
      throw new Error("O valor a ser depositado deve ser maior que zero.")
    }
    return orignalMethod.apply(this, [valorDoDeposito])
  }

  return descriptor;

}