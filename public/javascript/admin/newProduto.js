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
const headerTituloEng = document.getElementById('headerTituloEng');
const headerDescricaoEng = document.getElementById('headerDescricaoEng');
const headerTituloEsp = document.getElementById('headerTituloEsp');
const headerDescricaoEsp = document.getElementById('headerDescricaoEsp');
const categoriaTitulo = document.getElementById('categoriaTitulo');
const categoriaDescricao = document.getElementById('categoriaDescricao');
const categoriaTituloEng = document.getElementById('categoriaTituloEng');
const categoriaDescricaoEng = document.getElementById('categoriaDescricaoEng');
const categoriaTituloEsp = document.getElementById('categoriaTituloEsp');
const categoriaDescricaoEsp = document.getElementById('categoriaDescricaoEsp');
const testeFechar = document.getElementById('testeFechar');

//Formulario
const formTituloPt = document.getElementById('formTituloPt');
const formTituloEng = document.getElementById('formTituloEng');
const formTituloEsp = document.getElementById('formTituloEsp');
const formDescricaoPt = document.getElementById('formDescricaoPt');
const formDescricaoEsp = document.getElementById('formDescricaoEsp');
const formDescricaoEng = document.getElementById('formDescricaoEng');

//Botoes das flags
const euaFlag = document.getElementById('eua-flag');
const espFlag = document.getElementById('esp-flag');
const ptFlag = document.getElementById('pt-flag');

//Botoes das flags de categoria
const euaCatFlag = document.getElementById('eua-cat-flag');
const espCatFlag = document.getElementById('esp-cat-flag');
const ptCatFlag = document.getElementById('pt-cat-flag');

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

    //Setando as flags
    espFlag.style.border = "none";
    euaFlag.style.border = 'none';
    ptFlag.style.border = "1px solid lightgray";

    //Setando as flags das categorias
    espCatFlag.style.border = "none";
    euaCatFlag.style.border = 'none';
    ptCatFlag.style.border = "1px solid lightgray";
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
            if(!naoSou.checked){
                divSubCategoria.style.display = 'block';
            } 
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
        return getSubCategoria(newSubCategoria.idCategoriaPai);
    })
    .then(function(sub){
        if(sub !== 0){
            sub.data.forEach((element, index, array)=>{
                subCategoria[index] = new Option(element.titulo, element.id, false, false);
            });
            //$('#exampleModalCenter').modal('toggle');
        }
    })
    .catch(function(error){
        alert("Nao foi possivel inserir a nova subcategoria");
    });    

});

//Funcao que realiza o AJAX para criacao de uma subcategoria
function postAdminSubCategoria(){
     //Ler do formulario os dados
    const body = {
        headerTitulo: headerTitulo.value,
        headerTituloEng: headerTituloEng.value,
        headerTituloEsp: headerTituloEsp.value,
        headerDescricao: headerDescricao.value,
        headerDescricaoEng: headerDescricaoEng.value,
        headerDescricaoEsp: headerDescricaoEsp.value,
        categoriaChecked: '0', //Not on para ser sub
        categoriaTitulo: categoriaTitulo.value,
        categoriaTituloEng: categoriaTituloEng.value,
        categoriaTituloEsp: categoriaTituloEsp.value,
        categoriaDescricao: categoriaDescricao.value,
        categoriaDescricaoEng: categoriaDescricaoEng.value,
        categoriaDescricaoEsp: categoriaDescricaoEsp.value,
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

//Acao para o botao de bandeira EUA
euaCatFlag.addEventListener('click', (ev)=>{
    //Colocando uma borda em volta para demonstrar selecao
    espCatFlag.style.border = 'none';
    ptCatFlag.style.border = "none";
    euaCatFlag.style.border = "1px solid lightgray";
    removeCatFlagClass('eua');
});

//Acao para o botao de bandeira Esp
espCatFlag.addEventListener('click', (ev)=>{
    //Colocando uma borda em volta para demonstrar selecao
    espCatFlag.style.border = "1px solid lightgray";
    euaCatFlag.style.border = 'none';
    ptCatFlag.style.border = "none";
    removeCatFlagClass('esp');
});

//Acao para o botao de bandeira EUA
ptCatFlag.addEventListener('click', (ev)=>{
    //Colocando uma borda em volta para demonstrar selecao
    ptCatFlag.style.border = "1px solid lightgray";
    euaCatFlag.style.border = 'none';
    espCatFlag.style.border = "none";
    removeCatFlagClass('pt');
});

 //Removendo a flag class dos botes e bandeiras
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