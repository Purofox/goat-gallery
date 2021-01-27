import 'styles/includes/house.scss'
import 'simplebar'; // or "import SimpleBar from 'simplebar';" if you want to use it manually.
import 'simplebar/dist/simplebar.css';

interface Point {
  x: number,
  y: number,
  text: string,
  node?: HTMLElement,
  reverse?: boolean
}

const points: Point[] = [
  {
    x: 611,
    y: 496,
    text: 'интерьер'
  },
  {
    x: 857,
    y: 661,
    text: 'фасады'
  }, {
    x: 1287,
    y: 698,
    text: 'натуральный камень'
  }, {
    x: 1100,
    y: 355,
    text: 'панорамные окна и двери'
  }, {
    x: 1421,
    y: 778,
    text: 'инженерные решения <br> и проектирование',
    reverse: true
  }
];

const loadedEvent = new Event('houseLoaded');
const initEvent = new Event('houseInitiated');
const wrapper = document.querySelector('.house-wrapper') as HTMLElement;
const pointsWrapper = wrapper.querySelector('.points-wrapper')
const videoWrapper = wrapper.querySelector('.house-video');
const houseDetail = wrapper.querySelector('.house-detail');
const houseDetailHeader = wrapper.querySelector('.house-detail__header');
const houseDetailTitle = houseDetail.querySelector('.house-detail__header-title');
const videos: NodeListOf<HTMLVideoElement> = videoWrapper.querySelectorAll('video.open-video');
const view = wrapper.querySelector('.house-view');
const viewImg = view.querySelectorAll('img');
const closeVideos: NodeListOf<HTMLVideoElement> = videoWrapper.querySelectorAll('video.close-video');
const houseDetailVideos: NodeListOf<HTMLVideoElement> = houseDetail.querySelectorAll('video');
const originalImageWidth = 1920;
const detailAnimationTime = 600;
const phoneMax = 767;
const isPhone = () => wrapper.offsetWidth <= phoneMax;

let houseDetailClose = houseDetail.querySelector('.close');
let selectedPoint;

let intro: HTMLVideoElement = videoWrapper.querySelector('.intro');

const preloadVideo = (v: HTMLVideoElement, onPreloader = false) =>
  new Promise(resolve => {
    fetch(v.dataset.src)
      .then(response => response.blob())
      .then(blob => {
        v.src = URL.createObjectURL(blob);
        if (onPreloader) {
          window.dispatchEvent(loadedEvent);
        }
        resolve();
      })
  });

const loadPoint = i => {
  if (i < points.length) {
    loadedVideos[i].push(preloadVideo(videos[i]));
    loadedVideos[i].push(preloadVideo(closeVideos[i]));
    loadedVideos[i].push(preloadVideo(houseDetailVideos[i]));
    Promise.all(loadedVideos[i]).then(_ => {
      points[i].node.classList.remove('loading');
      loadPoint(i + 1);
    });
  }
}


const setVideoSource = (resize = false) => {
  const setSrc = (item: HTMLVideoElement) => {
    if (!item) {
      return;
    }
    const xsSuffix = '-xs';
    const parts = item.dataset.src.split('/');
    const srcArr = parts[parts.length - 1].split('.');
    srcArr[0] = srcArr[0].replace(xsSuffix, '');
    srcArr.splice(0, 1, isPhone() ? srcArr[0] + xsSuffix : srcArr[0]);
    parts[parts.length - 1] = srcArr.join('.');
    item.dataset.src = parts.join('/');
  }
  closeVideos.forEach(setSrc);
  videos.forEach(setSrc);
  setSrc(intro);
  if (resize) {
    points.forEach(p => p.node && p.node.classList.add('loading'));
    loadPoint(0);
  }
};
setVideoSource();

const loadedVideos = new Array(videos.length).fill(0).map(_ => []);
preloadVideo(intro, true);

wrapper.classList.add('active');
intro.classList.add('active');

const setPreload = (item: HTMLVideoElement) => item.preload = 'none';
closeVideos.forEach(setPreload);
videos.forEach(setPreload);


