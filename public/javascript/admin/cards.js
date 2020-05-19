const anchor = document.getElementsByClassName('details');
//Components do form
const formTitulo = document.getElementById('indextitulo');
const formDescricao = document.getElementById('indexdescricao');
const formCategoria = document.getElementById('indexcategoria');
const formSubcategoria = document.getElementById('indexsubCategoria');
//Botao do formulario
const atualizar = document.getElementById('atualizar');

Array.from(anchor).forEach(el=>{
    el.addEventListener('click', function(event){
        let url;
        switch(event.target.dataset.type){
            case 'prod':
                url = `/admin/produto/${event.target.dataset.id}`;
                break;
            case 'sub':
                url = `/admin/subcategoria/${event.target.dataset.id}`;
                break;
            default:
                alert('Nao foi possivel identificar o item selecionado')
        }
        getSubCategoria(url)
        .then(function(data){
            if(event.target.dataset.type === 'sub'){
                console.log(data);
                formTitulo.value = data.subCategoria.titulo;
                formDescricao.value = data.subCategoria.descricao;
                formSubcategoria.value = "-";
                url = `/admin/categoria/${data.subCategoria.idCategoriaPai}`;
                return getCategoria(url);
            }else{
                formTitulo.value = data.produto.titulo;
                formDescricao.value = data.produto.descricao;
                formSubcategoria.value = data.produto.categorias[0].titulo;
                url = `/admin/categoria/${data.produto.categorias[0].idCategoriaPai}`;
                return getCategoria(url);
            }
        })
        .then(function(data){
            event.target.dataset.type === 'sub' ? formCategoria.value = data.categoria.titulo : formCategoria.value = data.categoria.titulo;
            console.log(data);
        })
        .catch(function(error){
            console.log(error);
        })
    })
});

function getSubCategoria(url){
    return new Promise((resolve, reject)=>{
        $.get(url, function(data){
            if(data){
                resolve(data);
            }else{
                reject("Erro ao trazer a sub categoria");
            }
            
        });
    })
}

function getCategoria(url){
    return new Promise((resolve, reject)=>{
        $.get(url, function(data){
            if(data){
                resolve(data);
            }else{
                reject("Erro ao trazer a sub categoria");
            }
            
        });
    });
}

atualizar.addEventListener('click', function(event){
    event.preventDefault();
    console.log('Nao realizou o submit');
})