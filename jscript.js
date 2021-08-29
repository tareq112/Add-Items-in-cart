let products = [{
    name: 'Blue T Shirt',
    tag: 'Blue',
    price: 15,
    inCart: 0
},
{
    name: 'Black T Shirt',
    tag: 'Navy',
    price: 20,
    inCart: 0
},
{
    name: 'Purple T Shirt',
    tag: 'Purple',
    price: 10,
    inCart: 0
},
{
    name: 'White T Shirt',
    tag: 'White',
    price: 25,
    inCart: 0
}
]

const carts = document.querySelectorAll('.add-cart');

for (let i = 0; i < carts.length; i++) {
carts[i].addEventListener('click', () => {
    cartNumber(products[i]);
    totalCost(products[i]);
})
}



//carts.forEach( cart => cart.addEventListener('click', (i) => 
//cartNumber(products[i])));

function onLoad() {
let productNumbers = localStorage.getItem('cartNumber');
productNumbers = parseInt(productNumbers);

if (productNumbers) {
    document.querySelector('.cart span').textContent = productNumbers;
}

}

function cartNumber(product) {

let productNumbers = localStorage.getItem('cartNumber');
productNumbers = parseInt(productNumbers);


if (productNumbers) {
    localStorage.setItem('cartNumber', productNumbers + 1);
    document.querySelector('.cart span').textContent = productNumbers + 1;
} else {
    localStorage.setItem('cartNumber', 1);
    document.querySelector('.cart span').textContent = 1;
}

setItems(product);

}

function setItems(product) {

let cartItems = localStorage.getItem('product inCart');
cartItems = JSON.parse(cartItems);
if (cartItems != null) {
    if (cartItems[product.tag] == undefined) {
        cartItems = {
            ...cartItems,
            [product.tag]: product
        }
    }
    cartItems[product.tag].inCart += 1;
} else {
    product.inCart = 1;
    cartItems = {
        [product.tag]: product
    }
}



localStorage.setItem("product inCart", JSON.stringify(cartItems));
}

function totalCost(product) {
let cartCost = localStorage.getItem('totalCost');
if (cartCost != null) {
    cartCost = parseInt(cartCost);
    localStorage.setItem('totalCost', cartCost + product.price);
} else {
    localStorage.setItem('totalCost', product.price)
}
}

function dispalyCart() {
let cartItems = localStorage.getItem("product inCart");
cartItems = JSON.parse(cartItems);

let productContainer = document.querySelector(".products");

let cartCost = localStorage.getItem('totalCost'); 

if (cartItems && productContainer) {
    productContainer.innerHTML = " ";
    Object.values(cartItems).map(item => {
        productContainer.innerHTML += `
         <div class="product">
            <ion-icon name="close-circle"></ion-icon>
            <img src="./img/${item.tag}.jpg">
            <span>${item.name}</span>
        </div>
        <div class="price">${item.price}</div>
        <div class=" quantity">
               <ion-icon name="caret-back-outline"></ion-icon>
               <span>${item.inCart}</span>
               <ion-icon name="caret-forward-outline"></ion-icon>
        </div>
        <div class="total">
        $${item.inCart * item.price},00
        </div>`;
    });
    productContainer.innerHTML += `
    <div class="basketTotalContainer">
     <h4 class="basketTotalTitle">Basket Total : </h4>
     <h4 class="basketTotal">  $${cartCost},00</h4>
     `
}

}

onLoad();
dispalyCart();