/* ============================================
   PRIME SHOP
   WhatsApp: 08063682721
   International format: 2348063682721
============================================ */

const SHOP_WHATSAPP = "2348063682721";

let cart = [];


/* ============================================
   ADD TO CART
============================================ */

function addToCart(productName, productPrice) {

    cart.push({
        name: productName,
        price: Number(productPrice)
    });

    updateCart();
    openCart();
}


/* ============================================
   UPDATE CART
============================================ */

function updateCart() {

    const cartCount =
        document.getElementById("cartCount");

    const cartList =
        document.getElementById("cartList");

    const cartTotal =
        document.getElementById("cartTotal");


    cartCount.textContent = cart.length;


    if (cart.length === 0) {

        cartList.innerHTML = `
            <div class="empty-cart">
                Your cart is empty.
            </div>
        `;

        cartTotal.textContent = "0";

        return;
    }


    let total = 0;

    cartList.innerHTML = "";


    cart.forEach((item, index) => {

        total += item.price;


        const cartItem =
            document.createElement("div");

        cartItem.className = "cart-item";


        cartItem.innerHTML = `

            <div class="cart-item-info">

                <strong>
                    ${escapeHTML(item.name)}
                </strong>

                <span>
                    ₦${item.price.toLocaleString()}
                </span>

            </div>

            <button
                class="remove"
                onclick="removeFromCart(${index})">

                Remove

            </button>

        `;


        cartList.appendChild(cartItem);

    });


    cartTotal.textContent =
        total.toLocaleString();
}


/* ============================================
   REMOVE ITEM
============================================ */

function removeFromCart(index) {

    cart.splice(index, 1);

    updateCart();
}


/* ============================================
   OPEN CART
============================================ */

function openCart() {

    const overlay =
        document.getElementById("cartOverlay");

    overlay.style.display = "flex";

    updateCart();
}


/* ============================================
   CLOSE CART
============================================ */

function closeCart() {

    document.getElementById("cartOverlay")
        .style.display = "none";
}


/* ============================================
   SEND ORDER TO WHATSAPP
============================================ */

function sendWhatsAppOrder() {

    if (cart.length === 0) {

        alert("Your cart is empty.");

        return;
    }


    const name =
        document
            .getElementById("customerName")
            .value
            .trim();

    const uid =
        document
            .getElementById("customerUID")
            .value
            .trim();

    const phone =
        document
            .getElementById("customerPhone")
            .value
            .trim();


    if (!name) {

        alert("Please enter your name.");

        return;
    }


    if (!uid) {

        alert("Please enter your Free Fire UID.");

        return;
    }


    if (!phone) {

        alert("Please enter your phone number.");

        return;
    }


    let total = 0;

    let orderItems = "";


    cart.forEach((item, index) => {

        total += item.price;

        orderItems +=
            `${index + 1}. ${item.name} - ₦${item.price.toLocaleString()}\n`;

    });


    const message =

`🔥 PRIME SHOP — NEW ORDER

━━━━━━━━━━━━━━━━━━

👤 CUSTOMER

Name: ${name}
Phone: ${phone}
Free Fire UID: ${uid}

━━━━━━━━━━━━━━━━━━

🛒 ORDER

${orderItems}
━━━━━━━━━━━━━━━━━━

💰 TOTAL: ₦${total.toLocaleString()}

Please confirm my order.

Thank you for shopping with PRIME SHOP!`;


    const whatsappURL =
        "https://wa.me/" +
        SHOP_WHATSAPP +
        "?text=" +
        encodeURIComponent(message);


    window.location.href = whatsappURL;
}


/* ============================================
   ACCOUNT SEARCH + PRICE FILTER
============================================ */

function filterAccounts() {

    const search =
        document
            .getElementById("searchInput")
            .value
            .toLowerCase()
            .trim();


    const filter =
        document
            .getElementById("priceFilter")
            .value;


    const accounts =
        document.querySelectorAll(".account-card");


    accounts.forEach(account => {

        const name =
            account.dataset.name.toLowerCase();

        const price =
            Number(account.dataset.price);


        const matchesSearch =
            name.includes(search);


        let matchesPrice = true;


        if (filter === "under20") {

            matchesPrice = price < 20000;

        }

        else if (filter === "20to50") {

            matchesPrice =
                price >= 20000 &&
                price <= 50000;

        }

        else if (filter === "over50") {

            matchesPrice =
                price > 50000;
        }


        if (matchesSearch && matchesPrice) {

            account.style.display = "";

        } else {

            account.style.display = "none";

        }

    });
}


/* ============================================
   BASIC HTML ESCAPING
============================================ */

function escapeHTML(text) {

    const div =
        document.createElement("div");

    div.textContent = text;

    return div.innerHTML;
}


/* ============================================
   CLOSE CART WHEN CLICKING OUTSIDE
============================================ */

document
    .getElementById("cartOverlay")
    .addEventListener("click", function(event) {

        if (event.target === this) {

            closeCart();
        }

    });


/* ============================================
   START
============================================ */

updateCart();