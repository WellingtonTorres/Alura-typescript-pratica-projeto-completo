// Define um decorator de método chamado LogTempo
export function LogTempo(target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    // Guarda uma referência ao método original
    const originalMethod = descriptor.value;

    // Substitui o método original por uma nova função
    descriptor.value = function (...args: any[]) {
        // Obtém o tempo inicial
        const startTime = Date.now();

        // Chama o método original com os argumentos originais
        const result = originalMethod.apply(this, args);

        // Obtém o tempo final
        const endTime = Date.now();

        // Calcula a diferença em milissegundos
        const duration = endTime - startTime;

        // Registra o tempo de execução no console
        console.log(`O método ${propertyKey} levou ${duration} ms para executar.`);

        // Retorna o resultado original
        return result;
    }

    // Retorna o descritor modificado
    return descriptor;
}