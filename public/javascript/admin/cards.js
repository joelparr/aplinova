/**
 * Description: Modulo que monta os cards
 * Author: Daniel
 */
//Declaracoes
const anchor = document.getElementsByClassName('details');
const cat = document.getElementsByClassName('cat');
//Components do form
const formTitulo = document.getElementById('indextitulo');
const formDescricao = document.getElementById('indexdescricao');
const formCategoria = document.getElementById('indexcategoria');
const formSubcategoria = document.getElementById('indexsubCategoria');
//Botao do formulario
const atualizar = document.getElementById('atualizar');
//User return
const success = document.getElementById('success');
const danger = document.getElementById('danger');
const getError = document.getElementById('getError');

var elementId;
var elementType;

//Carregamento da tela
window.onload = (event)=>{
    formTitulo.setAttribute('readonly', true);
    formDescricao.setAttribute('readonly', true);
    atualizar.disabled = true;
}

//Para cada linha da treeview adiciono um event listener
Array.from(anchor).forEach(el=>{
    el.addEventListener('click', function(event){
        elementId = event.target.dataset.id;
        formTitulo.removeAttribute('readonly');
        formDescricao.removeAttribute('readonly');
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
                //console.log(data);
                formTitulo.value = data.subCategoria.titulo;
                formDescricao.value = data.subCategoria.descricao;
                formSubcategoria.value = "-";
                url = `/admin/categoria/${data.subCategoria.idCategoriaPai}`;
                //Recuperando a categoria
                return getCategoria(url);
            }else{
                formTitulo.value = data.produto.titulo;
                formDescricao.value = data.produto.descricao;
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
    if(formTitulo.value === "" || formDescricao.value === ""){
        document.getElementById("demo").innerHTML = "Todas os campos precisam ser preenchidos";
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
            alert("Nao foi escolhi um tipo de item")
    }
    
    const dataBody = {
        id: elementId,
        titulo: formTitulo.value,
        descricao: formDescricao.value,
        method: "patch"
    }
    $.post(url, dataBody, function(data){
        if(data){
            success.classList.remove("d-none");
        }else{
            danger.classList.remove("d-none");
        }
    }, "json");
})

//Caso o usuario clique em alguma CATEGORIA
Array.from(cat).forEach(el=>{
    el.addEventListener('click', function(event){
        formTitulo.value = "";
        formDescricao.value = "";
        formCategoria.value = "";
        formSubcategoria.value = "";
        formTitulo.setAttribute('readonly', true);
        formDescricao.setAttribute('readonly', true);
        atualizar.disabled = true;
    })
})