enum FormatoData {
  PADRAO = "DD/MM/AAAA",
  DIA_SEMANA_DIA_MES_ANO = "DIA_SEMANA, DD/MM/AAAA",
  DIA_MES = "DD//MM",
}

function formatarInformacoes(
  valor: number,
  data: Date,
  formatoData: FormatoData
): string {
  const dataFormatada = formatarData(data, formatoData);
  const valorFormatado = formatarMoeda(valor);
  return `${dataFormatada} - ${valorFormatado}`;
}
