import 'styles/index.scss';
import 'styles/pages/partners.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/custom-select2.scss';

import 'scripts/includes/header.js';
import $ from "jquery";
import select2 from "select2";
import AOS from 'aos';
import 'aos/dist/aos.css';

import preloader from 'scripts/helpers/preloader';

preloader();

AOS.init({
  startEvent: 'preloaded',
  duration: 800
});
