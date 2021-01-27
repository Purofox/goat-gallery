import 'styles/includes/index-projects.scss'
import $ from 'jquery';
import 'slick-carousel';

const projects = document.querySelectorAll('.projects-item');
const step = 50;
let delay = 0;

// projects.forEach(item => {
//   item.setAttribute('data-aos-delay', delay.toString());
//   delay += step;
// });

$('.projects-slider').slick({
  infinite: true,
  arrows: false,
  dots: true,
  speed: 1000,
  dotsClass: 'example-dots',
  fade: true,
  cssEase: 'linear',
});
