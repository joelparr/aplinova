/**
 * Description: Logica do botão do banner
 */
var btn1 = document.getElementById('btn1');

btn1.addEventListener('mouseenter', function(event){
    btn1.textContent = "Mais";
})
btn1.addEventListener('mouseleave', function(event){
    btn1.textContent = "+";
})