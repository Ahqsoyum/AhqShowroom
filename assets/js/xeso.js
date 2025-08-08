/* Get product */
import {ref, onValue} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
document.addEventListener('DOMContentLoaded', () => {
    const database = window.database;
    if(database) {
        const xeso = ref(database, 'product/xemay/xeso');
        onValue(xeso, (snap) => {
            const xesoData = snap.val();
            const xesoContainer = document.getElementById('product-list');
            xesoContainer.innerHTML = '';

            if(xesoData) {
                for (const xeId in xesoData) {
                    const xe = xesoData[xeId];

                    const productHtmls = `
                    <div class="grid__column-9-3">
                                <div class="product">
                                    <a href="motobike-product.html?type=xeso&id=${xeId}" class="product-img" style="background-image: url(${xe.background_img});"></a>
                                    <h4 class="product-name">${xe.name}</h4>
                                    <div class="product-price">${xe.price}</div>
                                    <label for="" class="product-label">${xe.description}</label>
                                    <div class="product-type">
                                        <span>Loại xe: </span>
                                        <a href="${xe.type}" class="product-type__link">xe số</a>
                                    </div>
                                </div>
                            </div>
                    `;
                    xesoContainer.innerHTML += productHtmls;
                }
            }
        })
    }
})