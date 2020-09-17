/**
 * Description: Modulo para envio do email de contato
 */

// const { default: fetch } = require("node-fetch");

//Botao enviar
const sendEmail = document.getElementById('sendEmail');
//components do formulario
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const telefone = document.getElementById('telefone');
const empresa = document.getElementById('empresa');
const mensagem = document.getElementById('mensagem');

const textInner = document.getElementById('demo');

//Botao que ira enviar o email para administrador e para o usuario como resposta
sendEmail.addEventListener('click', function(event){
    console.log(event);
    event.preventDefault();
    //Validacao do formulario
    if(nome.value === "" || email.value === "" || telefone.value === "" || empresa.value === "" || mensagem.value === ""){
        document.getElementById("demo").innerHTML = "Todas os campos precisam ser preenchidos";
        textInner.style.color = "red";
        return 0;
    }

    const data = {
        nome: nome.value,
        email: email.value,
        telefone: telefone.value,
        empresa: empresa.value,
        mensagem: mensagem.value
    }
    
    const options = {
        method: 'POST',
        headers: {"Content-type":"application/json"},
        body: JSON.stringify(data)
    };

    fetch("/sendContato", options)
    .then(result=>{
        return result.json();
    })
    .then(result=>{
        console.log(result);
        if(result.done === true){
            nome.value = "";
            email.value = "";
            telefone.value = "";
            empresa.value = "";
            mensagem.value = "";
            document.getElementById("demo").innerHTML = "Seu email foi enviado com sucesso";
            textInner.style.color = "lightgray";
        }else{
            document.getElementById("demo").innerHTML = "Houve um problema ao enviar o email";
            textInner.style.color = "red";
        }
    })
    .catch(err=>{
        console.log(err);
    })
});