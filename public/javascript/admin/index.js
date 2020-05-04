/**
 * Description: Logica para carregamento de dados
 * Author: Findi
 */
//Ao carregar sera carregado as opcoes de aromas para categorias pai
window.onload = (event)=>{
  const categoriaPai = document.getElementById("categoriaPai");
  var dataRetorno;
  $.get('/admin/categorias', function(data){
    data.data.forEach((element, index, array)=>{
      categoriaPai[index] = new Option(element.titulo, element.idCategoria, false, false);
    })
  });
}
//Caso o cadastro seja de categoria, entao devera desaparacer as opcoes de subcategoria
var categoria = document.getElementById('categoria');
var categoriaPai = document.getElementById('divCategoriaPai');
categoria.addEventListener('change', function(event){
  console.log(event.srcElement.checked);
  if(event.srcElement.checked){
    categoriaPai.style.display = 'none'
  }else{
    categoriaPai.style.display = 'block'
  }
});
