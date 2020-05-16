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

//Elementos para o form
const headerTitulo = document.getElementById('headerTitulo');
const headerDescricao = document.getElementById('headerDescricao');
const categoriaTitulo = document.getElementById('categoriaTitulo');
const categoriaDescricao = document.getElementById('categoriaDescricao');
const categoriaChecked = document.getElementById('categoriaChecked');


//Modal
const modalCategoria = document.getElementById('exampleModalCenter');


//Variacao do nao ser uma subcategoria
naoSou.addEventListener('change', function(event){
    console.log(event.srcElement.checked);
    if(event.srcElement.checked){
        divSubCategoria.style.display = 'none';
    }else{
        divSubCategoria.style.display = 'block';
    }
  });


categoriaPai.addEventListener('change', function(event){
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
        divSubCategoria.style.display = 'none';
        alert("Esta categoria nao possui subcategoria");
    })
})

//Carregamento da pagina
window.onload = event=>{
    if(categoriaPai.options.length === 0){
        getCategorias()
        .then(function(data){
            if(data !== 0){
                data.data.forEach((element, index, array)=>{
                    categoriaPai[index] = new Option(element.titulo, element.id, false, false);
                });
                return getSubCategoria(categoriaPai.options[categoriaPai.selectedIndex].value);
            } 
        })
        .then(function(sub){
            console.log("achou a sub");
            console.log(sub);
            if(sub !== 0){
                sub.data.forEach((element, index, array)=>{
                    subCategoria[index] = new Option(element.titulo, element.id, false, false);
                })
            }
            
        })
        .catch(function(error){
            divSubCategoria.style.display = 'none';
            alert("Erro ao carregar os dados");
        });
    }
}

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

newSubcategoria.addEventListener('click', function(event){
    event.preventDefault();

    postAdminCategoria()
    .then(function(newSubCategoria){
        return getSubCategoria(newSubCategoria.idCategoriaPai);
    })
    .then(function(sub){
        if(sub !== 0){
            sub.data.forEach((element, index, array)=>{
                subCategoria[index] = new Option(element.titulo, element.id, false, false);
            });
            divSubCategoria.style.display = 'block';
            modalCategoria.modal('hide');
        }
    })
    .catch(function(error){
        alert("Nao foi possivel inserir a nova subcategoria");
    });    

});

//Funcao que realiza o AJAX para criacao de uma subcategoria
function postAdminCategoria(){
     //Ler do formulario os dados
    const body = {
        headerTitulo: headerTitulo.value,
        headerDescricao: headerDescricao.value,
        categoriaChecked: categoriaChecked.checked, //on
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
