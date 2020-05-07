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
