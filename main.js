// load data from api
const loadData = async() => {
    const url = await `https://fakestoreapi.com/products`;
    const res = await fetch(url);
    const data = await res.json();

    return data;
};

// product container
const productContainer = document.getElementById("product-container")

// show the products to the UI
const showProducts = async() => {
    const products = await loadData();
    products.forEach(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("col");
        productDiv.innerHTML = `
            <div class="card p-3">
                <img src="${product.image}" class="card-img-top" alt="..." style="height: 200px">
                <div class="card-body">
                    <h5 class="card-title">${product.title.slice(0,25)}</h5>
                    <p class="card-text">${product.description.slice(0, 100)}</p>
                </div>
            </div>
        `;
        productContainer.appendChild(productDiv);
    });
};

showProducts()