import 'styles/includes/blur.scss';

let zoomImage = document.querySelectorAll('.zoom-image');
let zoomCoefficient = window.innerWidth * 4;

let update = function () {
	window.requestAnimationFrame(update);

	let yPos = window.pageYOffset / zoomCoefficient;
	yPos = -yPos;

	let zoomDepth = 1.3 + yPos;
	let zoomY = yPos;
	let zoomBlur = window.pageYOffset / 400;

	for( let i = 0; i < zoomImage.length; i++){
		let img = zoomImage[i];

		if(window.pageYOffset <= img.offsetHeight) {
			img.style.cssText = 'transform: scale(' + zoomDepth + ') translateY(' + zoomY + 'px); filter: blur(' + zoomBlur + 'px)';
		}
	}
};


update();
