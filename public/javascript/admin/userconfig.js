const btnSalvar = document.getElementById('btn-salvar');
const password1 = document.getElementById('inputPassword1');
const password2 = document.getElementById('inputPassword2');
const method = document.getElementById('method');
const msg = document.getElementById('msg');
const btnMudarSenha = document.getElementById('btn-mudarsenha');
var id;

btnSalvar.addEventListener('click', function(event){
    event.preventDefault();
    if(password1.value !== password2.value){
        msg.innerHTML = "Passwords diferentes"
        return 0;
    }
    //Setando globalmente o ID
    id = btnMudarSenha.dataset.id;

    //Chamando a promise para verificar se a senha ja existe
    verificarSenha(password1.value)
    .then(function(result){
        return alterarSenha(password1.value, method.value);
    })
    .then(function(data){
        //Enviar alguma mensage
        if(data){
            location.reload();
        }
    })
    .catch(function(error){
        msg.innerHTML = error;
    })
    
});

function verificarSenha(newPassword){
    return new Promise((resolve, reject)=>{
        let url = 'compare/passwords';
        let data = {
            newpassword: newPassword
        }
        //POST
        fetch(url, {method:'POST', headers:{'Content-type': 'application/json'}, body:JSON.stringify(data)})
        .then(function(result){
            return result.json();
        })
        .then(function(data){
            if(!data.igual){
                resolve(data.igual);
            }
            reject('Insira senhas diferentes das que possui!');
        })
        .catch(function(error){
            reject(error);
        })
    });
}

function alterarSenha(newPassword, method){
    return new Promise((resolve, reject)=>{
        let url = `config/user/${id}`;
        let data = {
            password:newPassword,
            method:method
        }
        console.log(data);
        fetch(url, {method:'POST', headers:{'Content-type': 'application/json'}, body:JSON.stringify(data)})
        .then(function(result){
            return result.json();
        })
        .then(function(data){
            if(data){
                resolve(data);
            }else{
                reject('Nao foi possivel alterar a senha do usuario')
            }
        })
        .catch(function(error){
            reject(error);
        });
    })
}