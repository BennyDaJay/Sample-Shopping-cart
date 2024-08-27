// Product data
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

// Cart to hold products
const cart = [];

// Display products
document.getElementById('root').innerHTML = product.map((item, index) => {
    const { image, name, price } = item;
    return (
        `<div class='box'> 
            <div class='img-box'>
                <img class='images' src=${image}></img>
            </div>    
            <div class='bottom'>
                <p>${name}</p>
                <h2>$ ${price}.00</h2>` +
        `<button onclick='addProductToCart(${item.id})'>Add to Cart</button>` +
        `</div>
        </div>`
    );
}).join('');

// Add product to cart or increase quantity if already in cart
function addProductToCart(productId) {
    const productInCart = cart.find(item => item.id === productId);
    if (productInCart) {
        increaseQuantity(productId);
    } else {
        const productToAdd = product.find(item => item.id === productId);
        if (productToAdd) {
            cart.push({ ...productToAdd });
        }
    }
    displayCart();
}

// Increase quantity of a product in the cart
function increaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity++;
    }
    displayCart();
}

function decreaseQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        if (product.quantity > 1) {
            product.quantity--;
        } else {
            removeProductFromCart(productId);
        }
    }
    displayCart();
}

function removeProductFromCart(productId) {
    const index = cart.findIndex(item => item.id === productId);
    if (index > -1) {
        cart.splice(index, 1);
    }
    displayCart();
}


function cartTotal() {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0);
}

// Handle payment
function pay(amount) {
    const total = cartTotal();
    const balance = amount - total;
    return balance;
}

// Display cart contents
function displayCart() {
    let cartItemsHtml = '';
    let total = 0;
    document.getElementById('count').innerHTML = cart.length;

    if (cart.length === 0) {
        document.getElementById('cartItem').innerHTML = 'Your cart is empty';
        document.getElementById('total').innerHTML = '$0.00';
    } else {
        cart.forEach((item) => {
            const { image, name, price, quantity } = item;
            cartItemsHtml += `
                <div class='cart-item'>
                    <div class='myrow-img'>
                        <img class='rowww' src=${image}>
                    </div>
                    <p style='font-size:12px;'>${name} (${quantity})</p>
                    <h2 style='font-size:15px;'>$${price}.00</h2>
                    <button class='quantity-button increase' onclick='increaseQuantity(${item.id})'>+</button>
                    <button class='quantity-button decrease' onclick='decreaseQuantity(${item.id})'>-</button>
                    <i class='fa-solid fa-trash' onclick='removeProductFromCart(${item.id})'></i>
                </div>`;
            total += item.price * item.quantity;
        });

        document.getElementById('cartItem').innerHTML = cartItemsHtml;
        document.getElementById('total').innerHTML = `$${total}.00`;
        document.getElementById('clear-cart').style.display = 'block';
    }
}

// To Clear the cart
function clearCart() {
    cart.length = 0;
    displayCart();
}

document.getElementById('clear-cart').addEventListener('click', clearCart);
document.getElementById('clear-cart').style.display = 'none';