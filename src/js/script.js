"use strict";

// burger menu

const burger = document.querySelector('.header__burger');
const menu = document.querySelector('.header__menu-nav');

if (burger) {
         burger.addEventListener('click', function (e) {
                  document.body.classList.toggle('lock');
                  burger.classList.toggle('active');
                  menu.classList.toggle('active');
         });
}

// прокрутка меню

const menuLinks = document.querySelectorAll(".header__menu-link[data-link]");
if (menuLinks.length > 0) {
         menuLinks.forEach(menuLink => {
                  menuLink.addEventListener("click", onMenuLinkClick);     
         });
         function onMenuLinkClick(e) {
                  const menuLink = e.target;
                  if(menuLink.dataset.link && document.querySelector(menuLink.dataset.link)) {
                    const linkBlock = document.querySelector(menuLink.dataset.link);
                    const linkBlockValue = linkBlock.getBoundingClientRect().top + pageXOffset -document.querySelector('header').offsetHeight;     

                    window.scrollTo({
                           top: gotoBlockValue,
                           behavior: "smooth"
                       });
                       e.preventDefault();
                  }
         }

}


