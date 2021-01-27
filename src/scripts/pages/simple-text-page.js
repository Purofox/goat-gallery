import 'styles/index.scss';
import 'styles/pages/simple-text-page.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/header-animate.scss';

import 'scripts/includes/header.js';

import AOS from 'aos';
import 'aos/dist/aos.css';
import preloader from 'scripts/helpers/preloader';

preloader();

AOS.init({
  startEvent: 'preloaded',
  duration: 800
});
