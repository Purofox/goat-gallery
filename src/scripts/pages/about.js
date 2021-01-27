import 'styles/index.scss';
import 'styles/pages/about.scss';
import 'styles/includes/muuri-gallery.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/finishing-options.scss';
import 'styles/includes/services.scss';
import 'styles/includes/header-animate.scss';
import 'scripts/includes/header.js';
import 'scripts/includes/blur.js';
import preloader from 'scripts/helpers/preloader';

import $ from 'jquery';
window.jQuery = $;
import AOS from 'aos';
import 'aos/dist/aos.css';
require ('@fancyapps/fancybox');
import Grid from 'muuri';

preloader();


const grid = new Grid('.masonry', {
    layout: {
        fillGaps: true
    }
});

$('.panel-heading').click(function () {
  $(this).toggleClass('in').next().slideToggle();
  $('.panel-heading').not(this).removeClass('in').next().slideUp();
});

$('.services-panel').each(function(index) {
  $(this).css('background',`url(src/media/about/service-${index+1}.png) no-repeat center / cover`);
});

$('.options-panel').each(function(index) {
  $(this).css('background',`url(src/media/options-${index+1}.png) no-repeat center / cover`);
});

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

AOS.init({
  startEvent: 'preloaded',
  duration: 800
});

