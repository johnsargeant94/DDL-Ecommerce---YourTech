let carts = document.querySelectorAll('#basketBTN');



for (let i=0; i < carts.length; i++){
    carts[i].addEventListener('click', () => {
        cartNumbers();

    })
}

function onLoadCartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    if(productNumbers) {
        document.querySelector('basketNum').textContent = productNumbers;
    }
}

function cartNumbers() {
    let productNumbers = localStorage.getItem('cartNumbers');

    productNumbers = parseInt(productNumbers);

    if (productNumbers) {
        localStorage.setItem('cartNumbers' , productNumbers + 1);
        document.querySelector('basketNum').textContent = productNumbers + 1;
    } else {
        localStorage.setItem('cartNumbers' , 1);
        document.querySelector('basketNum').textContent = 1;
    }

}

onLoadCartNumbers()