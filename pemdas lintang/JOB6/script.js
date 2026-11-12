const products = [
    {
        name: "Vintage Graphic Tee",
        category: "Tops",
        price: 189000,
        image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600"
    },
    {
        name: "Oversized Hoodie",
        category: "Tops",
        price: 329000,
        image: "https://images.unsplash.com/photo-1556821840-3a63f95609a7?w=600"
    },
    {
        name: "Baggy Denim Jeans",
        category: "Bottoms",
        price: 399000,
        image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=600"
    },
    {
        name: "Retro Sneakers",
        category: "Shoes",
        price: 599000,
        image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=600"
    },
    {
        name: "Classic Cap",
        category: "Accessories",
        price: 149000,
        image: "https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600"
    },
    {
        name: "Minimalist Shirt",
        category: "Tops",
        price: 219000,
        image: "https://images.unsplash.com/photo-1603252109303-2751441dd157?w=600"
    },
    {
        name: "Streetwear Pants",
        category: "Bottoms",
        price: 289000,
        image: "https://images.unsplash.com/photo-1517438476312-10d79c077509?w=600"
    },
    {
        name: "Everyday Backpack",
        category: "Accessories",
        price: 259000,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600"
    }
];

let selectedCategory = "All";
let cart = [];

function formatPrice(price) {
    return "Rp" + price.toLocaleString("id-ID");
}

function renderProducts() {
    const search = document.getElementById("search").value.toLowerCase();

    const filtered = products.filter(p =>
        (selectedCategory === "All" || p.category === selectedCategory) &&
        p.name.toLowerCase().includes(search)
    );

    document.getElementById("products").innerHTML =
        filtered.length ? filtered.map(p => `
        <div class="card">
            <img src="${p.image}" alt="${p.name}">
            <div class="card-info">
                <span class="tag">${p.category.toUpperCase()}</span>
                <h3>${p.name}</h3>
                <div class="price">${formatPrice(p.price)}</div>
            </div>
            <button onclick="addToCart('${p.name}')">ADD TO BAG +</button>
        </div>
        `).join("") : "<p>Produk tidak ditemukan.</p>";
}

function filter(category, button) {
    selectedCategory = category;

    document.querySelectorAll(".categories button").forEach(b =>
        b.classList.remove("active")
    );

    button.classList.add("active");
    renderProducts();
}

function addToCart(name) {
    const product = products.find(p => p.name === name);
    const existing = cart.find(p => p.name === name);

    if (existing) {
        existing.qty++;
    } else {
        cart.push({...product, qty: 1});
    }

    updateCart();
}

function updateCart() {
    document.getElementById("count").innerText =
        cart.reduce((sum, p) => sum + p.qty, 0);

    document.getElementById("cartItems").innerHTML =
        cart.length ? cart.map((p, i) => `
        <div class="cart-item">
            <b>${p.name}</b><br>
            ${formatPrice(p.price)} × ${p.qty}
            <button onclick="removeItem(${i})"
            style="float:right;cursor:pointer">Remove</button>
        </div>
        `).join("") : "Your bag is empty.";

    const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

    document.getElementById("total").innerText =
        "Total: " + formatPrice(total);
}

function removeItem(index) {
    cart.splice(index, 1);
    updateCart();
}

function toggleCart() {
    document.getElementById("cartPanel").classList.toggle("open");
}

function checkout() {
    if (!cart.length) {
        alert("Keranjang masih kosong!");
        return;
    }

    let message = "Halo AFTERHOURS! Saya ingin memesan:\n\n";

    cart.forEach(p => {
        message += `${p.name} x${p.qty} - ${formatPrice(p.price * p.qty)}\n`;
    });

    const total = cart.reduce((sum, p) => sum + p.price * p.qty, 0);

    message += `\nTotal: ${formatPrice(total)}`;
    message += "\n\nMohon informasi cara pembayarannya.";

    const phone = "6281234567890";

    window.open(
        "https://wa.me/" + phone + "?text=" +
        encodeURIComponent(message),
        "_blank"
    );
}

renderProducts();