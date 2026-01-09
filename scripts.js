const products = [
    { id: 1, category: "eletronicos", title: "Smartphone Samsung Galaxy A54", price: 1899.99, discount: 15, image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=400" },
    { id: 2, category: "eletronicos", title: "Notebook Lenovo IdeaPad", price: 2999.90, discount: 20, image: "https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?w=400" },
    { id: 3, category: "casa", title: "Smart TV LG 50 4K", price: 2299.00, discount: 10, image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400" },
    { id: 4, category: "calcados", title: "Tênis Nike Air Max", price: 399.99, discount: 25, image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400" },
    { id: 10, category: "cameras", title: "Câmera Canon EOS Rebel", price: 2699.00, discount: 8, image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400" }
];

let cart = [];

function formatPrice(price) {
    return price.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
}

function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    cart.push(product);
    document.getElementById('cartCount').innerText = cart.length;
    alert(`${product.title} adicionado ao carrinho!`);
}

function createProductCard(product) {
    return `
        <div class="product-card">
            <img src="${product.image}" alt="${product.title}" class="product-image">
            
            <div class="product-info">
                <div class="product-price">${formatPrice(product.price)}</div>
                <p style="color: #00a650; font-size: 14px; font-weight: bold;">${product.discount}% OFF</p>
                <h3 class="product-title">${product.title}</h3>
            </div>

            <button class="add-to-cart-btn" onclick="addToCart(${product.id})">
                Adicionar ao carrinho
            </button>
        </div>
    `;
}

function renderProduct(productsList) {
    const grid = document.getElementById('productsGrid');
    grid.innerHTML = productsList.map(createProductCard).join('');
}

// Lógica de Filtro
const filterButtons = document.querySelectorAll('.filter-btn');
filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        // Mudar aparência do botão ativo
        filterButtons.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        const category = btn.getAttribute('data-category');
        const filtered = category === 'all' 
            ? products 
            : products.filter(p => p.category === category);
        
        renderProduct(filtered);
    });
});

// Busca em tempo real
document.getElementById('searchInput').addEventListener('input', (e) => {
    const term = e.target.value.toLowerCase();
    const filtered = products.filter(p => p.title.toLowerCase().includes(term));
    renderProduct(filtered);
});

document.addEventListener('DOMContentLoaded', () => renderProduct(products));