import 'styles/index.scss';
import 'styles/pages/detail-stone.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/projects.scss';
import 'styles/includes/products-grid.scss';
import 'styles/includes/example-slider.scss';
import 'styles/includes/header-animate.scss';

import 'scripts/includes/header.js';
import $ from 'jquery';
import Rellax from 'rellax';
import preloader from 'scripts/helpers/preloader';
import AOS from 'aos';
import slick from 'slick-carousel';
import 'aos/dist/aos.css';

window.jQuery = $;
require ('@fancyapps/fancybox');

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
