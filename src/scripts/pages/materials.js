import 'styles/index.scss';
import 'styles/pages/materials.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/custom-select2.scss';
import 'styles/includes/navigations.scss';

import 'scripts/includes/header.js';
import 'scripts/includes/blur.js';
import $ from 'jquery';
import Rellax from "rellax";
import select2 from "select2";
import preloader from 'scripts/helpers/preloader';
import AOS from "aos";
import 'aos/dist/aos.css';

preloader();

$(function() {
    const rellax = new Rellax('.rellax');

     $('.custom-select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
    });

    $('.materials-grid__item').hide();
    $('.materials-grid__item').slice(0, 36).show();

    $('.show-btn').on("click", function(e){
        e.preventDefault();
        $('.materials-grid__item:hidden').slice(0, 6).slideDown();
        if($('.materials-grid__item:hidden').length == 0) {
            $('.show-btn').addClass('disabled');
        }
    });
});

AOS.init({
  startEvent: 'preloaded',
  duration: 800
});


