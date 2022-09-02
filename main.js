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
                    <p class="card-text">${product.description.slice(0, 80)}</p>
                </div>
            </div>
        `;
        productContainer.appendChild(productDiv);
    });
};

// create sidebar to show product category
const showCategory =async () => {
    const data =await loadData();
    const uniqueCategory = []
    const ul = document.getElementById("ul");
    data.forEach(product => {
         if (uniqueCategory.indexOf(product.category) === -1) {
             uniqueCategory.push(product.category);
            }
    });

    uniqueCategory.map( category => {
        const li = document.createElement("li");
        li.classList.add("m-3")
        li.innerText = category;
        ul.appendChild(li);
    })
    
}

// search product
const searchProduct = async () => {
    // get search input value
    const searchFeild = document.getElementById("search-field");
    // get all the products
    const products = await loadData();
    // clear previous products and show only founded products
    productContainer.textContent = "";
    const foundProducts = products.filter(product => product.category.includes(searchFeild.value));
    foundProducts.map(product => {
        const productDiv = document.createElement("div");
        productDiv.classList.add("col");
        productDiv.innerHTML = `
            <div class="card p-3">
                <img src="${product.image}" class="card-img-top" alt="..." style="height: 200px">
                <div class="card-body">
                    <h5 class="card-title">${product.title.slice(0, 25)}</h5>
                    <p class="card-text">${product.description.slice(0, 80)}</p>
                </div>
            </div>
        `;
        productContainer.appendChild(productDiv);
    })
}

// set click event listener to the button
document.getElementById("search-btn").addEventListener("click", () => {
    searchProduct();
    
})

// add event listener to the input field to get product without pressing button
document.getElementById("search-field").addEventListener("keyup", (event) => {
    if(event.key === "Enter"){
        searchProduct();
    }
})
showCategory();
showProducts();