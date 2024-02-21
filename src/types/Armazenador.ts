export class Armazenador {
  private constructor() {}

  static salvar(chave: string, valor: any): void {
    const valorComoString: string = JSON.stringify(valor);
    localStorage.setItem(chave, valorComoString);
  }

  static obter(
    chave: string,
    reviver?: (this: any, key: string, valeu: any) => any
  ) {
    const valor = localStorage.getItem(chave);

    if (valor == null) {
      return null;
    }

    if (reviver) {
      return JSON.parse(valor, reviver);
    }

    return JSON.parse(valor);
  }
}
