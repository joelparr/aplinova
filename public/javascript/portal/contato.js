/**
 * Description: Modulo para envio do email de contato
 */
//Botao enviar
const enviar = document.getElementById('enviar');
//components do formulario
const nome = document.getElementById('nome');
const email = document.getElementById('email');
const telefone = document.getElementById('telefone');
const empresa = document.getElementById('empresa');
const mensagem = document.getElementById('mensagem');

//Configuracao do email
const url = "https://api.emailjs.com/api/v1.0/email/send";
const headers = {"Content-type":"application/json"};

//Botao que ira enviar o email para administrador e para o usuario como resposta
enviar.addEventListener('click', function(event){
    event.preventDefault();
    //Validacao do formulario
    if(nome.value === "" || email.value === "" || telefone.value === "" || empresa.value === "" || mensagem.value === ""){
        document.getElementById("demo").innerHTML = "Todas os campos precisam ser preenchidos";
        return 0;
    }
    sendContatoEmail()
    .then(function(result){
        if(result){
            return sendEmailResposta()
        }
    })
    .then(function(result){
        if(result){
            alert("Email enviado ao administrador")
        }else{
            alert("Problemas ao enviar o email")
        }
    })
    .catch(function(error){
        alert("Erro ao mandar o email");
    })

})

//Envio do email de contato com administrador
function sendContatoEmail(){
    return new Promise((resolve, reject)=>{

        const assunto = `Contato cliente: ${nome.value}`;

        const template = {
            user_id: "user_RtuuE0LQRe9QltUKAuJmS",
            service_id: "danielGmail",
            template_id:"template_1ofNnKLb",
            template_params: {
                'assunto': assunto,
                'destino': 'danieldts2013@gmail.com',
                'corpo': `Houve um contato do ${nome.value}. Email: ${email.value}`
            }
        }
        
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(template)
        };

        fetch(url, options)
        .then(function(result){
            if(result.ok){
                resolve(true);
            }else{
                reject(false);
            }
        })
        .catch(function(error){
            reject(false);
        })

    })
}

//Envio de email de confirmacao de contato para o usuario
function sendEmailResposta(){
    return new Promise((resolve, reject)=>{
        const assunto = `Seu contato foi realizado`;
        const template = {
            user_id: "user_RtuuE0LQRe9QltUKAuJmS",
            service_id: "danielGmail",
            template_id:"template_1ofNnKLb",
            template_params: {
                'assunto': assunto,
                'destino': email.value,
                'corpo': `Seu contato com a aplinova foi realizado com sucesso. Porfavor aguarde retorno.`
            }
        }
        
        const options = {
            method: 'POST',
            headers: headers,
            body: JSON.stringify(template)
        };

        fetch(url, options)
        .then(function(result){
            if(result.ok){
                resolve(true);
            }else{
                reject(false);
            }
        })
        .catch(function(error){
            reject(false);
        })
    })
}