const product1=document.querySelector("#product1")
const product2=document.querySelector("#product2")
const product3=document.querySelector("#product3")
const product4=document.querySelector("#product4")
const product5=document.querySelector("#product5")
const product6=document.querySelector("#product6")
const product7=document.querySelector("#product7")
const product8=document.querySelector("#product8")
const product9=document.querySelector("#product9")
const addToCartButton=document.querySelectorAll(".product-box")
// addToCartButton.forEach((button,index) => {
//     button.addEventListener('click',addToCartFunction)
//     console.log(index)
// });
function addToCartClicked(productnth){
    addToCartButton[productnth].addEventListener('click',addToCartFunction)
    localStorage.setItem("indexProductValue",productnth)
}
var i
var cartIndexes=""
if(localStorage.getItem("indexArray")!=null){
    cartIndexes=localStorage.getItem("indexArray")
}
//console.log(cartIndexes)
function addToCartFunction(e){
    cartIndexes+=localStorage.getItem("indexProductValue")
    localStorage.setItem("indexArray",cartIndexes)
    i=localStorage.getItem("indexProductValue")
    console.log(cartIndexes)
    let value = localStorage.getItem("indexProductValue")
    localStorage.setItem(`productImage${i}`,addToCartButton[value].children[0].getAttribute('src'))
    localStorage.setItem(`productDeclaration${i}`,addToCartButton[value].children[1].children[0].children[0].textContent)
    localStorage.setItem(`productPrice${i}`,addToCartButton[value].children[1].children[0].children[1].textContent)
    e.preventDefault()
}