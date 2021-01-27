import 'styles/index.scss';
import 'styles/pages/mining.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/custom-select2.scss';
import 'styles/includes/navigations.scss';
import 'styles/includes/header-animate.scss';

import 'scripts/includes/header.js';
import $ from "jquery";
import select2 from "select2";
import AOS from 'aos';
import 'aos/dist/aos.css';

import preloader from 'scripts/helpers/preloader';

preloader();

$(function() {

     $('.custom-select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
    });
});

AOS.init({
  startEvent: 'preloaded',
  duration: 800
});


window.addEventListener('scroll', function() {
    if ($('.mining-row').length) {

        $('.mining-row').each(function () {
            let el = $(this);
            let markerTop = $(this).offset().top;

            if(window.pageYOffset >=markerTop - 200) {
                el.addClass('animate');
            } else {
                el.removeClass('animate');
            }
        });
    }
});
