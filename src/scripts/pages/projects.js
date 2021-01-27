import 'styles/index.scss';
import 'styles/pages/projects.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/projects.scss';
import 'styles/includes/custom-select2.scss';
import 'styles/includes/navigations.scss';

import 'scripts/includes/header.js';
import preloader from 'scripts/helpers/preloader';
import $ from "jquery";
import select2 from "select2";
import AOS from "aos";
import 'aos/dist/aos.css';

preloader();

$(function() {
    $('.filter-list__property').click(function () {

        $('.projects__item').hide().css('opacity','0');

        let currentClass = $(this).attr('data-tab');
        $(this).addClass('active');
        $('.filter-list__property').not(this).removeClass('active');

        $('.projects').find("." + currentClass).show().css('opacity','1');

        if(currentClass === 'all') {
            $('.projects__item').show().css('opacity','1');
        }
    });

    $('.custom-select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
    });
});

AOS.init({
  startEvent: 'preloaded',
  duration: 800
});

$('.projects__item').mouseover(function(){
    $(this).addClass('animate-hover');
});
