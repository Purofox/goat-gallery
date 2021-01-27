import 'styles/index.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/materials-tabs.scss';
import 'styles/includes/products-grid.scss';
import 'styles/pages/detail-project.scss';
import 'styles/includes/header-animate.scss';

import 'scripts/includes/header.js';
import 'scripts/includes/points.js';
import $ from 'jquery';
import slick from 'slick-carousel';
import preloader from 'scripts/helpers/preloader';
import AOS from 'aos';
import 'aos/dist/aos.css';

preloader();

$(function() {

    $('.zoom-slider').slick({
        infinite: true,
        speed: 1000,
        arrows: true,
        prevArrow: $('.slick-prev'),
        nextArrow: $('.slick-next'),
        dots: true,
        dotsClass: 'white-dots',
        fade: true,
        cssEase: 'linear',
        responsive: [
            {
              breakpoint: 600,
              settings: {
                arrows: false,
                dots: true,
                dotsClass: 'example-dots',
              }
            },
        ]
    });
});

AOS.init({
  startEvent: 'preloaded',
  duration: 800
});
