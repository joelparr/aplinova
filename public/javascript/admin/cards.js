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
const alert = document.getElementById('alert');
let mensagemAlert = document.createElement('h6'); //Criando um elemento para enviar ao div
const closeAlert = document.getElementsByClassName('close');

const deleteItem = document.getElementsByClassName('deleteItem');
const confirma = document.getElementById('confirma');

//Botoes das flags
var euaFlag = document.getElementById('eua-flag');
var espFlag = document.getElementById('esp-flag');
var ptFlag = document.getElementById('pt-flag');

var elementId;
var elementType;

//modal cat
const updateCat = document.getElementsByClassName('update-cat');
//Campos de dados da categoria
let catTitulo = document.getElementById('categoriaTitulo');
let catTituloEng = document.getElementById('categoriaTituloEng');
let catTituloEsp = document.getElementById('categoriaTituloEsp');
let catDescr = document.getElementById('categoriaDescricao');
let catDescrEng = document.getElementById('categoriaDescricaoEng');
let catDEscrEsp = document.getElementById('categoriaDescricaoEsp');
//Botoes das flags de categoria
const euaCatFlag = document.getElementById('eua-cat-flag');
const espCatFlag = document.getElementById('esp-cat-flag');
const ptCatFlag = document.getElementById('pt-cat-flag');
//Botao para atualizar a categoria
const catAtualizar = document.getElementById('updateCategoria');
//Id geral da categoria
var id;

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

    //Setando da janela de detalhes da categoria
    espCatFlag.style.opacity = 0.4;
    euaCatFlag.style.opacity = 0.4;
    ptCatFlag.style.opacity = 1;
}

//Para cada linha da treeview adiciono um event listener
Array.from(anchor).forEach(el=>{
    el.addEventListener('click', function(event){
        event.preventDefault();
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
                mensagemAlert.innerHTML = "Nao foi possivel identificar o item selecionado";
                alert.appendChild(mensagemAlert);
                alert.classList.add('alert-danger');
                alert.classList.remove("d-none");
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
            mensagemAlert.innerHTML = "Houve um problema para buscar o item!!";
            alert.appendChild(mensagemAlert);
            alert.classList.add('alert-danger');
            alert.classList.remove("d-none");
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
        mensagemAlert.innerHTML = "Todas os campos precisam ser preenchidos";
        alert.appendChild(mensagemAlert);
        alert.classList.add('alert-danger');
        alert.classList.remove("d-none");
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
            mensagemAlert.innerHTML = "O item foi alterado com sucesso!";
            alert.appendChild(mensagemAlert);
            alert.classList.add('alert-success');
            alert.classList.remove("d-none");
        }else{
            mensagemAlert.innerHTML = "Houve um problema na atualizacao do item! Verfique todos os campos.";
            alert.appendChild(mensagemAlert);
            alert.classList.add('alert-danger');
            alert.classList.remove("d-none");
        }
    }, "json");
})

//Caso o usuario clique em alguma CATEGORIA
Array.from(cat).forEach(el=>{
    el.addEventListener('click', function(event){
        event.preventDefault();
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

//Acao para o botao de bandeira EUA
euaCatFlag.addEventListener('click', (ev)=>{
    //Colocando uma borda em volta para demonstrar selecao
    espCatFlag.style.opacity = 0.4;
    ptCatFlag.style.opacity = 0.4;
    euaCatFlag.style.opacity = 1;
    removeCatFlagClass('eua');
});

//Acao para o botao de bandeira Esp
espCatFlag.addEventListener('click', (ev)=>{
    //Colocando uma borda em volta para demonstrar selecao
    espCatFlag.style.opacity = 1;
    euaCatFlag.style.opacity = 0.4;
    ptCatFlag.style.opacity = 0.4;
    removeCatFlagClass('esp');
});

//Acao para o botao de bandeira EUA
ptCatFlag.addEventListener('click', (ev)=>{
    //Colocando uma borda em volta para demonstrar selecao
    ptCatFlag.style.opacity = 1;
    euaCatFlag.style.opacity = 0.4;
    espCatFlag.style.opacity = 0.4;
    removeCatFlagClass('pt');
});

//TODO automatizar as duas funcoes
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

 //Removendo a flag class dos botes e bandeiras da janela de detalhes da categoria
 function removeCatFlagClass(flag){
    const eleEua = document.getElementsByClassName('cat-eua');
    const elePt = document.getElementsByClassName('cat-pt');
    const eleEsp = document.getElementsByClassName('cat-esp');

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
        let element = ev.path.filter(hit=>hit.id==="alert");
        element[0].classList.contains('alert-success') ? element[0].classList.remove('alert-success') : element[0].classList.remove('alert-danger');
        element[0].classList.add('d-none');
    })
});

//Recuperando o click do botao de detalhes da categoria
Array.from(updateCat).forEach(el=>{
  el.addEventListener('click', ev=>{
      ev.preventDefault();
      id = ev.target.dataset.id;
      url = `/admin/main/categoria/${id}`;
      $.get(url, function(data){
          if(data){ 
              console.log(data);
              catTitulo.value = data.categoria.titulo
              catTituloEng.value = data.categoria.tituloEng 
              catTituloEsp.value = data.categoria.tituloEsp
              catDescr.value = data.categoria.descricao
              catDescrEng.value = data.categoria.descricaoEng
              catDEscrEsp.value = data.categoria.descricaoEsp
          }
        });
  })  
});

updateCategoria.addEventListener('click', ev=>{
    ev.preventDefault();
    let url = `/admin/categoria/${id}`;
    const dataBody = {
        titulo: catTitulo.value,
        tituloEng: catTituloEng.value,
        tituloEsp: catTituloEsp.value,
        descricao: catDescr.value,
        descricaoEng: catDescrEng.value,
        descricaoEsp: catDescrEsp.value,
        method: "patch"
    }
    $.post(url, dataBody, function(data){
        if(data){
            console.log(data)
            // mensagemAlert.innerHTML = "O item foi alterado com sucesso!";
            // alert.appendChild(mensagemAlert);
            // alert.classList.add('alert-success');
            // alert.classList.remove("d-none");
        }else{
            console.log("nao deu")
            // mensagemAlert.innerHTML = "Houve um problema na atualizacao do item! Verfique todos os campos.";
            // alert.appendChild(mensagemAlert);
            // alert.classList.add('alert-danger');
            // alert.classList.remove("d-none");
        }
    }, "json");
})
