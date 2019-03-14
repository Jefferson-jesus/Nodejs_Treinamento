const service = require('./service')

Array.prototype.meuMap = function (callback){
    const novoArrayMapeado = []
    for (let indice = 0; indice < this.length; indice++) {
        const resultado = callback(this[indice], indice);
        novoArrayMapeado.push(resultado)
    }

    return novoArrayMapeado;
}

async function main(){
    try {
        const results = await service.obterPessoas('a')
        // const names = []
        // result.forEach(function (item) {
        //     names.push(item.name)
        // })

        // results.results.map(function (pesso){
        //     return pessoa.name
        // })
        // Or

        // const names = results.results.map((pessoa) => pessoa.name)

        const names = results.results.meuMap(function (pessoa, indice){
            return `[${indice}] ${pessoa.name}`
        })
        console.log('names', names)

    } catch (error) {
        console.log('Deu ruim ',error)
    }
}

main()