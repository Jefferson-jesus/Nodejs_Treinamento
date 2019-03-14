const service = require('./service')

async function main (){
    try {
        const result = await service.obterPessoas('a')
        const names = []

        console.time('for')
        for (let i = 0; i < result.results.length; i++) {
            const pessoa = result.results[i];
            names.push(pessoa.name)      
        }
        console.timeEnd('for')

        console.time('forin')
        for (let key in result.results) {
           const pessoa = result.results[key]
           names.push(pessoa.name)
        }
        console.timeEnd('forin')

         console.time('forOf')
        for (pessoa of result.results){
            names.push(pessoa.name)
        }
        console.timeEnd('forOf')

        console.log('names', names)
    } catch (error) {
        console.log('Error interno',error)
    }
}


main()