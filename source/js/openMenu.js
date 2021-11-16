var btnMenuEl = document.querySelector('.js-btnMenu'),
      headerBarEl = document.querySelector('.js-header__bar'),     
      navEl = document.querySelector('.js-nav');

//Функция открытия меню
function menuOpen() {
    headerBarEl.classList.add('menu-open');
    btnMenuEl.setAttribute('aria-expanded', 'true');
    navEl.querySelector('a').setAttribute('tabindex','0');
    navEl.querySelector('a').focus();
};

// Функция закрытия меню
function menuClose() {
    headerBarEl.classList.remove('menu-open');
    btnMenuEl.setAttribute('aria-expanded', 'false');
};

// Открытие/закрытие меню при нажатии кнопки .js-btnMenu 
btnMenuEl.addEventListener('click', function(event) {
    if (headerBarEl.classList.contains('menu-open')) {
        menuClose();
    } else {
        menuOpen();
    }; 
});

//Закрытие меню при нажатии за границами окна меню
document.addEventListener('click', function(event) {
    var target = event.target,
        its_menu = target == navEl || navEl.contains(target),
        its_closeBtn = target == btnMenuEl,
        menu_open = headerBarEl.classList.contains('menu-open');
    
    if (!its_menu && !its_closeBtn && menu_open) {
        menuClose();       
    };
});

// Закрытие меню при скролле
window.addEventListener('scroll', function() {
    if (headerBarEl.classList.contains('menu-open')){
        menuClose();
    };        
});

// Закрытие меню при нажатии на кнопку клавиатуры Esc
document.body.addEventListener('keyup', function (event) {
    var key=event.keyCode,
        menu_open=headerBarEl.classList.contains('menu-open');

    if (key == 27 && menu_open) {        
        menuClose();
    };
});





