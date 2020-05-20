/**
 * Javascript que trata os dados de insercao de subcategorias e produtos
 * Author: Daniel
 */

 //Declaracao de variaveis
const categoriaPai = document.getElementById("categoriaPai");
const divSubCategoria = document.getElementById("divSubCategoria");
const subCategoria = document.getElementById("subCategoria");
const naoSou = document.getElementById('subCategoriaChecked');
const newSubcategoria = document.getElementById('newSubcategoria');

//Elementos para o form dentro da modal
const headerTitulo = document.getElementById('headerTitulo');
const headerDescricao = document.getElementById('headerDescricao');
const categoriaTitulo = document.getElementById('categoriaTitulo');
const categoriaDescricao = document.getElementById('categoriaDescricao');
const testeFechar = document.getElementById('testeFechar');

//Carregamento da pagina
window.onload = event=>{
    if(categoriaPai.options.length === 0){
        getCategorias()
        .then(function(data){
            if(data !== 0){
                data.data.forEach((element, index, array)=>{
                    categoriaPai[index] = new Option(element.titulo, element.idCategoria, false, false);
                });
                return getSubCategoria(categoriaPai.options[categoriaPai.selectedIndex].value);
            }
        })
        .then(function(sub){
            if(sub !== 0){
                sub.data.forEach((element, index, array)=>{
                    subCategoria[index] = new Option(element.titulo, element.id, false, false);
                })
            }
        })
        .catch(function(error){
            console.log("Nao ha subcategorias");
        });
    }
}

//Variacao do nao ser uma subcategoria
naoSou.addEventListener('change', function(event){
    if(event.srcElement.checked){
        divSubCategoria.style.display = 'none';
    }else{
        divSubCategoria.style.display = 'block';
    }
  });


categoriaPai.addEventListener('change', function(event){
    subCategoria.options.length = 0;
    getSubCategoria(categoriaPai.options[categoriaPai.selectedIndex].value)
    .then(function(sub){
        if(sub !== 0){
            sub.data.forEach((element, index, array)=>{
                subCategoria[index] = new Option(element.titulo, element.id, false, false);
            });
            divSubCategoria.style.display = 'block';
        }
    })
    .catch(function(erro){
        subCategoria.options.length = 0;
        alert("Esta categoria nao possui subcategoria");
    })
})

function getCategorias(){
    return new Promise((resolve, reject)=>{
        $.get('/admin/categorias', function(data){
            if(data.data.length){
                resolve(data);
            }else{
                reject(0);
            }
        })
    })
}

function getSubCategoria(categoriaPaiId){
    return new Promise((resolve, reject)=>{
        $.get(`/admin/subcategorias/${categoriaPaiId}`, function(data){
            if(data.data.length){
                resolve(data);
            }else{
                reject(0);
            }
        })
    })
}

//Ajax da nova subCategoria
newSubcategoria.addEventListener('click', function(event){
    event.preventDefault();

    if(headerTitulo.value === "" || categoriaTitulo.value === ""){
        document.getElementById("demo").innerHTML = "Todas os campos precisam ser preenchidos";
        return 0;
    }

    postAdminSubCategoria()
    .then(function(newSubCategoria){
        console.log(newSubCategoria);
        console.log(newSubCategoria.idCategoriaPai);
        return getSubCategoria(newSubCategoria.idCategoriaPai);
    })
    .then(function(sub){
        console.log(sub);
        if(sub !== 0){
            sub.data.forEach((element, index, array)=>{
                subCategoria[index] = new Option(element.titulo, element.id, false, false);
            });
            //$('#exampleModalCenter').modal('toggle');
        }
    })
    .catch(function(error){
        console.log(error);
        alert("Nao foi possivel inserir a nova subcategoria");
    });    

});

//Funcao que realiza o AJAX para criacao de uma subcategoria
function postAdminSubCategoria(){
     //Ler do formulario os dados
    const body = {
        headerTitulo: headerTitulo.value,
        headerDescricao: headerDescricao.value,
        categoriaChecked: '0', //Not on para ser sub
        categoriaTitulo: categoriaTitulo.value,
        categoriaDescricao: categoriaDescricao.value,
        categoriaPai: categoriaPai.options[categoriaPai.selectedIndex].value //numero
    }
    return new Promise((resolve, reject)=>{
        $.post("/admin/categoria", body, function(data){
            if(data){
                resolve(data);
            }else{
                reject(0)
            }
        }, "json");
    })
}