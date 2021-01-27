import 'styles/index.scss';
import 'styles/pages/stone-page.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/example-slider.scss';
import 'styles/includes/materials-tabs.scss';
import 'styles/includes/finishing-options.scss';
import 'styles/includes/includes-textarea.scss';
import 'styles/includes/header-animate.scss';

import 'scripts/includes/header.js';
import 'scripts/includes/points.js';
import 'scripts/includes/blur.js';
import $ from 'jquery';
import slick from 'slick-carousel';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Rellax from 'rellax';
import preloader from 'scripts/helpers/preloader';

preloader();


$(function() {

    $('.example-slider').slick({
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
        speed: 1000,
        arrows: true,
        prevArrow: $('.slick-prev'),
        nextArrow: $('.slick-next'),
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

    $('.anchor-item').click(function() {
        let id = $(this).attr('data-tab'),
        content = $('.material-grid[data-tab="'+ id +'"]');

        $(this).toggleClass('active');
        $('.anchor-item').not(this).removeClass('active');

        $('.material-grid.active').removeClass('active');
        content.addClass('active');

        const animateElem = $('.material-grid.active .material-item');

        animateElem.each(function(index) {
            setTimeout(() => $(this).addClass('animate__animated animate__fadeIn animate__slow'), index * 170);
        });

    });

    $('.panel-heading').click(function () {
      $(this).toggleClass('in').next().slideToggle();
      $('.panel-heading').not(this).removeClass('in').next().slideUp();
    });

    const rellax = new Rellax('.rellax');

    $('.options-panel').css('background','url(src/media/options-1.png) no-repeat center');

    $('.extra-slider').slick({
        infinite: true,
        arrows: false,
        dots: true,
        speed: 1000,
        dotsClass: 'example-dots',
        fade: true,
        cssEase: 'linear',
    });

});

$( window ).resize(function() {
    let materialWidth = $('.material-item').width() * 0.73;
    $('.material-item').css('height', materialWidth + 'px');
});

AOS.init({
  startEvent: 'preloaded',
  duration: 800
});

