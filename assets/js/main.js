var sendBtn = document.querySelector('.send-btn');
var modalElement = document.querySelector('.modal');
var closeBtn = document.querySelector('.modal-contact-btn');

if(sendBtn && modalElement) {
    sendBtn.addEventListener('click', function () {
        modalElement.classList.add('modal-show');
        })
}
if(closeBtn && modalElement) {
    closeBtn.addEventListener('click', function() {
        modalElement.classList.toggle('modal-show');
    })
}

/* index */
    function updateSilderPosition(ulContainer ,e) {
        var slider = ulContainer.querySelector('.slider');

        if(!e && !slider) {
            return;
        }
        var itemInfo = e.getBoundingClientRect();
        var ulInfo = ulContainer.getBoundingClientRect();
    
        var newPosition = itemInfo.left - ulInfo.left;
        var newWidth = itemInfo.width;
    
        slider.style.transform = `translateX(${newPosition}px)`;
        slider.style.width = `${newWidth}px`;
    }

    var allVehicle = document.querySelectorAll('.vehicle-list__type');
    allVehicle.forEach(function(ulContainer) {
        var listItems = ulContainer.querySelectorAll('.vehicle-list__item');
        var initialActiveItem = ulContainer.querySelector('.vehicle-list__item--active')
        updateSilderPosition(ulContainer, initialActiveItem);

    listItems.forEach(function(e) {
        e.addEventListener('click', function() {
            var hasActive = ulContainer.querySelector('.vehicle-list__item--active');
            if(hasActive) {
                hasActive.classList.remove('vehicle-list__item--active')
            }
            this.classList.add('vehicle-list__item--active');
    
            updateSilderPosition(ulContainer, this);
        })
    })
})

/* search-icon */
var searchIcon = document.querySelector('.search-icon');
if(searchIcon) {
    searchIcon.addEventListener('click', function(e) {
        e.preventDefault();
        var hasInput = document.querySelector('.header__navbar-seach')
        if(hasInput) {
           hasInput.classList.add('header__navbar-seach--active');
        }
    });
}

/* search-close-icon */
var searchCloseIcon = document.querySelector('.search-close-icon');
if(searchCloseIcon) {
    searchCloseIcon.addEventListener('click', function(e) {
        e.preventDefault();
        var hasInputActive = document.querySelector('.header__navbar-seach--active');
        hasInputActive.classList.remove('header__navbar-seach--active');
    })
}

/* Product button */
var moreBtn = document.querySelector('.product__info-btn');
if(moreBtn) {
    moreBtn.addEventListener('click', function(e) {
        var elementContainer = document.querySelector('.vehicle-elementor__container');
        if(elementContainer) {
            elementContainer.classList.toggle('elementor__container');
            if (elementContainer.classList.contains('elementor__container')) {
                moreBtn.innerHTML = 'Xem thêm';
            } else moreBtn.innerHTML = 'Thu gọn';
        }
    });
}

/* Advertisement */
window.addEventListener('DOMContentLoaded', (event) => {
    var adElement = document.querySelector('.advertisement');
    if(adElement) {
        setTimeout(function() {
            adElement.classList.add('advertisement--active');
        }, 5000)
    }
})

var adCloseIcon = document.querySelector('.ad-close-icon');
if (adCloseIcon) {
    adCloseIcon.addEventListener('click', function(e) {
        var adHasActive = document.querySelector('.advertisement--active');
        if(adHasActive) {
            adHasActive.classList.remove('advertisement--active');
        }
    });
}

var adSendBtn = document.querySelector('.ad__btn');
if(adSendBtn) {
    adSendBtn.addEventListener('click', function(e) {
        var adLabelSend = document.querySelector('.ad__send-successfull');
        if(adLabelSend){
            adLabelSend.classList.add('ad__send-successfull--active');
        }
    })
}

/* Mobile header*/
var headerBars = document.querySelector('.header-menu-bars');
var headerMenuMobile = document.querySelector('.header__navbar-menu-mobile');
var headerCloseIcon = document.querySelector('.header-close-icon');
headerBars.addEventListener('click', () => {
    headerMenuMobile.classList.add('header__navbar-menu-mobile--active');
});

headerCloseIcon.addEventListener('click', () => {
    headerMenuMobile.classList.remove('header__navbar-menu-mobile--active')
})


var headerNavbarItems = document.querySelectorAll('.header__navbar-item');
headerNavbarItems.forEach((item) => {
        item.addEventListener('click', () => {
            headerNavbarItems.forEach((ortherItem) => {
                ortherItem.classList.remove('active');
            });
            item.classList.add('active');
        });
});

/* Chuyển slide*/
const slides = document.querySelectorAll('.slide');
  const mainBackground = document.querySelector('.main-background');
  const supportBackground = document.querySelector('.support-background');
  let currentSlide = 0;
  const totalSlides = slides.length;
  const slideInterval = 4000;

  function showSlide(index) {
    slides.forEach(slide => {
      slide.classList.remove('active');
    });

    if (slides[index]) { // Thêm kiểm tra này để đảm bảo slides[index] tồn tại
      slides[index].classList.add('active');
    }

    if (index === 0) {
      supportBackground.classList.add('hide-on-mobile');
    } else {
      supportBackground.classList.remove('hide-on-mobile');
      supportBackground.classList.add('show-on-mobile');
    }
  }

  function nextSlide() {
    currentSlide = (currentSlide + 1) % totalSlides;
    showSlide(currentSlide);
  }

  showSlide(currentSlide);
  setInterval(nextSlide, slideInterval);