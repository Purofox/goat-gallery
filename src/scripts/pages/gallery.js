import 'styles/index.scss';
import 'styles/pages/gallery.scss';
import 'styles/includes/muuri-gallery.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/projects.scss';
import 'styles/includes/custom-select2.scss';
import 'styles/includes/navigations.scss';

import 'scripts/includes/header.js';
import preloader from 'scripts/helpers/preloader';
import $ from "jquery";
window.jQuery = $;
import select2 from "select2";
require ('@fancyapps/fancybox');
import AOS from 'aos';
import 'aos/dist/aos.css';
import Grid from 'muuri';

preloader();


const grid = new Grid('.masonry', {
    layout: {
        fillGaps: true
    }
});

$(function() {
     $('.custom-select').select2({
        minimumResultsForSearch: Infinity,
        width: 'auto'
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

    $('.masonry__item').hide();
    $('.masonry__item').slice(0, 13).show();

    $('.show-btn').on("click", function(e){
        e.preventDefault();
        $('.masonry__item:hidden').slice(0, 4).slideDown();
        if($('.masonry__item:hidden').length == 0) {
            $('.show-btn').addClass('disabled');
        }
    });

});

AOS.init({
  startEvent: 'preloaded',
  duration: 800
});


