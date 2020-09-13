/**
 * Description: Modulo que monta os cards
 * Author: Daniel
 */

// const e = require("express");

//Declaracoes
const anchor = document.getElementsByClassName('details');
const cat = document.getElementsByClassName('cat');
//Components do form portugues
const formTitulo = document.getElementById('indextitulo');
const formDescricao = document.getElementById('indexdescricao');
const formCategoria = document.getElementById('indexcategoria');
const formSubcategoria = document.getElementById('indexsubCategoria');

//Components do form ingles
const formTituloEng = document.getElementById('tituloEng');
const formDescricaoEng = document.getElementById('descricaoEng');

//Components do form espanhol
const formTituloEsp = document.getElementById('tituloEsp');
const formDescricaoEsp = document.getElementById('descricaoEsp');

//Botao do formulario
const atualizar = document.getElementById('atualizar');
//User return
const success = document.getElementById('success');
const danger = document.getElementById('danger');
const getError = document.getElementById('getError');
const closeAlert = document.getElementsByClassName('close');

const deleteItem = document.getElementsByClassName('deleteItem');
const confirma = document.getElementById('confirma');

//Botoes das flags
var euaFlag = document.getElementById('eua-flag');
var espFlag = document.getElementById('esp-flag');
var ptFlag = document.getElementById('pt-flag');

var elementId;
var elementType;

//Carregamento da tela
window.onload = (event)=>{
    formTitulo.setAttribute('readonly', true);
    formTituloEng.setAttribute('readonly', true);
    formTituloEsp.setAttribute('readonly', true);
    formDescricao.setAttribute('readonly', true);
    formDescricaoEng.setAttribute('readonly', true);
    formDescricaoEsp.setAttribute('readonly', true);
    espFlag.style.opacity = 0.4;
    euaFlag.style.opacity = 0.4;
    ptFlag.style.opacity = 1;
    atualizar.disabled = true;
}

//Para cada linha da treeview adiciono um event listener
Array.from(anchor).forEach(el=>{
    el.addEventListener('click', function(event){
        elementId = event.target.dataset.id;
        formTitulo.removeAttribute('readonly');
        formTituloEng.removeAttribute('readonly');
        formTituloEsp.removeAttribute('readonly');
        formDescricao.removeAttribute('readonly');
        formDescricaoEng.removeAttribute('readonly');
        formDescricaoEsp.removeAttribute('readonly');
        atualizar.disabled = false;
        let url;
        //Verificando se a linha e de produto ou subcategoria
        switch(event.target.dataset.type){
            case 'prod':
                url = `/admin/produto/${event.target.dataset.id}`;
                elementType = "prod"
                break;
            case 'sub':
                url = `/admin/subcategoria/${event.target.dataset.id}`;
                elementType = "sub"
                break;
            default:
                alert('Nao foi possivel identificar o item selecionado')
        }
        //Recuperando a subcategoria
        getSubCategoria(url)
        .then(function(data){
            if(event.target.dataset.type === 'sub'){
                formTitulo.value = data.subCategoria.titulo;
                formTituloEng.value = data.subCategoria.tituloEng;
                formTituloEsp.value = data.subCategoria.tituloEsp;
                formDescricao.value = data.subCategoria.descricao;
                formDescricaoEng.value = data.subCategoria.descricaoEng;
                formDescricaoEsp.value = data.subCategoria.descricaoEsp;
                formSubcategoria.value = "-";
                url = `/admin/categoria/${data.subCategoria.idCategoriaPai}`;
                //Recuperando a categoria
                return getCategoria(url);
            }else{
                formTitulo.value = data.produto.titulo;
                formTituloEng.value = data.produto.tituloEng;
                formTituloEsp.value = data.produto.tituloEsp;
                formDescricao.value = data.produto.descricao;
                formDescricaoEng.value = data.produto.descricaoEng;
                formDescricaoEsp.value = data.produto.descricaoEsp;
                formSubcategoria.value = data.produto.categorias[0].titulo;
                url = `/admin/categoria/${data.produto.categorias[0].idCategoriaPai}`;
                //Recuperando a categoria
                return getCategoria(url);
            }
        })
        .then(function(data){
            event.target.dataset.type === 'sub' ? formCategoria.value = data.categoria.titulo : formCategoria.value = data.categoria.titulo;
        })
        .catch(function(error){
            getError.classList.remove("d-none");
        })
    })
});

