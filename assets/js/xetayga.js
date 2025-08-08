/* Get product */
import {ref, onValue} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
document.addEventListener('DOMContentLoaded', () => {
    const database = window.database;
    if(database) {
        const xetayga = ref(database, 'product/xemay/xetayga');
        onValue(xetayga, (snap) => {
            const xetaygaData = snap.val();
            const xetaygaContainer = document.getElementById('product-list');
            xetaygaContainer.innerHTML = '';

            if(xetaygaData) {
                for (const xeId in xetaygaData) {
                    const xe = xetaygaData[xeId];

                    const productHtmls = `
                    <div class="grid__column-9-3">
                                <div class="product">
                                    <a href="motobike-product.html?type=xetayga&id=${xeId}" class="product-img" style="background-image: url(${xe.background_img});"></a>
                                    <h4 class="product-name">${xe.name}</h4>
                                    <div class="product-price">${xe.price}</div>
                                    <label for="" class="product-label">${xe.description}</label>
                                    <div class="product-type">
                                        <span>Loại xe: </span>
                                        <a href="${xe.type}" class="product-type__link">xe tay ga</a>
                                    </div>
                                </div>
                            </div>
                    `;
                    xetaygaContainer.innerHTML += productHtmls;
                }
            }
        })
    }
})