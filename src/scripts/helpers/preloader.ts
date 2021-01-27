import 'styles/helpers/preloader.scss';

const preloader = (event?: Event, callback?: () => void) => {
  const getTime = (selector: string) => parseFloat(getComputedStyle(document.documentElement)
    .getPropertyValue(selector)) * 1000;
  const preloader = document.querySelector('.preloader');
  let canClose = Promise.resolve(true);

  if (event) {
    canClose = new Promise(resolve =>
      window.addEventListener(event.type, _ => resolve(), {once: true}))
  }

  const close = () => {
    document.body.classList.add('loaded__hiding');
    document.dispatchEvent(new CustomEvent("preloaded"));
    callback && callback();
    setTimeout(_ => {
      document.body.classList.remove('loaded__hiding');
      document.body.classList.remove('loading');
      document.body.classList.add('page-loaded');
      document.body.removeChild(preloader);
    }, getTime('--preloader-animate'));
  }

  window.onload = () => canClose.then(_ => close());
}

export default preloader;

