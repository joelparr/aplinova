/**
 * Description: Modulo de search do admin
 * Author: Findi
 */

 //Declaracao de variaveis
const search = document.getElementById('search');
const searchText = document.getElementById('searchText');
const treeviewDiv = document.getElementById('treeviewDiv');
const searchResult = document.getElementById('searchResult');
const tableCategoria = document.getElementById('tableCategoria');
const tableProduto = document.getElementById('tableProduto');

//Apertando no botao de search
search.addEventListener('click', function(event){
    const url = `/admin/search?prod=${searchText.value}`;
    tableCategoria.innerHTML = "";
    tableProduto.innerHTML = "";
    //Realiza AJAX para procura 
    $.get(url, function(data){
        treeviewDiv.classList.add("d-none");
        searchResult.classList.remove("d-none");
        console.log(data);
        //Carregando os dados na tabela produto
        data.result.resultCat.forEach(element=>{
            let row = tableCategoria.insertRow(0);
            row.classList.add("categoria");
            row.insertCell(0).innerHTML = element.id;
            row.insertCell(1).innerHTML = element.titulo;
            row.insertCell(2).innerHTML = element.descricao;
            //Recupera a categoria pai da subcategoria
            if(element.idCategoria === 0){
                let urlP = `/admin/categoria/${element.idCategoriaPai}`;
                getCategoria(urlP)
                .then(function(el){
                    row.insertCell(3).innerHTML = el.categoria.titulo;
                    row.insertCell(4).innerHTML = `<a href="/admin/subcategoria/${element.id}?method=delete" data-method="delete"><i class="fas fa-trash-alt" style="color: red;"></i></a>`
                })
            }
        })
        //Carregando os dados na tabela produto
        data.result.resultProd.forEach(element=>{
            let row = tableProduto.insertRow(0);
            row.classList.add("produto");
            row.insertCell(0).innerHTML = element.id;
            row.insertCell(1).innerHTML = element.titulo;
            row.insertCell(2).innerHTML = element.descricao;
            row.insertCell(3).innerHTML = element.categorias[0].titulo;
            row.insertCell(4).innerHTML = `<a href="/admin/produto/${element.id}?method=delete" data-method="delete"><i class="fas fa-trash-alt" style="color: red;"></i></a>`
        })
        //Recuperando a row categoria
        const categoriaRow = document.getElementsByClassName('categoria');
        //Adicionando um event listener a linha da categoria
        Array.from(categoriaRow).forEach(function(cat){
            cat.addEventListener('click', function(event){
                elementType = "sub";
                formTitulo.value = event.path[1].children[1].innerText;
                formDescricao.value = event.path[1].children[2].innerText;
                formSubcategoria.value = '-';
                if(event.path[1].children[3]){
                    if(event.path[1].children[3].innerText){
                        elementId = parseInt(event.path[1].children[0].innerText);
                        formCategoria.value = event.path[1].children[3].innerText;
                        formTitulo.removeAttribute('readonly');
                        formDescricao.removeAttribute('readonly');
                        atualizar.disabled = false;
                    }
                }else{
                    formTitulo.setAttribute('readonly', true);
                    formDescricao.setAttribute('readonly', true);
                    atualizar.disabled = true;
                }
                
            })
        })
        //Recuperando a row produto
        const produtoRow = document.getElementsByClassName('produto');
        //Adicionando um event listener para cada row
        Array.from(produtoRow).forEach(function(prod){
            prod.addEventListener('click', function(event){
                elementType = "prod";
                elementId = parseInt(event.path[1].children[0].innerText);
                formTitulo.value = event.path[1].children[1].innerText;
                formDescricao.value = event.path[1].children[2].innerText;
                formCategoria.value = event.path[1].children[3].innerText;
                formSubcategoria.value = '-';
                formTitulo.removeAttribute('readonly');
                formDescricao.removeAttribute('readonly');
                atualizar.disabled = false;
            })
        })
    })
});