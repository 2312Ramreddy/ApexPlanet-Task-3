// Update Cart Count
const cartCount = document.querySelector('.cart-count');
const addToCartButtons = document.querySelectorAll('.product-card button');
let cartItemCount = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartItemCount++;
        cartCount.textContent = cartItemCount;
        alert('Product added to cart!');
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const cartIcon = document.querySelector(".cart-icon");
    
    // Redirect to the cart page when cart icon is clicked
    cartIcon.addEventListener("click", () => {
        window.location.href = "cart.html"; // Ensure this matches your cart page filename
    });

    // Update cart count on page load
    updateCartCount();
});

// Function to update the cart count
function updateCartCount() {
    const cartCountElement = document.querySelector(".cart-count");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    cartCountElement.textContent = cart.length;
}
// Cart Page Logic
const cartItemsContainer = document.querySelector('.cart-items');
const totalItemsElement = document.getElementById('total-items');
const totalPriceElement = document.getElementById('total-price');

// Ensure cart elements exist (to avoid errors when not on cart page)
if (cartItemsContainer && totalItemsElement && totalPriceElement) {
    if (cart.length > 0) {
        cartItemsContainer.innerHTML = cart.map(item => `
            <div class="cart-item">
                <h3>${item.name}</h3>
                <p>Price: ₹${item.price}</p>
                <p>Quantity: ${item.quantity}</p>
            </div>
        `).join('');

        const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
        const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

        totalItemsElement.textContent = totalItems;
        totalPriceElement.textContent = totalPrice.toFixed(2);
    } else {
        cartItemsContainer.innerHTML = `<p>Your cart is currently empty.</p>`;
    }
}

document.addEventListener("DOMContentLoaded", () => {
    updateCartCount();
    displayCartItems();
    
    const cartIcon = document.querySelector(".cart-icon");
    cartIcon.addEventListener("click", () => {
        window.location.href = "cart.html"; // Redirect to cart page
    });
});

// Function to add a product to the cart
function addToCart(product) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    // Check if the product already exists in the cart
    let existingProduct = cart.find(item => item.id === product.id);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        product.quantity = 1;
        cart.push(product);
    }

    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Product added to cart!");
}

// Function to update cart count in the navbar
function updateCartCount() {
    const cartCountElement = document.querySelector(".cart-count");
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const totalQuantity = cart.reduce((sum, item) => sum + item.quantity, 0);
    cartCountElement.textContent = totalQuantity;
}

// Function to display cart items in the cart page
function displayCartItems() {
    const cartItemsContainer = document.querySelector(".cart-items");
    const totalItemsElement = document.getElementById("total-items");
    const totalPriceElement = document.getElementById("total-price");

    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = `<p>Your cart is currently empty.</p>`;
        totalItemsElement.textContent = "0";
        totalPriceElement.textContent = "0.00";
        return;
    }

    cartItemsContainer.innerHTML = cart.map((item, index) => `
        <div class="cart-item">
            <img src="${item.image}" alt="${item.name}" width="50">
            <h3>${item.name}</h3>
            <p>Price: ₹${item.price}</p>
            <p>Quantity: ${item.quantity}</p>
            <button class="remove-item" data-index="${index}">Remove</button>
        </div>
    `).join('');

    // Calculate totals
    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

    totalItemsElement.textContent = totalItems;
    totalPriceElement.textContent = totalPrice.toFixed(2);

    // Add event listeners for remove buttons
    document.querySelectorAll(".remove-item").forEach(button => {
        button.addEventListener("click", (event) => {
            const index = event.target.getAttribute("data-index");
            removeFromCart(index);
        });
    });
}

// Function to remove an item from the cart
function removeFromCart(index) {
    let cart = JSON.parse(localStorage.getItem("cart")) || [];
    cart.splice(index, 1);
    localStorage.setItem("cart", JSON.stringify(cart));

    updateCartCount();
    displayCartItems();
}

// Smooth Scrolling for Navigation Links
document.querySelectorAll('nav ul li a').forEach(anchor => {
    anchor.addEventListener('click', function (event) {
        event.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth' });
        }
    });
});

// Contact Form Validation
document.getElementById('contactForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        alert('Please fill out all fields.');
        return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    alert('Thank you for contacting us! We will get back to you soon.');
    this.reset();
});

