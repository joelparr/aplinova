const productsLink = document.getElementsByClassName('navbar__item--products')[0];
const productsDropdown = document.getElementsByClassName('navbar__products-dropdown')[0];
let dropdownActive = false
const productsLinkMobile = document.getElementsByClassName('navbar__item--products-mobile')[0];
const productsDropdownMobile = document.getElementsByClassName('navbar__products-dropdown-mobile')[0];
let dropdownActiveMobile = false

if (productsLink) {
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
}

if (productsLinkMobile) {
    productsLinkMobile.addEventListener('click', () => {
        if (!dropdownActiveMobile) {
            productsDropdownMobile.classList.add('navbar__products-dropdown-mobile--active')
            productsLinkMobile.classList.add('navbar__item--products-mobile--active')
        } else {
            productsDropdownMobile.classList.remove('navbar__products-dropdown-mobile--active')
            productsLinkMobile.classList.remove('navbar__item--products-mobile--active')
        }
        dropdownActiveMobile = !dropdownActiveMobile
    })
}

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

const langSelector = document.getElementById('langSelector');
const langPt = document.getElementById('langPt');
const langEn = document.getElementById('langEn');
const langEs = document.getElementById('langEs');

langSelector.addEventListener('click', (e) => {
    langSelector.classList.toggle('navbar__lang-selector--active')
});

langPt.addEventListener('click', (e) => {
    let url = '/lang/pt';
    const options = {
        method: 'GET',
        headers: {"Content-type":"application/json"}
    };

    fetch(url, options)
        .then(data => data.json())
        .then(_ => window.location.reload());
})

langEs.addEventListener('click', (e) => {
    let url = '/lang/es';
    const options = {
        method: 'GET',
        headers: {"Content-type":"application/json"}
    };

    fetch(url, options)
        .then(data => data.json())
        .then(_ => window.location.reload());
})

langEn.addEventListener('click', (e) => {
    let url = '/lang/en';
    const options = {
        method: 'GET',
        headers: {"Content-type":"application/json"}
    };

    fetch(url, options)
        .then(data => data.json())
        .then(_ => window.location.reload());
})


const langPtMobile = document.getElementById('langPtMobile');
const langEnMobile = document.getElementById('langEnMobile');
const langEsMobile = document.getElementById('langEsMobile');

langPtMobile.addEventListener('click', (e) => {
    let url = '/lang/pt';
    const options = {
        method: 'GET',
        headers: {"Content-type":"application/json"}
    };

    fetch(url, options)
        .then(data => data.json())
        .then(_ => window.location.reload());
})

langEsMobile.addEventListener('click', (e) => {
    let url = '/lang/es';
    const options = {
        method: 'GET',
        headers: {"Content-type":"application/json"}
    };

    fetch(url, options)
        .then(data => data.json())
        .then(_ => window.location.reload());
})

langEnMobile.addEventListener('click', (e) => {
    let url = '/lang/en';
    const options = {
        method: 'GET',
        headers: {"Content-type":"application/json"}
    };

    fetch(url, options)
        .then(data => data.json())
        .then(_ => window.location.reload());
})
