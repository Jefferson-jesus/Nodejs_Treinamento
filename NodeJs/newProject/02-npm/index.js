/*
0 Obter um usuário
1 Obter o numero de telefone de um usuário a partir de seu Id
2 Obter o endereço do usuario pelo Id
*/

function ObterUduario(callback){
    setTimeout(function () {
        return callback(null, {
            id: 1,
            nome: 'Aladin', 
            dataNascimento: new Date()
        });
    }, 1000);
}

function ObterTerlefone(idUsuario, callback){
    setTimeout(function(){
        return callback(null,{
            telefone: '97979-5088',
             ddd: 11
        });
    }, 2000);
}

function ObterEndereco(idUsuario, callback){
    setTimeout(function() {
        return callback (null, {
            rua: 'dos bobos',
            numero: 0
        });
    }, 2000);
}

function ResolverUsuario(erro, usuario){
    console.log('usuário', usuario);
}

ObterUduario(function ResolverUsuario(error, usuario){
    // null || "" || 0 === false
    if(error){
        console.error('Deu ruim em Usuário', error);
        return;
    }

    ObterTerlefone(usuario.id,function ResolverTelefone(error1,telefone){
        if(error1){
            console.error('Deu ruim em Telefone', error1);
            return;
        }
  

        ObterEndereco(usuario.id, function ResolverEndereco(error2, endereco){
            if(error2){
                console.error('Deu ruim em Endereço', error2);
                return;
            }

            console.log(`
                Nome: ${usuario.nome},
                Endereco: ${endereco.rua}, ${endereco.numero}      
                Telefones: (${telefone.ddd}) ${telefone.telefone}    
            `);

        });
    });
});
// const telefone = ObterTerlefone(usuario.id);


// console.log('Telefone', telefone);