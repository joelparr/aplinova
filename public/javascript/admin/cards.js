const anchor = document.getElementsByClassName('details');

Array.from(anchor).forEach(el=>{
    ///admin/produto/:id?type=prod
    el.addEventListener('click', function(event){
        event.preventDefault();
        console.log(event.target.dataset.id);
        const url = "/admin/"
    })
});