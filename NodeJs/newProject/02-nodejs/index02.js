const util = require('util')
const obterEnderecoAsync = util.promisify(obterEndereco)


function obterUsuario(){
    // quando der algum problema -> reject(ERRO)
    // quando sucess -> Resolv
    return new Promise(function resolvePromise(resolve, reject){
        setTimeout(() => {
            return resolve ({
                id: 1,
                nome: 'Aladin',
                dataNascimento: new Date()
            })
        }, 1000)
    })
}

function obterTelefone(idUsuario){
    return new Promise(function resolverPromise(resolve, reject){
        setTimeout(() => {
            return resolve({
                telefone: '11 97979-5088',
                ddd: 11
            })
        });
    })
}

function obterEndereco(idUsuario, callback){
    setTimeout(() => {
        return callback(null, {
            rua: 'Dos bolos',
            numero: 0
        })
    }, 2000);
}

// 1 primeiro passo adiconar a palavra async -> automaticamente ela retornara uma promise
main()
async function  main(){
    try{
        console.time('Medida-promise')
        const usuario = await obterUsuario()
        // const telefone = await obterTelefone(usuario.id)
        // const endereco = await obterEnderecoAsync(usuario.id)
        const resultado = await Promise.all([
            obterTelefone(usuario.id),
            obterEndereco(usuario.id)
        ])

        const endereco = resultado[1]
        const telefone = resultado[0]

        console.log(`
            Nome: ${usuario.nome},
            Telefone: (${telefone.nome}) ${telefone.telefone},
            Endereco: ${endereco.rua}, ${endereco.numero}
        `)
        console.timeEnd('Medida-promise')
    }
    catch  (error){
        console.log('Deu ruim', error)
    }
}


usuarioPromise
    .then(function (usuario){
        return obterTelefone(usuario.id)
        .then(function resolverTelefone(result){
            return {
                usuario: {
                    nome: usuario.nome,
                    id: usuario.id
                },
                telefone: result
            }
        })
    })
    .then(function (resultado){
        const endereco = obterEnderecoAsync(resultado.usuario.id)
        return endereco.then(function resolverEndereco(result){
            return {
                usuario: resultado.usuario,
                telefone: resultado.telefone,
                endereco: result
            }
        })
    })
    .then(function (resultado){
        console.log(`
            Nome: ${resultado.usuario.nome}
            Endereco: ${resultado.endereco.rua}, ${resultado.endereco.numero}
            Telefone: (${resultado.telefone.ddd}) ${resultado.telefone.telefone}
        `)
    })
    .catch(function (error){
        console.error('Deu ruim ', error)
    })