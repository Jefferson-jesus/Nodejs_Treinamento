/*
0 Obter um usuario
1 Preciso obter o numero de telelfone do usuário pelo Id
2 Obter o endereço do usuario pelo Id
*/
// importando um módulo interno do node.js
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


function resolverUsuario(erro,usuario){    
    console.log('usuario', usuario)
}

const usuarioPromise = obterUsuario()
//Para manipular com sucesso usamos a função .then
// para manipular erros, usamos .catch

// Usuario -> telefone -> telefone
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
        console.log('resultado', resultado)
    })
    .catch(function (error){
        console.error('Deu ruim ', error)
    })

//#region  Aindo codigo agora vamos usar promises
// obterUsuario(function resolverUsuario(error, usuario){
//     // null || "" || 0 === false
//     if(error){
//         console.log('Deu ruim em usuario!', usuario)
//         return;
//     }

//     obterTelefone(usuario.id,function resolverTelefone(error1, telefone){
//         if(error1){
//             console.log('Deu ruim em telefone', telefone)
//             return;
//         }
  

//         obterEndereco(usuario.id, function resolverEndereco(error2,endereco){
//             if(error2){
//                 console.log('Deu ruim no endereço', endereco)
//                 return;
//             }

//             console.log(`
//                 nome: ${usuario.nome},
//                 Endereço: ${endereco.rua}, ${endereco.numero},
//                 Telefone: (${telefone.ddd}) ${telefone.telefone}
//             `);
//         })

//     })

// })

//#endregion

// const usuario = obterUsuario()
// const telefone = obterTelefone(usuario.id)

// console.log('usuario', usuario)
// console.log('telefone', telefone)