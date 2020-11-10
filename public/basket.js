function addToBasket (event) {
    console.log(event.target.dataset.id);
} 

console.log("hello")

// let carts = document.querySelectorAll('#basketBTN');

// let products = [
//     {{#each products}}
//     {
        
//         name: {{ this.name }},
//         price: { { this.price } },
//         inStock: { { this.inStock } },
//         image: { { this.image } }
//     },
//     {{/each}}

// ]


// for (let i=0; i < carts.length; i++){
//     carts[i].addEventListener('click', () => {
//         cartNumbers(products[i]);

//     })
// }

// function onLoadCartNumbers() {
//     let productNumbers = localStorage.getItem('cartNumbers');

//     if(productNumbers) {
//         document.querySelector('basketNum').textContent = productNumbers;
//     }
// }

// function cartNumbers(product) {
//     console.log("the product clicked is", product);
//     let productNumbers = localStorage.getItem('cartNumbers');

//     productNumbers = parseInt(productNumbers);

//     if (productNumbers) {
//         localStorage.setItem('cartNumbers' , productNumbers + 1);
//         document.querySelector('basketNum').textContent = productNumbers + 1;
//     } else {
//         localStorage.setItem('cartNumbers' , 1);
//         document.querySelector('basketNum').textContent = 1;
//     }

// }

// onLoadCartNumbers()