const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg'); //Get svg element
const svgWidth = 8;
const svgHeight = 16;
svg.setAttribute('viewBox', `0 0 ${svgWidth} ${svgHeight}`);
svg.setAttribute('width', `${svgWidth}`);
svg.setAttribute('height', `${svgHeight}`);
svg.setAttribute('style', `height: ${svgHeight}px; width: ${svgWidth}px;`);
svg.setAttribute('role', 'presentation');
svg.setAttribute('aria-hidden', 'true');
svg.setAttribute('disabled', 'disabled');
svg.setAttribute('clickable', 'false');
svg.setAttribute('tabindex', '-1');
const newElement = document.createElementNS('http://www.w3.org/2000/svg', 'path');
newElement.setAttribute("d","M7.268 9.547L0 16l4-8-4-8 7.268 6.453C7.715 6.82 8 7.377 8 8c0 .623-.285 1.18-.732 1.547z");
svg.appendChild(newElement);


const house = () => {
  const init = () => {
    console.log('init');
    const scale = wrapper.offsetWidth / originalImageWidth;

    const resetVideo = (video: HTMLVideoElement) => video.currentTime = 0;

    videos.forEach(resetVideo);

    const movePoint = (point: HTMLElement, x, y) => point.setAttribute(
        'style',
        isPhone() ? '' : `transform: translate(${x * scale}px, ${y * scale}px)`)

    const playDetail = () => {
      if (!selectedPoint) {
        return;
      }
      const detailVideo: HTMLVideoElement = houseDetailVideos.item(selectedPoint);

      if (detailVideo.currentTime !== detailVideo.duration) {
        return;
      }

      resetVideo(detailVideo);
      detailVideo.play();
    }

    const openDetail = (i) => {
      if (selectedPoint) {
        return;
      }
      const video = videos.item(i);
      const closeVideo = closeVideos.item(i);
      const img = viewImg.item(i);
      const detailVideo = houseDetailVideos.item(i);
      resetVideo(closeVideo);
      resetVideo(detailVideo);
      points[i].node.classList.add('active');

      selectedPoint = i;
      video.play().then(_ => {
        wrapper.classList.add('active');
        video.classList.add('active');
      });

      houseDetailTitle.innerHTML = points[i].text;

      video.addEventListener('ended', _ => {
        img.classList.add('active');
        view.classList.add('active');
        houseDetail.classList.add('active');
        detailVideo.classList.add('active');
        setTimeout(_ => {
          detailVideo.play();
          detailVideo.addEventListener('click', playDetail);
        }, detailAnimationTime);
      }, {once: true});
    };

    const closeDetail = _ => {
      const video = videos.item(selectedPoint);
      const closeVideo = closeVideos.item(selectedPoint);
      const img = viewImg.item(selectedPoint);
      const detailVideo = houseDetailVideos.item(selectedPoint);
      houseDetail.classList.remove('active');
      video.classList.remove('active');
      setTimeout(_ => {
        closeVideo.classList.add('active');
        closeVideo.play();
        closeVideo.addEventListener('ended', _ => {
          points[selectedPoint].node.classList.remove('active');
          img.classList.remove('active');
          view.classList.remove('active');
          wrapper.classList.remove('active');
          closeVideo.classList.remove('active');
          detailVideo.classList.remove('active');
          detailVideo.removeEventListener('click', playDetail);
          resetVideo(video);
          selectedPoint = undefined;
        }, {once: true});
      }, detailAnimationTime);
    };
    const clone = houseDetailClose.cloneNode(true) as Element;
    houseDetailClose.remove();
    houseDetailClose = clone;
    houseDetailHeader.appendChild(houseDetailClose);
    houseDetailClose.addEventListener('click', closeDetail);

    if (intro) {
      intro.play();
    }

    points.forEach(({x, y, text, node}, i) => {
      const point = points[i];
     if (!node) {
        const pointNode = document.createElement('div');
        pointNode.classList.add('house-point');
        point.reverse && pointNode.classList.add('reverse');
        movePoint(pointNode, x, y);
        point.node = pointNode;

        const circleNode = document.createElement('div');
        circleNode.classList.add('house-point__circle');
        circleNode.appendChild(svg.cloneNode(true));
        pointNode.appendChild(circleNode);

        const textNode = document.createElement('div');
        textNode.classList.add('house-point__text');
        textNode.innerHTML = text;

        pointNode.appendChild(textNode);
        const spinner = new Image();
        spinner.src = 'src/media/index/house-detail/spinner.svg';
        spinner.classList.add('house-point__spinner');
        pointNode.appendChild(spinner);
        pointNode.classList.add('loading');
        pointsWrapper.appendChild(pointNode);
        pointNode.addEventListener('click', _ => openDetail(i));
      } else {
        movePoint(point.node, x, y);
      }
    })

    if (intro) {
      intro.addEventListener('ended', () => {
        if (!intro) {
          return;
        }
        wrapper.classList.remove('active');
        intro.classList.remove('active');
        intro = null;
        magnet('.house-point__circle');
        document.dispatchEvent(new CustomEvent("DOMContentLoaded"));
        document.dispatchEvent(initEvent);
      }, {once: true});
    } else {
      // we have to wait point's animation to get a final position of it.
      setTimeout(_ => magnet('.house-point__circle'), 1000);
    }
  }

  const initOnScroll = _ => {
    const gap = 200;
    const wrapperInitOffset = wrapper.offsetTop - gap;
    const endOfWrapper = wrapper.offsetTop + gap;
    if (window.pageYOffset >= wrapperInitOffset && window.pageYOffset <= endOfWrapper) {
      window.removeEventListener('scroll', initOnScroll);
      init();
      loadPoint(0);
    }
  };
  document.addEventListener("preloaded", _ => {
    window.addEventListener('scroll', initOnScroll, {passive: true})
    window.dispatchEvent(new CustomEvent("scroll"));
  });
  window.addEventListener("resize", _ => {
    debounceFunction(_ => {
      setVideoSource(true);
      init();
    }, 500);
  });

  return loadedEvent;
}

