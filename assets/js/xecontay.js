/* Get product */
import {ref, onValue} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";
document.addEventListener('DOMContentLoaded', async () => {
    while (!window.database) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    const database = window.database;
    if(database) {
        const xecontay = ref(database, 'product/xemay/xecontay');
        onValue(xecontay, (snap) => {
            const xecontayData = snap.val();
            const xecontayContainer = document.getElementById('product-list');
            xecontayContainer.innerHTML = '';

            if(xecontayData) {
                for (const xeId in xecontayData) {
                    const xe = xecontayData[xeId];

                    const productHtmls = `
                    <div class="grid__column-9-3">
                                <div class="product">   
                                    <a href="motobike-product.html?type=xecontay&id=${xeId}" class="product-img" style="background-image: url(${xe.background_img});"></a>
                                    <h4 class="product-name">${xe.name}</h4>
                                    <div class="product-price">${xe.price}</div>
                                    <label for="" class="product-label">${xe.description}</label>
                                    <div class="product-type">
                                        <span>Loại xe: </span>
                                        <a href="${xe.type}" class="product-type__link">xe côn tay</a>
                                    </div>
                                </div>
                            </div>
                    `;
                    xecontayContainer.innerHTML += productHtmls;
                }
            }
        })
    }
})
