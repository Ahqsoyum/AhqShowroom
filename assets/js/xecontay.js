import {ref, onValue} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

let allProducts = [];

function renderProducts(productsToRender) {
    const xecontayContainer = document.getElementById('product-list');
    xecontayContainer.innerHTML = '';

    productsToRender.forEach(xe => {
        const productHtmls = `
            <div class="grid__column-9-3">
                <div class="product">   
                    <a href="motobike-product.html?type=xecontay&id=${xe.name}" class="product-img" style="background-image: url(${xe.background_img});"></a>
                    <h4 class="product-name">${xe.name}</h4>
                    <div class="product-price">${xe.price.toLocaleString('vi-VN')} đ</div>
                    <label for="" class="product-label">${xe.description}</label>
                    <div class="product-type">
                        <span>Loại xe: </span>
                        <a href="${xe.type}" class="product-type__link">xe côn tay</a>
                    </div>
                </div>
            </div>
        `;
        xecontayContainer.innerHTML += productHtmls;
    });
}

async function fetchProducts() {
    while (!window.database) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    const database = window.database;
    if(database) {
        const xecontay = ref(database, 'product/xemay/xecontay');
        onValue(xecontay, (snap) => {
            const xecontayData = snap.val();
            if(xecontayData) {
                allProducts = Object.values(xecontayData);
                renderProducts(allProducts);
            }
        });
    }
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

/* Container Filter */
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
closeFilter.addEventListener('click', ()=> {
    mobileFilter.classList.remove('active');
});