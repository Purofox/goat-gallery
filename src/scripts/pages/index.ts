import 'styles/index.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/example-slider.scss';
import 'styles/includes/materials-tabs.scss';

import 'scripts/includes/header';
import 'scripts/includes/points';
import 'styles/pages/index.scss';

import Rellax from 'rellax';
import AOS from 'aos';
import 'aos/dist/aos.css';
import $ from 'jquery';
import 'slick-carousel';

import preloader from 'scripts/helpers/preloader';
// import initializeParallax from 'scripts/helpers/parallax.js';
import house from 'scripts/includes/house';
import 'scripts/includes/index-projects';

// initializeParallax(document.querySelector('.viewport'));

preloader(house());
// cursor();

AOS.init({
  startEvent: 'preloaded',
  duration: 800
});

/*Mountains animation*/

new Rellax('.rellax');
const firstCloud = document.querySelector('.cloud-first');
const secondCloud = document.querySelector('.cloud-second');
const step1 = 0.05;
const step2 = 0.07;
let pos1 = 0;
let pos2 = 0;
let frame;

const animate = () => {
  frame = requestAnimationFrame(animate);
  pos1 = pos1 >= window.innerWidth ? -window.innerWidth : pos1 + step1;
  pos2 = pos2 >= window.innerWidth ? -window.innerWidth : pos2 + step2;
  firstCloud.setAttribute("style", `transform: translateX(${pos1}px)`);
  secondCloud.setAttribute("style", `transform: translateX(${pos2}px)`);
};
frame = requestAnimationFrame(animate);

/*end of mountains animation*/


$('.news-slider').slick({
  infinite: true,
  arrows: false,
  dots: true,
  speed: 1000,
  dotsClass: 'example-dots',
  fade: true,
  cssEase: 'linear',
});

$('.project-slide').slick({
  infinite: true,
  arrows: false,
  dots: true,
  speed: 1000,
  dotsClass: 'example-dots',
  fade: true,
  cssEase: 'linear',
});
