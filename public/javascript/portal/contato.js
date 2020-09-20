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
    event.preventDefault();
    //Validacao do formulario
    if(nome.value === "" || email.value === "" || telefone.value === "" || empresa.value === "" || mensagem.value === ""){
        document.getElementById("demo").innerHTML = "Todas os campos precisam ser preenchidos";
        textInner.style.color = "red";
        return 0;
    }

    //Validando as infos do formulario
    if(!validacaoFormulario()){
        return 0;
    }

    //criando os dados que sera enviados
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

    enviandoMensagem();

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
            document.getElementById("demo").classList.remove('blinking');
            document.getElementById("demo").innerHTML = "Seu email foi enviado com sucesso";
            textInner.style.color = "lightgray";
            habilitaEntradas();
        }else{
            document.getElementById("demo").classList.remove('blinking');
            document.getElementById("demo").innerHTML = "Houve um problema ao enviar o email";
            textInner.style.color = "red";
            habilitaEntradas();
        }
    })
    .catch(err=>{
        console.log(err);
        document.getElementById("demo").classList.remove('blinking');
        document.getElementById("demo").innerHTML = "Houve um problema ao enviar o email";
        textInner.style.color = "red";
        habilitaEntradas();
    })
});

function validacaoFormulario(){
    limpaBorder(); //limpando as borders;
    let msg = "";
    if((nome.value).length < 2){
        msg = "O nome precisa ter mais caracteres para ser válido.";
        nome.style.borderBottom = '1px solid red';
    }else if(!(/([0-9a-zA-Z]+([_.-]?[0-9a-zA-Z]+)*@[0-9a-zA-Z]+[0-9,a-z,A-Z,.,-]*(.){1}[a-zA-Z]{2,4})+/.test(email.value))){
        msg = "O email precisa ser válido.";
        email.style.borderBottom = '1px solid red';
    }else if((telefone.value).length > 14 || (telefone.value).length < 10){
        msg = "O telefone esta com numero de caracteres errado.";
        telefone.style.borderBottom = '1px solid red';
    }else if(/([a-zA-Z])/.test(telefone.value)){
        msg = "O telefone nao pode conter letras.";
        telefone.style.borderBottom = '1px solid red';
    }else if(!(/(\(*\d{2}\)*)\s*(\d{4,5})\-*(\d{4,6})/.test(telefone.value))){
        msg = "O telefone precisa ter um padrao de (area) nnnnnnnnn";
        telefone.style.borderBottom = '1px solid red';
    }else if((empresa.value).length < 2){
        msg = "A empresa precisa ter mais caracteres.";
        empresa.style.borderBottom = '1px solid red';
    }else if((mensagem.value).length < 5){
        msg = "A mensagem esta com poucos caracteres";
        mensagem.style.borderBottom = '1px solid red';
    }

    if(msg !== "") document.getElementById("demo").innerHTML = msg;
    if(msg !== "") textInner.style.color = "red";
    if(msg !== "") return false;
    return true;
}

function enviandoMensagem(){
    desabilitaEntradas()
    let msg = "Enviando email...";
    document.getElementById("demo").innerHTML = msg;
    document.getElementById("demo").classList.add('blinking');
}

function limpaBorder(){
    email.style.borderBottom = '1px solid #ececec';
    nome.style.borderBottom = '1px solid #ececec';
    empresa.style.borderBottom = '1px solid #ececec';
    mensagem.style.borderBottom = '1px solid #ececec';
    telefone.style.borderBottom = '1px solid #ececec';
    document.getElementById("demo").innerHTML = "";
}

function desabilitaEntradas(){
    sendEmail.disabled = true;
    nome.readOnly = true;
    email.readOnly = true;
    empresa.readOnly = true;
    mensagem.readOnly = true;
    telefone.readOnly = true;
}

function habilitaEntradas(){
    sendEmail.disabled = false;
    nome.readOnly = false;
    email.readOnly = false;
    empresa.readOnly = false;
    mensagem.readOnly = false;
    telefone.readOnly = false;
}