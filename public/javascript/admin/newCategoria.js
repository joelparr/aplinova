//Botoes das flags
const euaFlag = document.getElementById('eua-flag');
const espFlag = document.getElementById('esp-flag');
const ptFlag = document.getElementById('pt-flag');

window.onload = ()=>{
    //Setando as flags
    espFlag.style.border = "none";
    euaFlag.style.border = 'none';
    ptFlag.style.border = "1px solid lightgray";
}


//Acao para o botao de bandeira EUA
euaFlag.addEventListener('click', (ev)=>{
    //Colocando uma borda em volta para demonstrar selecao
    espFlag.style.border = 'none';
    ptFlag.style.border = "none";
    euaFlag.style.border = "1px solid lightgray";
    removeFlagClass('eua');
});

//Acao para o botao de bandeira Esp
espFlag.addEventListener('click', (ev)=>{
    //Colocando uma borda em volta para demonstrar selecao
    espFlag.style.border = "1px solid lightgray";
    euaFlag.style.border = 'none';
    ptFlag.style.border = "none";
    removeFlagClass('esp');
});

//Acao para o botao de bandeira EUA
ptFlag.addEventListener('click', (ev)=>{
    //Colocando uma borda em volta para demonstrar selecao
    ptFlag.style.border = "1px solid lightgray";
    euaFlag.style.border = 'none';
    espFlag.style.border = "none";
    removeFlagClass('pt');
});