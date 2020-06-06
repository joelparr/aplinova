const inputSearch = document.getElementById('index-input-search');
const searchElement = document.getElementById('search');

if(location.href !== "http://localhost:3000/admin" && location.href !== "http://localhost:3000/admin/#"){
    inputSearch.classList.add("d-none");
    searchElement.classList.add("d-none");
}else{
    inputSearch.classList.remove("d-none");
    searchElement.classList.remove("d-none");
}
