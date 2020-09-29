/**
 * Description: Modulo de search do admin
 * Author: Findi
 * log:
 * 07/09/2020 - Recuperada a pesquisa, os dados sao salvos em um array para recuperar os valores das traducoes da pesquisa realizada
*/

 //Declaracao de variaveis
const search = document.getElementById('search');
const searchText = document.getElementById('searchText');
const treeviewDiv = document.getElementById('treeviewDiv');
const searchResult = document.getElementById('searchResult');
const tableCategoria = document.getElementById('tableCategoria');
const tableProduto = document.getElementById('tableProduto');
const divSub = document.getElementById('divSubcategoria');
const divProd = document.getElementById('divProdutos')

let dataSearchCat;
let dataSearchProd;

//Apertando no botao de search
search.addEventListener('click', ev=>{
    const url = `/admin/search?prod=${searchText.value}`;
    tableCategoria.innerHTML = "";
    tableProduto.innerHTML = "";
    //Realiza AJAX para procura 
    $.get(url, data=>{
        dataSearchCat = data.result.resultCat; //Atribuindo os valores do search para um array
        dataSearchProd = data.result.resultProd; //Atribuindo os valores do search para um array

        treeviewDiv.classList.add("d-none");
        searchResult.classList.remove("d-none");
        if(data.result.resultCat){
            //Carregando os dados na tabela prod
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
                    .then(el=>{
                        row.insertCell(3).innerHTML = el.categoria.titulo;
                        row.insertCell(4).innerHTML = `<a href="/admin/subcategoria/${element.id}?method=delete" data-method="delete"><i class="fas fa-trash-alt" style="color: red;"></i></a>`
                    })
                }
            });
            if(dataSearchCat.length) divSub.classList.remove('d-none');

        }

        if(data.result.resultProd){
            //Carregando os dados na tabela produto
            data.result.resultProd.forEach(element=>{
                let row = tableProduto.insertRow(0);
                row.classList.add("produto");
                row.insertCell(0).innerHTML = element.id;
                row.insertCell(1).innerHTML = element.titulo;
                row.insertCell(2).innerHTML = element.descricao;
                row.insertCell(3).innerHTML = element.categorias.length ? element.categorias[0].titulo : "";
                row.insertCell(4).innerHTML = `<a class="btn" href="/admin/produto/${element.id}?method=delete" data-method="delete"><i class="fas fa-trash-alt" style="color: red;"></i></a>`
            });

            if(dataSearchProd.length)divProd.classList.remove('d-none');
        }
        //Recuperando a row categoria
        const categoriaRow = document.getElementsByClassName('categoria');
        //Adicionando um event listener a linha da categoria
        Array.from(categoriaRow).forEach(cat=>{
            cat.addEventListener('click', event=>{
                let filterCat = dataSearchCat.filter(hit=>hit.id === parseInt(event.path[1].children[0].innerText));
                elementType = "sub";
                formTitulo.value = filterCat[0].titulo;
                formTituloEng.value = filterCat[0].tituloEng;
                formTituloEsp.value = filterCat[0].tituloEsp;
                formDescricao.value = filterCat[0].descricao;
                formDescricaoEng.value = filterCat[0].descricaoEng;
                formDescricaoEsp.value = filterCat[0].descricaoEsp;
                formSubcategoria.value = '-';
                if(event.path[1].children[3]){ //Caso tenha categoria, entao e uma subcategoria
                    if(event.path[1].children[3].innerText){
                        elementId = parseInt(event.path[1].children[0].innerText);
                        formCategoria.value = event.path[1].children[3].innerText;
                        removeAttributeForm();
                        atualizar.disabled = false;
                    }
                }else{
                    setAttributeForm()
                    atualizar.disabled = true;
                }
                
            })
        })
        //Recuperando a row produto
        const produtoRow = document.getElementsByClassName('produto');
        //Adicionando um event listener para cada row
        Array.from(produtoRow).forEach(prod=>{
            prod.addEventListener('click', event=>{
                let filterProd = dataSearchProd.filter(hit=>hit.id === parseInt(event.path[1].children[0].innerText));
                elementType = "prod";
                elementId = parseInt(event.path[1].children[0].innerText);
                //Recuperando os valores array
                formTitulo.value = filterProd[0].titulo;
                formTituloEng.value = filterProd[0].tituloEng;
                formTituloEsp.value = filterProd[0].tituloEsp;
                formDescricao.value = filterProd[0].descricao;
                formDescricaoEng.value = filterProd[0].descricaoEng;
                formDescricaoEsp.value = filterProd[0].descricaoEsp;
                formCategoria.value = event.path[1].children[3].innerText;
                formSubcategoria.value = '-';
                removeAttributeForm();
                atualizar.disabled = false;
            })
        })
    })
});

function removeAttributeForm(){
    formTitulo.removeAttribute('readonly');
    formDescricao.removeAttribute('readonly');
    formTituloEng.removeAttribute('readonly');
    formDescricaoEng.removeAttribute('readonly');
    formTituloEsp.removeAttribute('readonly');
    formDescricaoEsp.removeAttribute('readonly');
}

function setAttributeForm(){
    formTitulo.setAttribute('readonly', true);
    formDescricao.setAttribute('readonly', true);
    formTituloEng.setAttribute('readonly', true);
    formDescricaoEng.setAttribute('readonly', true);
    formTituloEsp.setAttribute('readonly', true);
    formDescricaoEsp.setAttribute('readonly', true);
}