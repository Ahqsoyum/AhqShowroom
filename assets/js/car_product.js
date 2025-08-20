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
        const productRef = ref(database, `product/xeoto/${type}/${productId}`);
        
        onValue(productRef, (snap) => {
            const data = snap.val();
            const headerProduct = document.querySelector('.car-product__header');

            if (data) {
                const productHtmls = `
                
                    <div class="grid__column-6">
                        <div class="product__main-background" style="background-image: url(${data.background_img});"></div>
                    </div>
                    <div class="grid__column-6">
                        <h4 class="product__header-name">${data.name}</h4>
                        <div class="grid__row">
                            <div class="grid__column-6-3">
                                <div class="product__header-info">
                                    Số chỗ ngồi
                                    <span class="product__header-info-span">${data.seat_quantity}</span>
                                </div>
                            </div>
                            <div class="grid__column-6-3">
                                <div class="product__header-info">
                                    Kiểu dáng
                                    <span class="product__header-info-span">${data.name_type}</span>
                                </div>
                            </div> 
                            <div class="grid__column-6-3">
                                <div class="product__header-info">
                                    Nhiên liệu
                                    <span class="product__header-info-span">${data.fuel_type}</span>
                                </div>
                            </div> 
                            <div class="grid__column-6-3">
                                <div class="product__header-info">
                                    Xuất xứ
                                    <span class="product__header-info-span">${data.description}</span>
                                </div>
                            </div>  
                            <div class="grid__column-6-3">
                                <div class="product__header-info">
                                    Giá từ
                                    <Span class="product__header-info-span">${data.price.toLocaleString('vi-VN')} VNĐ</Span>
                                </div>
                            </div>
                        </div>
                        
                        <div class="product__header-info-hotline">gọi ngay: 0949.405.449</div>
                    </div>
                
                `;
                headerProduct.innerHTML = productHtmls;
            } else {
                headerProduct.innerHTML = `<p>Không tìm thấy sản phẩm.</p>`;
            }
        }); 

        const productGalleryRef = ref(database, `product/xeoto/${type}/${productId}/gallery`);
onValue(productGalleryRef, (snap) => {
    const productGalleryData = snap.val();
    const productGallery = document.querySelector('.product__gallery');
    productGallery.innerHTML = '';

    if (productGalleryData) {
        const firstImg = productGalleryData.img_1;
        let miniImagesHtmls = '';

        const imgUrls = Object.values(productGalleryData);
        imgUrls.forEach((imgUrl) => {
            miniImagesHtmls += `
                <div class="product__gallery-item-mini-img" style="background-image: url(${imgUrl});" data-img-url="${imgUrl}"></div>
            `;
        });

        const productGalleryHtmls = `
        <div class="grid">
            <h4 class="product__gallery-header">Thư viện ảnh</h4>
            <div class="product__gallery-container">
                <i class="ti-angle-left product__gallery-icon prev"></i>
                <div class="product__gallery-main-img" style="background-image: url(${firstImg});"></div>
                <i class="ti-angle-right product__gallery-icon next"></i>
            </div>
            <div class="product__gallery-list-mini-img">
                ${miniImagesHtmls}
            </div>
        </div>
        `;

        productGallery.innerHTML = productGalleryHtmls;

        const mainImg = document.querySelector('.product__gallery-main-img');
        const miniImgs = document.querySelectorAll('.product__gallery-item-mini-img');
        const prevButton = document.querySelector('.prev');
        const nextButton = document.querySelector('.next');

        let currentImgIndex = 0;
        
        function changeMainImg(index) {
            if (miniImgs[index]) {
                const newImgUrl = miniImgs[index].getAttribute('data-img-url');
                mainImg.classList.add('fade-out');
                setTimeout(() => {
                    mainImg.style.backgroundImage = `url(${newImgUrl})`;
                    mainImg.classList.remove('fade-out');
                }, 500);
            }
        }
        
        if (prevButton) {
            prevButton.addEventListener('click', () => {
                currentImgIndex = (currentImgIndex - 1 + miniImgs.length) % miniImgs.length;
                changeMainImg(currentImgIndex);
            });
        }
        
        if (nextButton) {
            nextButton.addEventListener('click', () => { 
                currentImgIndex = (currentImgIndex + 1) % miniImgs.length;
                changeMainImg(currentImgIndex);
            });
        }
        
        miniImgs.forEach((img, index) => {
            img.addEventListener('click', () => {
                currentImgIndex = index;
                changeMainImg(currentImgIndex);
            });
        });
    }
});

        const productColorRef = ref(database, `product/xeoto/${type}/${productId}/color`);
        onValue(productColorRef , (snap) => {
            const data = snap.val();
            const productColorContainer = document.querySelector('.product__color');
            productColorContainer.innerHTML = '';
            if(data) {
                let colorListHtmls = '';
                const mainImg = data.color_1.color_car_img;
                for (const colorData in data) {
                    const color = data[colorData]
                    colorListHtmls += `
                        <div class="product__item-color ${color.name_color}" color_img_url="${color.color_car_img}"></div>
                    `;
                };

                productColorContainer.innerHTML = `
                    <div class="grid">
                    <h4 class="product__header-color">Màu sắc</h4>
                    <div class="grid__row">
                        <div class="grid__column-6">
                            <div class="product__list-color">
                                ${colorListHtmls}
                            </div>
                        </div>
                        <div class="grid__column-6">
                            <div class="product__color-img" style="background-image: url(${mainImg});"></div>
                        </div>
                    </div>
                </div>
                `;
                var color = document.querySelectorAll('.product__item-color');
                var colorImg = document.querySelector('.product__color-img');

                if (color.length > 0) {
                    color[0].classList.add('product__item-color--active');
                }

                color.forEach(item => {
                    item.addEventListener('click', () => {
                        color.forEach(c => c.classList.remove('product__item-color--active'));

                        item.classList.add('product__item-color--active');

                        const newImgUrl = item.getAttribute('color_img_url');
                        colorImg.style.backgroundImage = `url(${newImgUrl})`;
                    });
                })


        } else productColorContainer.innerHTML = `<p>Không tìm thấy dữ liệu</p>`
    });


        const productFeatureRef = ref(database, `product/xeoto/${type}/${productId}/feature_section`);
        onValue(productFeatureRef, (snap) => {
            const productFeatureData = snap.val();
            const productFeatureContainer = document.querySelector('.feature-section-container');
            productFeatureContainer.innerHTML = '';

            if(productFeatureData) {
                productFeatureData.forEach(data => {
                    let featureItemHtmls = '';
                    if(data.feature_items && Array.isArray(data.feature_items)) {
                        data.feature_items.forEach(item => {
                            featureItemHtmls += `
                                <div class="grid__column-6">
                                    <div class="feature-section__img" style="background-image: url(${item.img});"></div>
                                    <div class="feature-section__text">
                                        <label for="" class="featrue-item__label">${item.featureItemLabel}</label>
                                        <span class="feature-item__span">${item.featureItemSpan}</span>
                                    </div>
                                </div>
                            `;  
                        });
                    };
                    const featureSectionHtml = `
                        <div class="feature-section">
                            <div class="grid">
                                <h4 class="feature-header">${data.feature_header}</h4>
                                <div class="grid__row">
                                    ${featureItemHtmls}
                                </div>
                            </div>
                        </div>
                        
                    `;
                    productFeatureContainer.innerHTML += featureSectionHtml;
                });
            }else {
                    productFeatureContainer.innerHTML = `<p>Không tìm thấy dữ liệu tính năng sản phẩm.</p>`;
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