const magnet = (selector) => {
  const magnetDistance = 20;
  const elements = new Map();
  let xPos;
  let yPos;
  let activeBtn;

  let x;
  let y;
  let dx;
  let dy;

  const btns = document.querySelectorAll(selector);

  btns.forEach((btn) => {
    const enterBtn = _ => {
      activeBtn = btn;
      activeBtn.classList.add('active');
    }
    const leaveBtn = _ => {
      activeBtn.style.cssText = '';
      activeBtn.classList.remove('active');
      activeBtn = undefined;
    }
    btn.removeEventListener('mouseenter', enterBtn);
    btn.addEventListener('mouseenter', enterBtn);
    btn.removeEventListener('mouseleave', leaveBtn);
    btn.addEventListener('mouseleave', leaveBtn);

    let rect = (btn as HTMLElement).getBoundingClientRect();
    let x = window.pageXOffset || document.documentElement.scrollLeft;
    let y = window.pageYOffset || document.documentElement.scrollTop;

    elements.set(btn, {
      width: rect.width,
      height: rect.height,
      xMin: rect.left + x - magnetDistance,
      xMax: rect.left + x + rect.width + magnetDistance,
      yMin: rect.top + y - magnetDistance,
      yMax: rect.top + y + rect.height + magnetDistance,
    });
  });

  const setCords = e => {
    if (!activeBtn) return;

    xPos = e.pageX - (elements.get(activeBtn).xMin + magnetDistance + elements.get(activeBtn).width / 2);
    yPos = e.pageY - (elements.get(activeBtn).yMin + magnetDistance + elements.get(activeBtn).height / 2);
  }

  document.removeEventListener('mousemove', setCords);
  document.addEventListener('mousemove', setCords, {passive: true});


  const follow = () => {
    requestAnimationFrame(follow);
    if (!activeBtn ||
      xPos > magnetDistance || xPos < -magnetDistance ||
      yPos > magnetDistance || yPos < -magnetDistance) {
      x = undefined;
      y = undefined;
      dx = undefined;
      dy = undefined;
      return;
    }

    if(!x || !y) {
      x = xPos;
      y = yPos;
    } else {
      dx = (xPos - x) * 0.1;
      dy = (yPos - y) * 0.1;
      if(Math.abs(dx) + Math.abs(dy) < 0.1) {
        x = xPos;
        y = yPos;
      } else {
        x += dx;
        y += dy;
      }
    }
    activeBtn.setAttribute("style", `transform: translate(${x}px, ${y}px)`);
  }
  requestAnimationFrame(follow);
};

let timerId;
const  debounceFunction  =  function (func, delay) {
  clearTimeout(timerId)
  timerId  =  setTimeout(func, delay)
}

export default house;
