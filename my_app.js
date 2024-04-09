
// Функція для завантаження JSON файлу
function loadJSON(callback) {
    var xobj = new XMLHttpRequest();
    xobj.overrideMimeType("application/json");
    xobj.open('GET', 'products.json', true);
    xobj.onreadystatechange = function () {
        if (xobj.readyState == 4 && xobj.status == 200) {
            callback(xobj.responseText);
        }
    };
    xobj.send(null);
}

// Функція для відображення продуктів на сторінці
function displayProducts(jsonData) {
    var products = JSON.parse(jsonData).items;
    var productsDiv = document.getElementById('products');

    products.forEach(function (product) {
        var title = product.fields.title;
        var price = product.fields.price;
        var imageUrl = product.fields.image.fields.file.url;

        var productHTML = `
                    <div class="products">
                        <div class="img-container">
                            <img class="product-img" src="${imageUrl}" alt="${title}" />
                            <button class="bag-btn">ADD TO BAG</button>
                        </div>    
                        <h3>${title}</h3>
                        <h4>$${price}</h4>
                    </div>
                `;

        productsDiv.innerHTML += productHTML;
    });
}

// Завантаження JSON файлу та відображення його на сторінці
loadJSON(function (response) {
    displayProducts(response);
});
























// Отримання всіх кнопок "Додати в кошик"
var addToCartButtons = document.querySelectorAll('.bag-btn');
// Отримання контенту кошика
var cartContent = document.querySelector('.cart-content');
// Отримання загальної суми у кошику
var cartTotal = document.querySelector('.cart-total');

// Перевірка, чи кошик вже створений у localStorage, якщо ні - створити пустий
var cart = JSON.parse(localStorage.getItem('cart')) || [];

// Функція для оновлення вмісту кошика на сторінці
function updateCart() {
    cartContent.innerHTML = '';
    cart.forEach(function (item) {
        var newItem = document.createElement('div');
        newItem.textContent = item.name + ' - $' + item.price + ' x ' + item.quantity;
        cartContent.appendChild(newItem);
    });

    // Оновлення загальної суми
    var total = cart.reduce(function (acc, curr) {
        return acc + curr.price * curr.quantity;
    }, 0);
    cartTotal.textContent = total.toFixed(2);

    // Оновлення localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Функція для додавання товару в кошик
function addToCart(id) {
    var existingItem = cart.find(function (item) {
        return item.id === id;
    });

    if (existingItem) {
        existingItem.quantity++;
    } else {
        var product = {
            id: id,
            name: 'Product ' + id,
            price: id * 10 + 10, // У цьому прикладі ціна залежить від індексу кнопки
            quantity: 1
        };
        cart.push(product);
    }

    updateCart();
}

// Обробник натискання на кнопку "Додати в кошик"
addToCartButtons.forEach(function (button) {
    button.addEventListener('click', function () {
        var id = parseInt(button.getAttribute('data-id'));
        addToCart(id);
    });
});

// Вивід кошика при завантаженні сторінки
window.addEventListener('DOMContentLoaded', function () {
    updateCart();
});













var cartOverlay = document.querySelector('.cart-overlay');
var cartBtn = document.querySelector('.cart-btn');
var closeCartBtn = document.querySelector('.close-cart');

// Функція для відкриття кошика
function openCart() {
    cartOverlay.classList.add('show');
}

// Функція для закриття кошика
function closeCart() {
    cartOverlay.classList.remove('show');
}

// Обробник натискання на кнопку кошика
cartBtn.addEventListener('click', openCart);

// Обробник натискання на кнопку закриття кошика
closeCartBtn.addEventListener('click', closeCart);