import 'styles/index.scss';
import 'styles/pages/product-detail.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/projects.scss';
import 'styles/includes/products-grid.scss';
import 'styles/includes/header-animate.scss';

import 'scripts/includes/header.js';
import preloader from 'scripts/helpers/preloader';
import $ from "jquery";
window.jQuery = $;
import slick from 'slick-carousel';
import Rellax from "rellax";
require ('@fancyapps/fancybox');
import AOS from 'aos';
import 'aos/dist/aos.css';

preloader();

$(function() {

    $('.projects-slider').slick({
        infinite: true,
        speed: 1000,
        arrows: false,
        dots: true,
        dotsClass: 'example-dots',
        fade: true,
        cssEase: 'linear'
    });

    const rellax = new Rellax('.rellax');

    $('[data-fancybox="gallery"]').fancybox({
        hash            : false,
        keyboard        : false,
        loop            : false,
        toolbar         : true,
        clickContent    : false,
        transitionEffect: "fade",
        transitionDuration: 3000,
        infobar : false,
        animationEffect: "fade",
        animationDuration: 2000,
        wheel: false,
        buttons: [
            "close"
        ],
    });
});

AOS.init({
  startEvent: 'preloaded',
  duration: 800
});

