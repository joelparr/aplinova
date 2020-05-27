const enviar = document.getElementById('enviar');
const email = document.getElementById('email');

enviar.addEventListener('click', function(event){
    if(enviar.getAttribute('disable') === true){
        alert("Aguarde o sistema processar");
    }
    setTimeout(function(){
        if(email.value !== ""){
            enviar.classList.add("btn-cadastrar");
            enviar.setAttribute('disabled', true);
            setTimeout(function(){
                enviar.removeAttribute('disabled');
                enviar.classList.remove('btn-cadastrar');
            }, 60000)
        }
    }, 1500)
})