// Initialize To-Do List
function initializeToDoList() {
    const addTaskButton = document.getElementById('addTaskButton');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim();
        if (!taskText) {
            alert("Please enter a task.");
            return;
        }

        const li = document.createElement('li');
        li.textContent = taskText;

        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = "Delete";
        deleteBtn.addEventListener('click', () => li.remove());

        li.appendChild(deleteBtn);
        taskList.appendChild(li);

        taskInput.value = ""; // Clear the input field
    }

    // Add event listener to the "Add Task" button
    addTaskButton.addEventListener('click', addTask);

    // Optional: Handle "Enter" key for adding a task
    taskInput.addEventListener('keypress', function (e) {
        if (e.key === "Enter") {
            addTask();
        }
    });
}

// Initialize features after DOM content is fully loaded
document.addEventListener('DOMContentLoaded', () => {
    initializeToDoList();
});


document.addEventListener('DOMContentLoaded', () => {
    const images = document.querySelectorAll('.carousel img');
    const indicators = document.querySelectorAll('.indicator');
    let currentIndex = 0;

    function showImage(index) {
        images.forEach((img, i) => {
            img.classList.toggle('active', i === index);
        });
        indicators.forEach((indicator, i) => {
            indicator.classList.toggle('active', i === index);
        });
    }

    document.getElementById('next').addEventListener('click', () => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    });

    document.getElementById('prev').addEventListener('click', () => {
        currentIndex = (currentIndex - 1 + images.length) % images.length;
        showImage(currentIndex);
    });

    indicators.forEach(indicator => {
        indicator.addEventListener('click', () => {
            currentIndex = parseInt(indicator.getAttribute('data-index'));
            showImage(currentIndex);
        });
    });

    // Auto-rotate every 5 seconds
    setInterval(() => {
        currentIndex = (currentIndex + 1) % images.length;
        showImage(currentIndex);
    }, 2000);
});


// Initialize the cart from localStorage or as an empty array
let cart = JSON.parse(localStorage.getItem("cart")) || [];
updateCartCount(); // Update count on page load

// Function to fetch products from the API
async function fetchApiProducts() {
    try {
        const response = await fetch("https://fakestoreapi.com/products");
        if (!response.ok) {
            throw new Error("Failed to fetch data");
        }
        const products = await response.json();
        displayApiProducts(products);
    } catch (error) {
        console.error("Error fetching API data:", error);
        document.getElementById("api-product-gallery").innerHTML = "<p>Failed to load products. Please try again later.</p>";
    }
}

// Function to display API products
function displayApiProducts(products) {
    const apiProductGallery = document.getElementById("api-product-gallery");
    apiProductGallery.innerHTML = ""; // Clear previous content

    products.forEach(product => {
        const productCard = document.createElement("div");
        productCard.classList.add("product-card");

        productCard.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h3>${product.title}</h3>
            <p>$${product.price.toFixed(2)}</p>
            <p>${product.description.slice(0, 50)}...</p>
            <button data-id="${product.id}">Add to Cart</button>
        `;

        apiProductGallery.appendChild(productCard);
    });

    // Add event listeners to "Add to Cart" buttons
    document.querySelectorAll(".product-card button").forEach(button => {
        button.addEventListener("click", event => {
            const productId = event.target.getAttribute("data-id");
            const selectedProduct = products.find(p => p.id == productId);
            addToCart(selectedProduct);
        });
    });
}

// Function to add a product to the cart
function addToCart(product) {
    cart.push(product);
    localStorage.setItem("cart", JSON.stringify(cart));
    updateCartCount();
    alert("Product added to cart!");
}

// Function to update cart count
function updateCartCount() {
    cartCount.textContent = cart.length;
}

// Function to display the cart
function displayCart() {
    const cartItemsContainer = document.getElementById("cart-items");
    cartItemsContainer.innerHTML = ""; // Clear previous content

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = "<p>Your cart is empty.</p>";
        return;
    }

    cart.forEach((product, index) => {
        const cartItem = document.createElement("div");
        cartItem.classList.add("cart-item");

        cartItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}" width="50">
            <p>${product.title} - $${product.price.toFixed(2)}</p>
            <button data-index="${index}">Remove</button>
        `;

        cartItemsContainer.appendChild(cartItem);
    });

    // Add event listeners to "Remove" buttons
    document.querySelectorAll(".cart-item button").forEach(button => {
        button.addEventListener("click", event => {
            const itemIndex = event.target.getAttribute("data-index");
            removeFromCart(itemIndex);
        });
    });
}

// Function to remove a product from the cart
function removeFromCart(index) {
    cart.splice(index, 1); // Remove item from cart array
    localStorage.setItem("cart", JSON.stringify(cart)); // Update storage
    updateCartCount();
    displayCart();
}

// Fetch API products when the page loads
document.addEventListener("DOMContentLoaded", () => {
    fetchApiProducts();
    displayCart(); // Display cart if user visits the cart page
});

