/**
 * Description: Javascript para validacao do singup
 * Author: Findi
 */
//Declaracao
const cadastrar = document.getElementById('cadastrar');
//formulario
const firstname = document.getElementById('firstname');
const lastname = document.getElementById('lastname');
const username = document.getElementById('username');
const email = document.getElementById('email');
const password = document.getElementById('password');

//Validacao do campo username
firstname.addEventListener('change', function(e){
    if(username.value === ""){
        username.value = firstname.value;
    }else{
        if(firstname.value === ""){
            username.value - lastname.value;
        }else{
            username.value = `${firstname.value}.${lastname.value}`
        }
    }
})

//Validacao do campo username
lastname.addEventListener('change', function(e){
    if(username.value === ""){
        username.value = lastname.value;
    }else{
        if(lastname.value === ""){
            username.value - firstname.value;
        }else{
            username.value += "." + lastname.value;
        }
    }
})

//Desabilita o botao cadastrar 1,5 seg apos clicar
cadastrar.addEventListener('click', function(event){
    if(cadastrar.getAttribute('disable') === true){
        alert("Aguarde o sistema processar");
    }
    setTimeout(function(){
        if(email.value !== "" && firstname.value !== "" && lastname.value !== "" && username.value !== "" && password.value !== ""){
            cadastrar.classList.add("btn-cadastrar");
            cadastrar.setAttribute('disabled', true);
            setTimeout(function(){
                cadastrar.removeAttribute('disabled');
                cadastrar.classList.remove('btn-cadastrar');
            }, 60000)
        }
    }, 1500)
})