class Beer {
    constructor(id, name, price) {
        this.id = id;
        this.name = name;
        this.price = price;
    }
}
const beers = [
    new Beer(1,"Molson Canadian",5),
    new Beer(2,"Labatt Blue",8),
    new Beer(3,"Moosehead Lager",10)
]

const cart = [0, 0, 0];

var src = document.getElementById("productList");
for (let i = 0; i < beers.length; i++) {
    document.write("<br><br>");
    src.innerHTML += beers[i].name
    document.write("<br>");
    src.innerHTML += "$"+beers[i].price
    document.write("<br>");
    //add images
    var img = document.createElement("img");
    img.src = "./public/beer"+(i+1)+".png"
    src.appendChild(img);
    document.write("<br>");

    // add minus Button
    var minusButton = document.createElement('BUTTON');
    var minusText = document.createTextNode("-");
    minusButton.appendChild(minusText);
    minusButton.className="minButtons"
    src.appendChild(minusButton);
     
    // add quantity span
    var quantitySpan = document.createElement('span')
    quantitySpan.innerHTML = cart[i];
    quantitySpan.className="quantitySpans"
    src.appendChild(quantitySpan); 

    // add plusButton
    var plusButton = document.createElement('BUTTON');
    var plusText = document.createTextNode("+");
    plusButton.appendChild(plusText);
    plusButton.className="plusButtons"
    src.appendChild(plusButton); 

}

document.write("<br><br>");
// add total span
var totalSpan = document.createElement('span')
totalSpan.innerHTML = "Your Shopping List: ";
totalSpan.className="checkoutSpan"
src.appendChild(totalSpan); 
document.write("<br>");

var ul = document.createElement('ul');
ul.setAttribute('id','shopList');
ul.className="checkoutList"
src.appendChild(ul);
renderShopList(cart);

function renderShopList(carts) {
    while (ul.hasChildNodes()) {
        ul.removeChild(ul.firstChild);
    }
    let totalPrice=0;
    for (let i = 0; i < carts.length; i++) {
        if (carts[i]>0){
            var li = document.createElement('li');
            li.setAttribute('class','item');
            ul.appendChild(li);
            var beerInfo=beers[i].name+"($"+beers[i].price+")";
            li.innerHTML += beerInfo.padEnd(90,".")+" X "+carts[i];
            totalPrice+=beers[i].price*carts[i];
        }
        document.getElementsByClassName("quantitySpans")[i].innerHTML = cart[i];
    }
    if (totalPrice>0){
        var li = document.createElement('li');
        li.setAttribute('class','item');
        ul.appendChild(li);
        li.innerHTML += "TOTAL: ".padEnd(90,".")+" $"+totalPrice;
    }
}

// add checkout Button
var checkoutButton = document.createElement('BUTTON');
var checkoutText = document.createTextNode("Checkout");
checkoutButton.appendChild(checkoutText);
checkoutButton.className="checkoutButton"
src.appendChild(checkoutButton); 

// add clear Button
var clearButton = document.createElement('BUTTON');
var clearText = document.createTextNode("Clear");
clearButton.appendChild(clearText);
clearButton.className="clearButton"
src.appendChild(clearButton); 

// event listener for minues and plus button
for (let i = 0; i < beers.length; i++) {
    document.getElementsByClassName("minButtons")[i].addEventListener("click", remCart);
    function remCart() {
        if (cart[i]>0){
            cart[i]--;
        }
        //console.log("---"+cart[i]);
        document.getElementsByClassName("quantitySpans")[i].innerHTML = cart[i];
        renderShopList(cart);
    }

    document.getElementsByClassName("plusButtons")[i].addEventListener("click", addCart);
    function addCart() {
        cart[i]++;
        //console.log("---"+cart[i]);
        document.getElementsByClassName("quantitySpans")[i].innerHTML = cart[i];
        renderShopList(cart);
    }
}


// event listener for checkout button
document.getElementsByClassName("checkoutButton")[0].addEventListener("click", checkout);
function checkout() {
    let totalPrice=0;
    for (let i = 0; i < cart.length; i++) {
        if (cart[i]>0){
            totalPrice+=beers[i].price*cart[i];
        }
    }
    if (totalPrice<=0){
        window.confirm("You have not buy anything.");
    } else if (totalPrice<=100){
        window.confirm("Please enjoy your drinks!");
    }else{
        window.alert("That is a lot of alcohol! Enjoy but do not over-consume.");
    }
    clear()
    // for (let i = 0; i < cart.length; i++) {
    //     cart[i]=0;
    // }
    // renderShopList(cart);
}

// event listener for clear button
document.getElementsByClassName("clearButton")[0].addEventListener("click", clear);
function clear() {
    for (let i = 0; i < cart.length; i++) {
        cart[i]=0;
    }
    renderShopList(cart);
}
