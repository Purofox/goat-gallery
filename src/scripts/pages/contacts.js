import 'styles/index.scss';
import 'styles/pages/contacts.scss';
import 'styles/includes/footer.scss';
import 'styles/includes/modals.scss';
import 'styles/includes/custom-select2.scss';
import 'styles/includes/header-animate.scss';

import 'scripts/includes/header.js';
import preloader from 'scripts/helpers/preloader';
import AOS from 'aos';
import 'aos/dist/aos.css';

preloader();

AOS.init({
  startEvent: 'preloaded',
  duration: 800
});
