const categoria = document.getElementsByClassName('cat');
const subcategoria = document.getElementsByClassName('subcat');
const produto = document.getElementById('prod');
const treeview = document.getElementsByClassName('treeview');

Array.from(categoria).forEach(function(cat){
	cat.addEventListener('click', function(catli){
		Array.from(catli.path[2].children).forEach(el=>{
			if(el.localName === "ul" && el.classList[0] !== "treeview"){
				el.classList.toggle('notativo');
			};
			
		});
	});
});

Array.from(subcategoria).forEach(function(sub){
		sub.addEventListener('click', function(subli){
			Array.from(subli.path[2].children).forEach(el=>{
				if(el.localName === "ul" && el.classList[0] !== "treeview"){
					el.classList.toggle('notativo');
				}
			})
		})
});
