const IndexesStr = localStorage.getItem("indexArray");
let Indexes = IndexesStr.split('');

const content = document.querySelector(".cart-content");
const productImage = localStorage.getItem("productImage");
const cartProductDiv = document.querySelectorAll(".cart-container");

window.onload = function() {
    let IndexCalc = 0;
    for (let i = 0; i < Indexes.length; i++) {
        for (let j = i + 1; j < Indexes.length; j++) {
            if (Indexes[i] === Indexes[j]) {
                IndexCalc++;
                break;
            }
        }
    }
    const IndexLength = Indexes.length - IndexCalc;

    for (let i = 0; i < IndexLength; i++) {
        let cloneCartElement = cartProductDiv[0].cloneNode(true);
        content.appendChild(cloneCartElement);
    }
    console.log("a")
    cartProductDiv[0].remove();
    if(document.querySelector(".cart-container")==null){
        document.querySelector(".cart-empty").style.display="flex"
    }
    for (let i = 0; i < Indexes.length; i++) {
        let sameNumberCount = 1;
        let cartBox=document.querySelectorAll(".cart-container")
        for (let j = i + 1; j < Indexes.length; j++) {
            if (Indexes[i] === Indexes[j]) {
                sameNumberCount++;
                Indexes.splice(j, 1);
                j--;
                //console.log(Indexes);
            }
        }
        cartBox[i].children[0].children[0].setAttribute('src', `${localStorage.getItem(`productImage${Indexes[i]}`)}`);
        cartBox[i].children[0].children[1].children[0].children[0].textContent = localStorage.getItem(`productDeclaration${Indexes[i]}`);
        cartBox[i].children[0].children[1].children[1].children[0].children[1].textContent=sameNumberCount
    }
    productNumberFunction()
    const increaseButtons=document.querySelectorAll(".cart-increase-button")
    increaseButtons.forEach(button=>{
        button.addEventListener('click',()=>{
            let imageText = button.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute('src')
            for(let i=0;i<9;i++)
                if(imageText.includes(`cat${i+1}`))
                    localStorage.setItem("indexArray",localStorage.getItem("indexArray")+i)
            button.parentElement.children[1].textContent++
            productNumberFunction()
            totalPriceFunction()
        });
    });
    const decreaseButtons=document.querySelectorAll(".cart-decrease-button")
    decreaseButtons.forEach(button=>{
        button.addEventListener('click',()=>{
            let imageText = button.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute('src')
            for(let i=0;i<9;i++)
                if(imageText.includes(`cat${i+1}`))
                    for(let j=0;j<localStorage.getItem("indexArray").length;j++){
                        if(localStorage.getItem("indexArray")[j]==i){
                            if(button.parentElement.children[1].textContent!=1){
                            localStorage.setItem("indexArray",localStorage.getItem("indexArray").slice(0,j)+localStorage.getItem("indexArray").slice(j+1))
                            break
                            }
                        }
                    }
            if(button.parentElement.children[1].textContent>1){
                button.parentElement.children[1].textContent--
                productNumberFunction()
                totalPriceFunction()
            }
            else
                alert("you cant increase anymore")
        });
    });
    const deleteButtons=document.querySelectorAll(".cart-delete-button")
    deleteButtons.forEach(button=>{
        button.addEventListener('click',()=>{
            let imageText = button.parentElement.parentElement.parentElement.children[0].getAttribute('src')
            let result = confirm("Are you sure you delete product")
            if(result){
                for(let i=0;i<9;i++)
                    if(imageText.includes(`cat${i+1}`))
                        for(let j=0;j<localStorage.getItem("indexArray").length;j++){
                            if(localStorage.getItem("indexArray")[j]==i){
                                localStorage.setItem("indexArray",localStorage.getItem("indexArray").slice(0,j)+localStorage.getItem("indexArray").slice(j+1))
                                j--
                                button.parentElement.parentElement.parentElement.parentElement.remove()
                                totalPriceFunction()
                                if(document.querySelector(".cart-container")==null){
                                    document.querySelector(".cart-empty").style.display="flex"
                                    totalPriceFunction()
                                }
                            }
                        }
            }

        })
    })
    totalPriceFunction()
};
function productNumberFunction(){
    let cartPrice = document.querySelectorAll(".cart-price-box")
    let cartNumber = document.querySelectorAll(".product-number")
    for(let i=0;i<Indexes.length;i++){
        cartPrice[i].textContent=parseInt(localStorage.getItem(`productPrice${Indexes[i]}`))*parseInt(cartNumber[i].textContent)+" Coin"
    }
}
function totalPriceFunction(){
    let totalPrice=document.querySelector(".total-price")
    let CartPrice = document.querySelectorAll(".cart-price-box")
    let totalPriceClone=0
    for(let i=0;CartPrice[i]!=null;i++){
        totalPriceClone+=parseInt(CartPrice[i].textContent)
        //console.log(totalPriceClone)
    }
    totalPrice.textContent="Total: "+totalPriceClone+" Coin"
}
const orderButton=document.querySelector(".order-button")
orderButton.addEventListener('click',()=>{
    let cartBoxes=document.querySelectorAll(".cart-container")
    for(let i=0;cartBoxes[i]!=null;i++){
        cartBoxes[i].remove()
    }
    localStorage.setItem("indexArray","")
    document.querySelector(".total-price").textContent="Total: "+0+" Coin"
    alert("your order has been received")
})