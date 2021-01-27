import 'styles/index.scss';
import 'styles/pages/product.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/custom-select2.scss';
import 'styles/includes/navigations.scss';
import 'styles/includes/header-animate.scss';

import 'scripts/includes/header.js';
import 'scripts/includes/blur.js';
import preloader from 'scripts/helpers/preloader';
import $ from 'jquery';
import Rellax from "rellax";
import select2 from "select2";
import AOS from "aos";
import 'aos/dist/aos.css';

preloader();

$(function() {
    const rellax = new Rellax('.rellax');

     $('.custom-select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
    });

    $('.filter-list__property').click(function () {

        $('.products__item').hide().css('opacity','0');
        let currentClass = $(this).attr('data-tab');
        $(this).addClass('active');
        $('.filter-list__property').not(this).removeClass('active');
        $('.products').find("." + currentClass).show().css('opacity','1');

    });

    $('.remove-filter').click(function () {
        $('.products__item').show().css('opacity','1');
    });

    $('.mobile-filter').click(function(){
        document.body.classList.add('open-modal');
        $(".modal--filter").removeClass('animate__fadeOut').addClass('open-menu animate__fadeIn');
    });

    $('.close').click(function(){
        $('body').removeClass('open-modal');
        $('.modal--filter').removeClass('animate__fadeIn').addClass('animate__fadeOut');
        setTimeout(function() {
            $(".modal--filter").removeClass('open-menu');
        }, 200);
    });
});

AOS.init({
  startEvent: 'preloaded',
  duration: 800
});
