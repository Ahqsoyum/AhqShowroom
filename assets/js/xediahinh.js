/* Get product */
import {ref, onValue} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

let allProducts = [];

function renderProducts(productsToRender) {
    const xediahinhContainer = document.getElementById('product-list');
    xediahinhContainer.innerHTML = '';
    productsToRender.forEach(xe => {
        const formattedPrice = xe.price.toLocaleString('vi-VN');
        const productHtmls = `
            <div class="grid__column-9-3">
                <div class="product">
                    <a href="car-product.html?type=xediahinh&id=${xe.id}" class="product-img" style="background-image: url(${xe.background_img});"></a>
                    <h4 class="product-name">${xe.name}</h4>
                    <div class="product-price">${formattedPrice}</div>
                    <label for="" class="product-label">${xe.description}</label>
                    <div class="product-type">
                        <span>Loại xe: </span>
                        <a href="${xe.type}" class="product-type__link">${xe.name_type}</a>
                    </div>
                </div>
            </div>
        `;
        xediahinhContainer.innerHTML += productHtmls;
    });
}

async function fetchProducts() {
    while (!window.database) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    const database = window.database;

    const xediahinh = ref(database, 'product/xeoto/xediahinh');
    onValue(xediahinh, (snap) => {
        const xediahinhData = snap.val();
        if (xediahinhData) {
            allProducts = Object.keys(xediahinhData).map(key => ({...xediahinhData[key], id: key}));
            renderProducts(allProducts);
        }
    });
}

document.addEventListener('DOMContentLoaded', () => {
    fetchProducts();
});

const sortingSelect = document.querySelector('.xe__sorting-select');
if (sortingSelect) {
    sortingSelect.addEventListener('change', (e) => {
        const sortValue = e.target.value;
        let sortedProducts = [...allProducts];
        
        if (sortValue === 'low-to-high') {
            sortedProducts.sort((a, b) => a.price - b.price);
        } else if (sortValue === 'high-to-low') {
            sortedProducts.sort((a, b) => b.price - a.price);
        }
        
        renderProducts(sortedProducts);
    });
}

var filter = document.querySelector('.filter');
var headerNavbarMenu = document.querySelector('.header__navbar-menu-mobile');
var mobileFilter = document.querySelector('.grid__column-3-mobile');
filter.addEventListener('click', () => {
    mobileFilter.classList.add('active');
    if (headerNavbarMenu.classList.contains('header__navbar-menu-mobile--active')) {
            headerNavbarMenu.classList.remove('header__navbar-menu-mobile--active');
        }
});

var closeFilter = document.querySelector('.filter-close-icon');
closeFilter.addEventListener('click', () => {
    mobileFilter.classList.remove('active');
});