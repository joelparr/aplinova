const categoria = document.getElementsByClassName('cat');
const subcategoria = document.getElementsByClassName('subcat');
const produto = document.getElementById('prod');
const treeview = document.getElementsByClassName('treeview');

Array.from(categoria).forEach(function(cat){
	cat.addEventListener('click', function(catli){
		if(catli.path !== undefined){
			Array.from(catli.path[2].children).forEach(el=>{
				if(el.localName === "ul" && el.classList[0] !== "treeview"){
					el.classList.toggle('notativo');
				};
			});
		}else{
			Array.from(catli.target.parentElement.parentElement.children).forEach(el=>{
				if(el.localName === "ul" && el.classList[0] !== "treeview"){
					el.classList.toggle('notativo');
				};
			});
		}
	});
});

Array.from(subcategoria).forEach(function(sub){
		sub.addEventListener('click', function(subli){
			//catli.srcElement.offsetParent.children[0].children[0].children
			if(subli.path !== undefined){
				Array.from(subli.path[2].children).forEach(el=>{
					if(el.localName === "ul" && el.classList[0] !== "treeview"){
						el.classList.toggle('notativo');
					}
				})
			}else{
				Array.from(subli.target.parentElement.parentElement.children).forEach(el=>{
					if(el.localName === "ul"){
						el.classList.toggle('notativo');
					}
				})
			}
		})
});
