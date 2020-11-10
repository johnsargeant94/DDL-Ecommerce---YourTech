const productModel = require("../models/productModel");

function deleteProduct (event) {
    console.log(event.target.dataset.id);
    let productID = event.target.dataset.id;
    product.deleteOne({ _id: productID  }).then(function(){ 
        console.log("Data deleted"); // Success 
    }).catch(function(error){ 
        console.log(error); // Failure 
    }); 

} 


function editProduct (event) {
    console.log(event.target.dataset.id);
    // let productID = event.target.dataset.id;

} 