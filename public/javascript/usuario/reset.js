const reset = document.getElementById('reset');
const email = document.getElementById('email');

reset.addEventListener('click', function(event){
    if(reset.getAttribute('disable') === true){
        alert("Aguarde o sistema processar");
    }
    setTimeout(function(){
        if(email.value !== ""){
            reset.classList.add("btn-cadastrar");
            reset.setAttribute('disabled', true);
            setTimeout(function(){
                reset.removeAttribute('disabled');
                reset.classList.remove('btn-cadastrar');
            }, 60000)
        }
    }, 1500)
})