import {ref, onValue} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-database.js";

async function initializeProductDetails() {
    // Chờ cho đến khi biến window.database được khởi tạo
    while (!window.database) {
        await new Promise(resolve => setTimeout(resolve, 100));
    }
    const database = window.database;

    const url = new URLSearchParams(window.location.search);
    const type = url.get('type');
    const productId = url.get('id');

    if (type && productId) {
        const productRef = ref(database, `product/xemay/${type}/${productId}`);
        
        onValue(productRef, (snap) => {
            const data = snap.val();
            const container = document.getElementById('product-details');

            if (data) {
                const productHtmls = `
                <h4 class="product__header">${data.name}</h4>
                <div class="grid__row motobike-mobile-container">
                    <div class="grid__column-6">
                        <div class="product__detail-main-img" style="background-image: url(${data.background_img});"></div>
                        <div class="product__detail-mini-img">
                            <div class="product__detail-mini product__detail-mini--active" data-img-url="${data.background_img}" style="background-image: url(${data.background_img});"></div>
                            <div class="product__detail-mini" data-img-url="${data.background_img_2}" style="background-image: url(${data.background_img_2});"></div>
                            <div class="product__detail-mini" data-img-url="${data.background_img_3}" style="background-image: url(${data.background_img_3});"></div>
                            <div class="product__detail-mini" data-img-url="${data.background_img_4}" style="background-image: url(${data.background_img_4});"></div>
                        </div>
                    </div>
                    <div class="grid__column-6">
                        <label class="product__label-price">Giá từ ${data.price} VNĐ</label>
                            <div class="product__color-btn">
                                <button class="product__color product__color--active" data-img-url="${data.background_img}">${data.color_1}</button>
                                <button class="product__color" data-img-url="${data.background_img_2}">${data.color_2}</button>
                                <button class="product__color" data-img-url="${data.background_img_3}">${data.color_3}</button>
                                <button class="product__color" data-img-url="${data.background_img_4}">${data.color_4}</button>
                            </div>
                        <div class="product__price">
                            <div class="product__new-price">Giá chỉ từ: <span class="product__new-price--span">${data.price} VNĐ</span></div>
                        </div>
                    </div>
                </div>
                `;
                container.innerHTML = productHtmls;

                var mainImg = document.querySelector('.product__detail-main-img');
                var miniImgs = document.querySelectorAll('.product__detail-mini');
                var colorItems = document.querySelectorAll('.product__color');

                function updateActive(url) {
                    miniImgs.forEach(img => {
                        img.classList.remove('product__detail-mini--active');
                        if(img.getAttribute('data-img-url') === url) {
                            img.classList.add('product__detail-mini--active');
                        }
                    });

                    colorItems.forEach(colorBtn => {
                        colorBtn.classList.remove('product__color--active');
                        if(colorBtn.getAttribute('data-img-url') === url) {
                            colorBtn.classList.add('product__color--active');
                        }
                    });
                } 

                miniImgs.forEach(img => {
                    img.addEventListener('click', () => {
                        const newImgUrl = img.getAttribute('data-img-url');
                        mainImg.style.backgroundImage = `url(${newImgUrl})`;
                        updateActive(newImgUrl);
                    });
                });

                colorItems.forEach(btn => {
                    btn.addEventListener('click', () => {
                        const newImgUrl = btn.getAttribute('data-img-url');
                        mainImg.style.backgroundImage = `url(${newImgUrl})`;
                        updateActive(newImgUrl);
                    });
                });           

            } else {
                container.innerHTML = `<p>Không tìm thấy sản phẩm.</p>`;
            }
        }); 

        const producInforRef = ref(database, `product/xemay/${type}/${productId}/product_info`);
        onValue(producInforRef, (snap) => {
            const productInforData = snap.val();
            const productInfo = document.querySelector('.vehicle-elementor__container');
            productInfo.innerHTML = '';

            if(productInforData) {
                for (const infoData in productInforData) {
                    const info = productInforData[infoData];

                    const productInfoHtmls = `
                    <div class="element-list-item-info">
                        <label for="" class="element-item-label">${info.label}</label>
                        <span class="element-item-value">${info.value}</span>
                    </div>
                    `;
                    productInfo.innerHTML += productInfoHtmls;
                }
            }
        });

    } else {
        const container = document.getElementById('product-details');
        container.innerHTML = `<p>Vui lòng cung cấp đầy đủ thông tin sản phẩm.</p>`;
    }


}

document.addEventListener('DOMContentLoaded', () => {
    initializeProductDetails();
});