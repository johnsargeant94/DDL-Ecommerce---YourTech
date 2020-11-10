function addToBasket (event) {
    console.log(event.target.dataset.id);
    // let productID = event.target.dataset.id;

} 

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


// let carts = document.querySelectorAll('#basketBTN');

// for (let i=0; i < carts.length; i++){
//     carts[i].addEventListener('click', () => {
//         cartNumbers(productID[i]);

//     })
// }


// // let products = [

// function onLoadCartNumbers() {
//     let productNumbers = localStorage.getItem('cartNumbers');

//     if(productNumbers) {
//         document.querySelector('basketNum').textContent = productNumbers;
//     }
// }



// onLoadCartNumbers()