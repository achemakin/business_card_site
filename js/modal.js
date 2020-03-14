var FOCUSABLE_SELECTORS = 'a[href], area[href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), button:not([disabled]), iframe, object, embed, *[tabindex], *[contenteditable]';

var closeModalBtn = document.querySelectorAll('.js-close-modal'),
      openModalBtn = document.querySelectorAll('.js-open-modal'),
      modal = document.querySelector('.js-modal'),
      modalOverlay = document.querySelector('.js-modal-overlay'),   
      body = document.querySelector('body'),
      lastFocus,
      modalForm = document.querySelector('.modal__form');
      

// Функция открытия модального окна
function openModal() {
    lastFocus = document.activeElement;
    body.classList.add('no-scroll');
    modal.setAttribute('aria-modal', 'true');
    modal.classList.add('active');    
    modalOverlay.classList.add('active');
    modal.querySelector('input').focus(); 
    
    var focusableElements = body.querySelectorAll(FOCUSABLE_SELECTORS);    
    focusableElements.forEach(function(el) {
        el.setAttribute('tabindex', '-1');
    });
    
    var focusableElementsModal = modal.querySelectorAll(FOCUSABLE_SELECTORS);
    focusableElementsModal.forEach(function(el) {
        el.setAttribute('tabindex', '0');
    });    
};

// Функция закрытия модального окна
function closeModal() {
    modal.classList.remove('active');
    modalOverlay.classList.remove('active');   
    body.classList.remove('no-scroll');
    modal.setAttribute('aria-modal', 'false');
    var focusableElements = body.querySelectorAll(FOCUSABLE_SELECTORS);
    focusableElements.forEach(function(el) {
        el.removeAttribute('tabindex');
    });
    document.querySelector('.modal__form').reset();
    lastFocus.focus();  
};

// Открытие модального окна при нажатии кнопки с классом .js-open-modal
openModalBtn.forEach(function(item) {
    item.addEventListener('click', function(event){
        event.preventDefault();
        openModal();        
    })
});

//Закрытие модального окна при нажатие на кнопку Close
closeModalBtn.forEach(function(item) {
    item.addEventListener('click', function(event){
        event.preventDefault();
        closeModal();           
    })
});

// Закрытие модального окна при нажатии на область вне модалки
modalOverlay.addEventListener('click', function(){
    closeModal();    
});

// Закрытие модального окна при нажатии на кнопку клавиатуры Esc
document.body.addEventListener('keyup', function (event) {
    var key = event.keyCode;

    if (key == 27) {
        closeModal();
    };
});


