

const cursor = () => {
  const cursor = document.body.querySelector('.cursor') as HTMLElement;
  const rzCursor = document.body.querySelector('.rz-cursor') as HTMLElement;
  const halfCursorWidth = cursor.offsetWidth / 2;
  const halfRzWidth = rzCursor.offsetWidth / 2

  document.querySelectorAll('[data-black-cursor]').forEach(item => {
    item.addEventListener('mouseenter', _ => {
      cursor.classList.add('black');
      rzCursor.classList.add('black');
    });
    item.addEventListener('mouseleave', _ => {
      cursor.classList.remove('black');
      rzCursor.classList.remove('black');
    });
  });

  document.querySelectorAll('[data-chevron-cursor]').forEach(item => {
    item.addEventListener('mouseenter', _ => {
      cursor.classList.add('cursor__chevron');
    });
    item.addEventListener('mouseleave', _ => {
      cursor.classList.remove('cursor__chevron');
    });
  });

  document.querySelectorAll('[data-cross-cursor]').forEach(item => {
    item.addEventListener('mouseenter', _ => {
      cursor.classList.add('cursor__cross');
    });
    item.addEventListener('mouseleave', _ => {
      cursor.classList.remove('cursor__cross');
    });
  });

  let xCursor;
  let yCursor;
  let xCircle;
  let yCircle;

  document.addEventListener('mousemove', e => {
    xCursor = e.clientX - halfCursorWidth;
    yCursor = e.clientY - halfCursorWidth;
    xCircle = e.clientX - halfRzWidth;
    yCircle = e.clientY - halfRzWidth;
  }, {passive: true});

  let x;
  let y;
  let dx;
  let dy;

  const follow = () => {
    requestAnimationFrame(follow);
    if(!x || !y) {
      x = xCircle;
      y = yCircle;
    } else {
      dx = (xCircle - x) * 0.3;
      dy = (yCircle - y) * 0.3;
      if(Math.abs(dx) + Math.abs(dy) < 0.1) {
        x = xCircle;
        y = yCircle;
      } else {
        x += dx;
        y += dy;
      }
    }
    cursor.setAttribute("style", `left: ${xCursor}px; top: ${yCursor}px`);
    rzCursor.setAttribute("style", `left: ${x}px; top: ${y}px`);
  }
  requestAnimationFrame(follow);
}

export default cursor;
