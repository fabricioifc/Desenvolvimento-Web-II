const calcular = (x,y) => {

    // Enquanto b for diferente de zero
    while (y !== 0) {
        // Atribuímos a b a variável a e a b o resto da divisão de a por b
        const temp = y;
        y = x % y;
        x = temp;
    }
    // Quando b for igual a zero, retornamos o valor de a, que é o MDC
    return x;
}

module.exports = calcular;