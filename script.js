function validateUser(event) {
    event.preventDefault();
    let username = document.getElementById("username").value;
    let password = document.getElementById("password").value;
    let valid = true;
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    document.getElementById("username-error").style.display = "none";
    document.getElementById("password-error").style.display = "none";

    if (!emailRegex.test(username)) {
        document.getElementById("username-error").style.display = "block";
        valid = false;
    }

    if (password === "") {
        document.getElementById("password-error").style.display = "block";
        valid = false;
    }

    if (valid) {
        document.getElementById("welcome-text").innerText = `Bienvenido ${username}`;
        document.getElementById("welcome-message").style.display = "block";
        document.getElementById('id01').style.display = "none";

        // Mostrar botón de logout y mensaje de bienvenida en el header
        document.getElementById("loginButton").style.display = "none";
        const welcomeHeader = document.createElement('span');
        welcomeHeader.id = "userWelcome";
        welcomeHeader.innerText = `Bienvenido, ${username}`;
        welcomeHeader.style.color = "red";
        welcomeHeader.style.fontWeight = "bold";

        const profileImage = document.createElement('img');
        profileImage.src = "./img/images.png"; 
        profileImage.alt = "Foto de perfil";
        profileImage.style.width = "4rem";
        profileImage.style.marginRight = "10px";

        const logoutButton = document.createElement('button');
        logoutButton.innerText = "Salir";
        logoutButton.style.border = "none";
        logoutButton.style.background = "#3862cc"; 
        logoutButton.style.color = "white";
        logoutButton.style.paddingLeft = "2vh";
        logoutButton.addEventListener('click', function() {
            // Limpia datos de inicio de sesión
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            location.reload();
        });

        const headerNavigation = document.querySelector('.header_navigation');
        headerNavigation.innerHTML = ''; 
        headerNavigation.appendChild(profileImage);
        headerNavigation.appendChild(welcomeHeader);
        headerNavigation.appendChild(logoutButton);

        // Guardar el estado de login
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('username', username);
    }

    return false;
}

window.onload = function () {
    const modal = document.getElementById('id01');

    window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }

    // Verificar si el usuario está logueado
    if (localStorage.getItem('isLoggedIn') === 'true') {
        const username = localStorage.getItem('username');
        document.getElementById("loginButton").style.display = "none";
        const welcomeHeader = document.createElement('span');
        welcomeHeader.id = "userWelcome";
        welcomeHeader.innerText = `Bienvenido, ${username}`;
        welcomeHeader.style.color = "red";
        document.querySelector('.header_navigation').appendChild(welcomeHeader);
        
        // Agregar botón de logout
        const logoutButton = document.createElement('button');
        logoutButton.innerText = "Salir";
        logoutButton.style.background = "none";
        logoutButton.style.border = "none";
        logoutButton.style.paddingLeft = "1rem";
        logoutButton.addEventListener('click', function() {
            // Limpia datos de inicio de sesión (LOCAL)
            localStorage.removeItem('isLoggedIn');
            localStorage.removeItem('username');
            location.reload();
        });
        document.querySelector('.header_navigation').appendChild(logoutButton);

    }
}

// Consumo de API

const apiUrl = 'https://fakestoreapi.com/products';

const loadProducts = async () => {
    try {
        const response = await fetch(apiUrl);
        const products = await response.json();
        displayProducts(products);
    } catch (error) {
        console.error('Error al cargar los productos:', error);
    }
};

const displayProducts = (products) => {
    const productsGrid = document.getElementById('products-grid');
    productsGrid.innerHTML = products.map(product => `
        <div class="product-card" data-id="${product.id}" onclick="redirectToProductDetail(${product.id})">
            <img src="${product.image}" alt="${product.title}" />
            <h2>${product.title}</h2>
            <p>$${product.price}</p>
        </div>
    `).join('');
};

const redirectToProductDetail = (productId) => {
    window.location.href = `product.html?id=${productId}`;
};

// Cargar productos al cargar la página
window.onload = loadProducts;
