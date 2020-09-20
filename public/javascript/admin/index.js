/**
 * Description: modulo javascript
 */
//Botoes das Flags

"use strict";

var Dashboard = function () {
	var global = {
		tooltipOptions: {
			placement: "right"
		},
		menuClass: ".c-menu"
	};

	// var menuChangeActive = function menuChangeActive(el) {
	// 	var hasSubmenu = $(el).hasClass("has-submenu");

	// 	$(global.menuClass + " .is-active").removeClass("is-active");
	// 	$(el).addClass("is-active");
		
	// 	if (hasSubmenu) {
	// 		$(el).find("ul").slideDown();
	// 	}
	// };

	var sidebarChangeWidth = function sidebarChangeWidth() {
		var $menuItemsTitle = $("li .menu-item__title");
		var imgLogo = document.getElementById('logo-admin');
		imgLogo.setAttribute('src', "../../public/img/logo-br-img.png");
		imgLogo.style.transition="all 0s";
		imgLogo.style.width = "30px";

		$("body").toggleClass("sidebar-is-reduced sidebar-is-expanded");
		$(".hamburger-toggle").toggleClass("is-opened");

		if ($("body").hasClass("sidebar-is-expanded")) {
		   imgLogo.setAttribute('src', "../../public/img/logo-light.svg");
		   imgLogo.style.transition="all 2s";
		   imgLogo.style.width = "150px";
		   $('[data-toggle="tooltip"]').tooltip("disable");
		} else {
			$('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
			$('[data-toggle="tooltip"]').tooltip("enable");
		}
	};

	return {
		init: function init() {
			sidebarChangeWidth();
			$(".js-hamburger").on("click", sidebarChangeWidth);

			// $(".js-menu li").on("click", function (e) {
			// 	menuChangeActive(e.currentTarget);
			// });

			$('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
		}
	};
}();

Dashboard.init();
//# sourceURL=pen.js

//Removendo a flag class dos botes e bandeiras
function removeFlagClass(flag){
    const eleEua = document.getElementsByClassName('eua');
    const elePt = document.getElementsByClassName('pt');
    const eleEsp = document.getElementsByClassName('esp');

    Array.from(eleEua).forEach(hit=>{
        flag === 'eua' ? hit.classList.remove('d-none') : hit.classList.add('d-none');
    });
    
    Array.from(elePt).forEach(hit=>{
        flag === 'pt' ? hit.classList.remove('d-none') : hit.classList.add('d-none');
    });
    
    Array.from(eleEsp).forEach(hit=>{
        flag === 'esp' ? hit.classList.remove('d-none') : hit.classList.add('d-none');
    });
}
