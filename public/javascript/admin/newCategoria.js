//Botoes das flags
const euaFlag = document.getElementById('eua-flag');
const espFlag = document.getElementById('esp-flag');
const ptFlag = document.getElementById('pt-flag');

window.onload = ()=>{
    //Setando as flags
    espFlag.style.opacity = 0.4;
    euaFlag.style.opacity = 0.4;
    ptFlag.style.opacity = 1;
}


//Acao para o botao de bandeira EUA
euaFlag.addEventListener('click', (ev)=>{
    //Colocando uma borda em volta para demonstrar selecao
    espFlag.style.opacity = 0.4;
    ptFlag.style.opacity = 0.4;
    euaFlag.style.opacity = 1;
    removeFlagClass('eua');
});

//Acao para o botao de bandeira Esp
espFlag.addEventListener('click', (ev)=>{
    //Colocando uma borda em volta para demonstrar selecao
    espFlag.style.opacity = 1;
    euaFlag.style.opacity = 0.4;
    ptFlag.style.opacity = 0.4;
    removeFlagClass('esp');
});

//Acao para o botao de bandeira EUA
ptFlag.addEventListener('click', (ev)=>{
    //Colocando uma borda em volta para demonstrar selecao
    ptFlag.style.opacity = 1;
    euaFlag.style.opacity = 0.4;
    espFlag.style.opacity = 0.4;
    removeFlagClass('pt');
});