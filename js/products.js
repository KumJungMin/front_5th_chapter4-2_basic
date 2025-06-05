async function loadProducts() {
    const response = await fetch("https://fakestoreapi.com/products");
    const products = await response.json();
    displayProducts(products);  
}

function displayProducts(products) {
    const container = document.querySelector('#all-products .container');
    const fragment = document.createDocumentFragment();

    products.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('product');

        const pictureDiv = document.createElement('div');
        pictureDiv.classList.add('product-picture');
        const img = document.createElement('img');
        img.src = product.image;
        img.alt = `product: ${product.title}`;
        img.width = 250;
        img.height = 250;
        img.loading = 'lazy';
        img.style.objectFit = 'cover';
        pictureDiv.appendChild(img);

        const infoDiv = document.createElement('div');
        infoDiv.classList.add('product-info');

        const category = document.createElement('h5');
        category.classList.add('categories');
        category.textContent = product.category;

        const title = document.createElement('h4');
        title.classList.add('title');
        title.textContent = product.title;

        const price = document.createElement('h3');
        price.classList.add('price');
        const priceSpan = document.createElement('span');
        priceSpan.textContent = `US$ ${product.price}`;
        price.appendChild(priceSpan);

        const button = document.createElement('button');
        button.textContent = 'Add to bag';

        infoDiv.append(category, title, price, button);
        productElement.append(pictureDiv, infoDiv);
        fragment.appendChild(productElement);
    });

    // 최종적으로 한 번만 DOM에 추가
    container.appendChild(fragment);
}



loadProducts();

// Simulate heavy operation. It could be a complex price calculation.
for (let i = 0; i < 10000000; i++) {
    const temp = Math.sqrt(i) * Math.sqrt(i);
}

