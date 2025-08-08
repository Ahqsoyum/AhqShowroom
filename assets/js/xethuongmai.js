/* Get product */
import {ref, onValue} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
document.addEventListener('DOMContentLoaded', () => {
    const database = window.database;
    if(database) {
        const xethuongmai = ref(database, 'product/xeoto/xethuongmai');
        onValue(xethuongmai, (snap) => {
            const xethuongmaiData = snap.val();
            const xethuongmaiContainer = document.getElementById('product-list');
            xethuongmaiContainer.innerHTML = '';

            if(xethuongmaiData) {
                for (const xeId in xethuongmaiData) {
                    const xe = xethuongmaiData[xeId];

                    const productHtmls = `
                    <div class="grid__column-9-3">
                                <div class="product">
                                    <a href="product.html?type='xethuongmai'&id=${xeId}" class="product-img" style="background-image: url(${xe.background_img});"></a>
                                    <h4 class="product-name">${xe.name}</h4>
                                    <div class="product-price">${xe.price}</div>
                                    <label for="" class="product-label">${xe.description}</label>
                                    <div class="product-type">
                                        <span>Loại xe: </span>
                                        <a href="${xe.type}" class="product-type__link">${xe.name_type}</a>
                                    </div>
                                </div>
                            </div>
                    `;
                    xethuongmaiContainer.innerHTML += productHtmls;
                }
            }
        })
    }
})