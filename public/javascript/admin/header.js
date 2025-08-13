const inputSearch = document.getElementById('index-input-search');
const searchElement = document.getElementById('search');

//Verificando onde ira aparecer a barra de search do admin
if(location.href !== "http://localhost:3000/admin" && location.href !== "https://aplinova.herokuapp.com/admin" && location.href !== "https://aplinova.herokuapp.com/admin/#" && location.href !== "http://localhost:3000/admin/#"){
    inputSearch.classList.add("d-none");
    searchElement.classList.add("d-none");
}else{
    inputSearch.classList.remove("d-none");
    searchElement.classList.remove("d-none");
}
