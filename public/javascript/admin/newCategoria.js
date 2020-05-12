/**
 * Description: Logica para carregamento de dados
 * Author: Findi
 */

 //Caso o cadastro seja de categoria, entao devera desaparacer as opcoes de subcategoria
 var categoria = document.getElementById('categoriaChecked');
 var categoriaPai = document.getElementById('divCategoriaPai');
 categoria.addEventListener('change', function(event){
   console.log(event.srcElement.checked);
   if(event.srcElement.checked){
     categoriaPai.style.display = 'none'
   }else{
     categoriaPai.style.display = 'block'
   }
 });

//Ao carregar sera carregado as opcoes de aromas para categorias pai
window.onload = (event)=>{
  const categoriaPai = document.getElementById("categoriaPai");

  if(categoriaPai.options.length === 0){
    $.get('/admin/categorias', function(data){
      console.log(data);
      if(data){
        data.data.forEach((element, index, array)=>{
          categoriaPai[index] = new Option(element.titulo, element.idCategoria, false, false);
        })
      }else{
        console.log(data.error);
      }
    });
  }
}
