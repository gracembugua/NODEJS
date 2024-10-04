const addedDataJSON = ['http://localhost:3000/addedDataJSON'];

async function addProducts(apiEndpoint) {
    try {
        const response = await fetch(apiEndpoint);
        const data = await response.json(); 

        addedDataJSON.length = 0;

        data.forEach(product => {
            addedDataJSON.push({
                id: product.id,
                imageUrl: product.imageUrl,
                title: product.title,
                price: product.price,
                date: product.date,
                location: product.location,
                company: product.company
            });
        });

        displayProducts();

    } catch (error) {
        console.error("Error fetching products:", error);
    }
}

function displayProducts() {
    const container = document.getElementById('product-list');
    container.innerHTML = ''; 

    addedDataJSON.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>Price: $${product.price}</p>
            <p>Date: ${product.date}</p>
            <p>Location: ${product.location}</p>
            <p>Company: ${product.company}</p>
            <button onclick="addToCart({id: ${product.id}, title: '${product.title}', price: ${product.price}, imageUrl: '${product.imageUrl}'})">Add to Cart</button>
            <button onclick="editProduct('${product.id}')">Edit</button>
            <button onclick="deleteProduct('${product.id}')">Delete</button>
        `;

        container.appendChild(productCard);
    });
}

let cart = [];

function addToCart(product) {
    const existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1; 
        cart.push(product); 
    }

    updateCartUI();
}

function deleteProductFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    updateCartUI();
}

function updateCartUI() {
    const cartContainer = document.getElementById('cart-items');
    cartContainer.innerHTML = ''; 

    cart.forEach(item => {
        const cartItem = document.createElement('div');
        cartItem.classList.add('cart-item');
        cartItem.innerHTML = `
            <p>${item.title} (x${item.quantity}) - $${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="increaseProductQuantity(${item.id})">+</button>
            <button onclick="reduceProductQuantity(${item.id})">-</button>
            <button onclick="deleteProductFromCart(${item.id})">Remove</button>
        `;
        cartContainer.appendChild(cartItem);
    });

    const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);
    document.getElementById('cart-total').innerText = `Total: $${cartTotal.toFixed(2)}`;
}

function increaseProductQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product) {
        product.quantity += 1; 
    }
    updateCartUI();
}

function reduceProductQuantity(productId) {
    const product = cart.find(item => item.id === productId);
    if (product && product.quantity > 1) {
        product.quantity -= 1; 
    } else if (product && product.quantity === 1) {
        deleteProductFromCart(productId);
    }
    updateCartUI();
}

async function deleteProduct(productId) {
    // Find the product index and remove it from the array
    const productIndex = addedDataJSON.findIndex(product => product.id === productId);
    if (productIndex !== -1) {
        addedDataJSON.splice(productIndex, 1);
    }

    // Refresh the products display
    displayProducts();
}

async function editProduct(productId) {
    // Find the product to edit
    const product = addedDataJSON.find(item => item.id === productId);
    if (!product) return;

    // Prompt for new details
    const newTitle = prompt("Edit Title:", product.title);
    const newPrice = parseFloat(prompt("Edit Price:", product.price));
    const newDate = prompt("Edit Date:", product.date);
    const newLocation = prompt("Edit Location:", product.location);
    const newCompany = prompt("Edit Company:", product.company);
    const newImageUrl = prompt("Edit Image URL:", product.imageUrl);

    // Update the product details
    product.title = newTitle || product.title;  // Fallback to original if empty
    product.price = !isNaN(newPrice) ? newPrice : product.price;  // Fallback to original if invalid
    product.date = newDate || product.date;
    product.location = newLocation || product.location;
    product.company = newCompany || product.company;
    product.imageUrl = newImageUrl || product.imageUrl;

    // Refresh the products display
    displayProducts();
}

// Initialize product loading
const apiEndpoint = 'http://localhost:3000/addedDataJSON';
addProducts(apiEndpoint);
