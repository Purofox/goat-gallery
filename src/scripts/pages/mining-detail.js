import 'styles/index.scss';
import 'styles/pages/mining-detail.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/custom-select2.scss';
import 'styles/includes/example-slider.scss';
import 'styles/includes/materials-tabs.scss';
import 'styles/includes/finishing-options.scss';
import 'styles/includes/projects.scss';
import 'styles/includes/header-animate.scss';

import 'scripts/includes/header.js';
import 'scripts/includes/blur.js';
import $ from 'jquery';
import Rellax from "rellax";
import slick from 'slick-carousel';
import AOS from 'aos';
import 'aos/dist/aos.css';
import preloader from 'scripts/helpers/preloader';

preloader();

$(function() {
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

    $('.parallax-slider').slick({
        infinite: true,
        arrows: false,
        dots: true,
        speed: 1000,
        dotsClass: 'example-dots',
        fade: true,
        cssEase: 'linear',
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

    $('.projects-slider').slick({
        infinite: true,
        speed: 1000,
        arrows: false,
        dots: true,
        dotsClass: 'example-dots',
        fade: true,
        cssEase: 'linear'
    });

    $('.panel-heading').click(function () {
      $(this).toggleClass('in').next().slideToggle();
      $('.panel-heading').not(this).removeClass('in').next().slideUp();
    });
});

AOS.init({
  startEvent: 'preloaded',
  duration: 800
});
