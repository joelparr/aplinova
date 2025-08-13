const btnSalvar = document.getElementById('btn-salvar');
const password1 = document.getElementById('inputPassword1');
const password2 = document.getElementById('inputPassword2');
const method = document.getElementById('method');
const msg = document.getElementById('msg');
const btnMudarSenha = document.getElementById('btn-mudarsenha');
const btnInativo = document.getElementsByClassName('inativo');
const btnSalvarInativo = document.getElementById('btn-salvar-inativo');
const btnBloquearInativo = document.getElementById('btn-bloquear-inativo');

//Modal
const title = document.getElementById('title');
const email = document.getElementById('email');
const role = document.getElementById('role');
const username = document.getElementById('username');
const admin = document.getElementById('admin');
const active = document.getElementById('active');
const inativoMethod = document.getElementById('inativoMethod');
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
        $.post(url, data, function(data){
            if(!data.igual){
                resolve(data.igual);
            }else{
                reject('Insira senha diferente da atual.');
            }
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
        
        $.post(url, data, function(data){
            if(data){
                resolve(data);
            }else{
                reject('Nao foi possivel alterar a senha do usuario');
            }
        })
    })
}

Array.from(btnInativo).forEach(element=>{
    element.addEventListener('click', function(event){
        id = event.target.dataset.id
        console.log(id);
        let url = `config/user/${id}`;
        //Recuperando os dados do usuario
        $.get(url, function(data){
            console.log(data);
            title.innerHTML = data.user.firstName
            email.innerHTML = data.user.email
            role.innerHTML = data.user.role
            username.innerHTML = data.user.username
            console.log(admin);
            data.user.admin ? admin.setAttribute('checked', true) : admin.removeAttribute('checked');
            data.user.active ? active.setAttribute('checked', true) : active.removeAttribute('checked');
        })
    })
});

btnSalvarInativo.addEventListener('click', function(event){
    event.preventDefault();
    data = {
        active: active.checked,
        admin: admin.checked,
        method: inativoMethod.value //patch
    }
    changeUser(data);
});

btnBloquearInativo.addEventListener('click', function(event){
    event.preventDefault();
    data={
        active: false,
        admin: false,
        method: inativoMethod.value,
        role: 'bloqueado'
    }

    changeUser(data);
});

//Funcao que ira enviar os dados de mudanca do usuario
function changeUser(data){
    let url = `config/user/${id}`;

    $.post(url, data, function(data){
        location.reload();
    })
}