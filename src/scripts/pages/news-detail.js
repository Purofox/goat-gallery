import 'styles/index.scss';
import 'styles/pages/news-detail.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/custom-select2.scss';
import 'styles/includes/example-slider.scss';

import 'scripts/includes/header.js';
import $ from 'jquery';
import Rellax from "rellax";
import slick from 'slick-carousel';
import AOS from 'aos';
import 'aos/dist/aos.css';
import preloader from 'scripts/helpers/preloader';
// import cursor from 'scripts/helpers/cursor';

preloader();
// cursor();

$(function () {
  const rellax = new Rellax('.rellax');

  $('.example-slider').slick({
      infinite: true,
      arrows: false,
      dots: true,
      speed: 1000,
      dotsClass: 'example-dots',
      fade: true,
      cssEase: 'linear',
  });

  $('.parallax-slider__item').css('background', 'url(src/media/news-detail/news-detail-banner.png) no-repeat center fixed').css('background-size', 'cover');
});

AOS.init({
  startEvent: 'preloaded',
  duration: 800
});
