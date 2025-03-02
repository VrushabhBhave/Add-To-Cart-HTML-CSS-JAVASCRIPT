const form = document.querySelector("form");
const data = document.querySelector("#product-List");
const cartData = document.querySelector("#cartData");
const elements = Array.from(document.forms[0].elements);
elements.pop();
let productList = [];

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const product = {
        pid: productList.length,
        item: elements[0].value,
        price: elements[1].value,
        quantity: 0,
    }

    productList.push(product);
    // console.log(productList);

    //clear the form
    clearForm();

    //display productList value
    displayProduct();
    
})

function clearForm(){
    elements.forEach((element) => {
        element.value = "";
    });
    elements[0].focus();
}

function displayProduct(){
    data.innerHTML = "";
    const fregment = document.createDocumentFragment();
    productList.forEach((obj) => {
        const parent = document.createElement("div");
        const Pname = document.createElement("p");
        const Pprice = document.createElement("p");
        const buttons = document.createElement("div");
        const minus = document.createElement("span");
        const Pquantity = document.createElement("span");
        const plus = document.createElement("span");

        Pname.innerText = `${obj.item}`;
        Pprice.innerText = `${obj.price}`;
        minus.classList.add("fa-solid","fa-minus");
        Pquantity.innerText = `${obj.quantity}`;
        plus.classList.add("fa-solid", "fa-plus");

        parent.classList.add("parent");
        buttons.classList.add("buttons");

        //increment quantity value
        plus.addEventListener("click", () => modifyQuantity(obj.pid, "+"));
        // decrement quantity value 
        minus.addEventListener("click", () => modifyQuantity(obj.pid, "-"));

        buttons.append(minus, Pquantity, plus);
        parent.append(Pname, Pprice, buttons);
        fregment.append(parent);
    });
    data.append(fregment);
}

function modifyQuantity(idToModify, sign){
    if(sign === "+"){
        productList.map((existingData) => {
            if(existingData.pid == idToModify){
                existingData.quantity = Number(existingData.quantity) + 1;
                
            }
        });
    }else{
        productList.map((existingData) => {
            if(existingData.quantity > 0){
                if(existingData.pid == idToModify){
                    existingData.quantity = Number(existingData.quantity) - 1;
                }
            }
        });
    }
    displayProduct();
    updateCart();
};

function updateCart() {
    const cartFragment = document.createDocumentFragment();
    let totalAll = 0;
    productList.forEach((product) => {
        cartData.innerHTML = "";
        if (product.quantity > 0) {
            const parent = document.createElement("div");
            const name = document.createElement("p");
            const quantityPrice = document.createElement("p");
            const printQuantity = document.createElement("span");
            const mul = document.createElement("span");
            const printPrice = document.createElement("span");


            name.innerText = `${product.item}`;
            printQuantity.innerText = `${product.quantity}`;
            mul.classList.add("fa-solid", "fa-xmark");
            printPrice.innerText = `${product.price}`

            
            
            parent.classList.add("parent");
            quantityPrice.classList.add("quantityPrice");

            totalAll += product.quantity * product.price; 

            
            quantityPrice.append(printQuantity, mul, printPrice);
            parent.append(name, quantityPrice);
            cartFragment.append(parent);

        }
    });


    //update total
    const existingTotalContainer = document.querySelector(".totalContainer");
    if (existingTotalContainer) {
        existingTotalContainer.remove();
    }

    const totalContainer = document.createElement("div");
    const total = document.createElement("p");
    let totalSpan = document.createElement("span");

    
    total.innerText = "Total:";
    cartData.append(cartFragment);
    //console.log(productList);
    
    totalSpan.innerText = totalAll;
    const para = document.querySelector(".blank-para");
    if(totalAll == 0){
        para.innerText = "No Product added to the cart";
    }else{
        para.innerText = "";
    }

    totalContainer.append(total, totalSpan);
    totalContainer.classList.add("totalContainer","parent");

    cart.append(totalContainer);
    
}