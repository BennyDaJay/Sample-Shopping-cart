const product = [
    {
        id: 0,
        image: 'images/ice1.png',
        name: 'Global Snacks',
        price: 230,
        quantity: 1
    },
    {
        id: 1,
        image: 'images/ice2.png',
        name: 'After Meal Snacks',
        price: 700,
        quantity: 1
    },
    {
        id: 2,
        image: 'images/ice3.png',
        name: 'Africa Best',
        price: 390,
        quantity: 1
    },
    {
        id: 3,
        image: 'images/ice4.png',
        name: 'Asian Snacks',
        price: 300,
        quantity: 1
    }
];

const mycategories = [...new Set(product.map((item) => { return item }))];

let i = 0;
document.getElementById('root').innerHTML = mycategories.map((item) => {
    var { image, name, price } = item;
    return (
        `<div class='box'> 
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>    
            <div class='bottom'>
                <p>${name}</p>
                <h2>$ ${price}.00</h2>` +
        `<button onclick='addtocart(${i++})'>Add to Cart</button>` +
        `</div>
        </div>`
    );
}).join('');

var cart = [];

function addtocart(a) {
    const itemInCart = cart.find(item => item.id === mycategories[a].id);
    if (itemInCart) {
        itemInCart.quantity += 1;
    } else {
        cart.push({ ...mycategories[a], quantity: 1 });
    }
    displaymycart();
}

function displaymycart() {
    let j = 0, total = 0;
    document.getElementById('count').innerHTML = cart.length;
    
    if (cart.length == 0) {
        document.getElementById('cartItem').innerHTML = 'Your cart is empty';
        document.getElementById('total').innerHTML = '$ 0.00';
        document.getElementById('clear-cart').style.display = 'none'; // Hide Clear Cart button
    } else {
        document.getElementById('clear-cart').style.display = 'block'; // Show Clear Cart button
        
        document.getElementById('cartItem').innerHTML = cart.map((items) => {
            var { image, name, price, quantity } = items;
            total += price * quantity;
            document.getElementById('total').innerHTML = "$ " + total + ".00";
            return (
                `<div class='cart-item'>
                    <div class='row-img'>
                        <img class='rowing' src=${image}>
                    </div>
                    <p style='font-size:12px;'>${name} (x${quantity})</p>
                    <h2 style='font-size:15px;'>$ ${price * quantity}.00</h2>` +
                `<i class='fa-solid fa-trash' onclick='delElement(${j++})'></i></div>`
            );
        }).join('');
    }
}

function delElement(index) {
    cart.splice(index, 1);
    displaymycart();
}

function clearCart() {
    cart = [];
    displaymycart();
}