//Promise que recupera a subcategoria
function getSubCategoria(url){
    return new Promise((resolve, reject)=>{
        $.get(url, function(data){
            if(data){
                resolve(data);
            }else{
                reject(0);
            }
            
        });
    })
}

//Promise que recupera a categoria
function getCategoria(url){
    return new Promise((resolve, reject)=>{
        $.get(url, function(data){
            if(data){
                resolve(data);
            }else{
                reject(0);
            }
            
        });
    });
}

//Acao do botao atualizar do formulario
atualizar.addEventListener('click', function(event){
    event.preventDefault();
    //Validacao do formulario
    if(formTitulo.value === "" || formTituloEng.value === "" || formTituloEsp.value === ""){
        // document.getElementById("demo").innerHTML = "Todas os campos precisam ser preenchidos";
        danger.classList.remove("d-none");
        return 0;
    }

    let url;
    switch(elementType){
        case "prod":
            url = `/admin/produto/${elementId}`;
            break;
        case "sub":
            url = `/admin/subcategoria/${elementId}`;
            break;
        default:
            url = "";
            alert("Nao foi escolhido um tipo de item")
    }
    
    const dataBody = {
        id: elementId,
        titulo: formTitulo.value,
        tituloEng: formTituloEng.value,
        tituloEsp: formTituloEsp.value,
        descricao: formDescricao.value,
        descricaoEng: formDescricaoEng.value,
        descricaoEsp: formDescricaoEsp.value,
        method: "patch"
    }
    $.post(url, dataBody, function(data){
        if(data){
            success.classList.remove("d-none");
            // if(treeviewDiv.classList.include("d-none")){
            //     window.location.reload();
            // }
        }else{
            danger.classList.remove("d-none");
        }
    }, "json");
})

//Caso o usuario clique em alguma CATEGORIA
Array.from(cat).forEach(el=>{
    el.addEventListener('click', function(event){
        formTitulo.value = "";
        formTituloEng.value = "";
        formTituloEsp.value = "";
        formDescricao.value = "";
        formDescricaoEng.value = "";
        formDescricaoEsp.value = "";
        formCategoria.value = "";
        formSubcategoria.value = "";
        formTitulo.setAttribute('readonly', true);
        formTituloEng.setAttribute('readonly', true);
        formTituloEsp.setAttribute('readonly', true);
        formDescricao.setAttribute('readonly', true);
        formDescricaoEng.setAttribute('readonly', true);
        formDescricaoEsp.setAttribute('readonly', true);
        atualizar.disabled = true;
    })
});

//Chamada da janela de confirmacao de delecao
var urlDelete = "";
Array.from(deleteItem).forEach(el=>{
    el.addEventListener('click', function(event){
        event.preventDefault();
        urlDelete = el.getAttribute('href');
        //Abrindo a janela de confirmacao
        $("#bd-confirmation-sm").modal();
    });
});
//Botao de confirmacao da janela
confirma.onclick = function(){
    location.href = urlDelete;
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

function removeFlagClass(flag){
    const eleEua = document.getElementsByClassName('eua');
    const elePt = document.getElementsByClassName('pt');
    const eleEsp = document.getElementsByClassName('esp');

    Array.from(eleEua).forEach(hit=>{
        flag === 'eua' ? hit.classList.remove('d-none') : hit.classList.add('d-none');
    });
    
    Array.from(elePt).forEach(hit=>{
        flag === 'pt' ? hit.classList.remove('d-none') : hit.classList.add('d-none');
    });
    
    Array.from(eleEsp).forEach(hit=>{
        flag === 'esp' ? hit.classList.remove('d-none') : hit.classList.add('d-none');
    });
}

Array.from(closeAlert).forEach(el=>{
    el.addEventListener('click', ev=>{
        let element = ev.path.filter(hit=>hit.id==="success" || hit.id==="danger" || hit.id==="getError");
        element[0].classList.add('d-none');
    })
})
