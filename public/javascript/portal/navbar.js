const productsLink = document.getElementsByClassName('navbar__item--products')[0];
const productsDropdown = document.getElementsByClassName('navbar__products-dropdown')[0];
let dropdownActive = false

productsLink.addEventListener('mouseenter', () => {
    productsDropdown.classList.add('navbar__products-dropdown--active')
})
productsLink.addEventListener('mouseleave', () => {
    if (!dropdownActive) {
        productsDropdown.classList.remove('navbar__products-dropdown--active')
    }
})

productsLink.addEventListener('click', () => {
    if (!dropdownActive) {
        productsDropdown.classList.add('navbar__products-dropdown--active')
    } else {
        productsDropdown.classList.remove('navbar__products-dropdown--active')
    }
    dropdownActive = !dropdownActive
})

$(document).ready(function () {
    const navBar = $('.navbar');
    const closeIcon = $('.navbar__close-icon');
    const menuIcon = $('.navbar__menu-icon');

    let isScrolling = false;
    let isMenuOpen = false;

    menuIcon.click(function () {
        isMenuOpen = true;
        navBar.addClass('navbar--menu-state');
        navBar.removeClass('navbar--initial-state');
        navBar.removeClass('navbar--scrolled-state');
    })

    closeIcon.click(function () {
        isMenuOpen = false;
        navBar.removeClass('navbar--menu-state');
        checkState();
    })

    $(window).scroll(() => isScrolling = true);

    function switchInto() {
        if (!isMenuOpen) {
            navBar.removeClass('navbar--initial-state');
            navBar.addClass('navbar--scrolled-state');
        }
    };

    function switchStart() {
        if (!isMenuOpen) {
            navBar.removeClass('navbar--scrolled-state');
            navBar.addClass('navbar--initial-state');
        }
    }

    function checkState() {
        if ($(window).scrollTop() > 100) {
                switchInto();
        } else {
                switchStart();
        }
    }

    setInterval(() => {
        if (isScrolling) {
            isScrolling = false;
            checkState();
        }
    }, 100);
})

