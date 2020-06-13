/**
 * Description: modulo javascript
 */
 "use strict";

 var Dashboard = function () {
 	var global = {
 		tooltipOptions: {
 			placement: "right"
 		},
 		menuClass: ".c-menu"
 	};

 	var menuChangeActive = function menuChangeActive(el) {
		 var hasSubmenu = $(el).hasClass("has-submenu");

 		$(global.menuClass + " .is-active").removeClass("is-active");
 		$(el).addClass("is-active");
		 
 		// if (hasSubmenu) {
 		// 	$(el).find("ul").slideDown();
 		// }
 	};

 	var sidebarChangeWidth = function sidebarChangeWidth() {
		 var $menuItemsTitle = $("li .menu-item__title");
		 var imgLogo = document.getElementById('logo-admin');
		 imgLogo.setAttribute('src', "../../public/img/logo-br-img.png")
		 imgLogo.style.width = "30px";

 		$("body").toggleClass("sidebar-is-reduced sidebar-is-expanded");
 		$(".hamburger-toggle").toggleClass("is-opened");

 		if ($("body").hasClass("sidebar-is-expanded")) {
			imgLogo.setAttribute('src', "../../public/img/logo-light.svg")
		 	imgLogo.style.width = "150px";
			$('[data-toggle="tooltip"]').tooltip("destroy");
 		} else {
 			$('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
 		}
 	};

 	return {
 		init: function init() {
 			$(".js-hamburger").on("click", sidebarChangeWidth);

 			$(".js-menu li").on("click", function (e) {
 				menuChangeActive(e.currentTarget);
 			});

 			$('[data-toggle="tooltip"]').tooltip(global.tooltipOptions);
 		}
 	};
 }();

 Dashboard.init();
 //# sourceURL=pen.js
