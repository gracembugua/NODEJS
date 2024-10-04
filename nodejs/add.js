async function fetchProducts() {
    const response = await fetch('http://localhost:3000/addedDataJSON');
    const products = await response.json();
    displayProducts(products);
}

async function addProduct() {
    const title = document.getElementById('product-title').value;
    const price = document.getElementById('product-price').value;

    const response = await fetch('http://localhost:3000/addedDataJSON', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, price })
    });

    const newProduct = await response.json();
    fetchProducts(); // Refresh the product list
    document.getElementById('product-form').style.display = 'none'; // Hide the form
}

function showAddProductForm() {
    document.getElementById('product-form').style.display = 'block';
}

async function editProduct(productId) {
    const title = prompt('Enter new title:');
    const price = prompt('Enter new price:');
    await fetch(`http://localhost:3000/addedDataJSON${productId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, price })
    });
    fetchProducts(); // Refresh the product list
}

async function deleteProduct(productId) {
    await fetch(`http://localhost:3000/addedDataJSON${productId}`, {
        method: 'DELETE'
    });
    fetchProducts(); 
}

function displayProducts(products) {
    const container = document.getElementById('product-list');
    container.innerHTML = ''; 

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <button onclick="editProduct(${product.id})">Edit</button>
            <button onclick="deleteProduct(${product.id})">Delete</button>
        `;
        container.appendChild(productCard);
    });
}


fetchProducts();
