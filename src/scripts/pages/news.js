import 'styles/index.scss';
import 'styles/pages/news.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/custom-select2.scss';
import 'styles/includes/navigations.scss';

import 'scripts/includes/header.js';

import preloader from 'scripts/helpers/preloader';
import $ from "jquery";
import select2 from "select2";
import AOS from 'aos';
import 'aos/dist/aos.css';

preloader();

$('.custom-select').select2({
    minimumResultsForSearch: Infinity,
    width: 'auto'
});

AOS.init({
  startEvent: 'preloaded',
  duration: 800
});

