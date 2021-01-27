import $ from 'jquery';
import 'styles/includes/header.scss';

let desktopDevice = true;

if (/Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(navigator.userAgent)) {
    desktopDevice = false;
}

$(function() {
    $('.modal-menu-btn').click(function(){
      document.body.classList.add('open-modal');
      $(".modal-menu").removeClass('animate__fadeOut').addClass('open-menu animate__fadeIn');
    });

    $('.close').click(function(){
        $('body').removeClass('open-modal');
        $('.point-modal').removeClass('animate__fadeIn').addClass('animate__fadeOut');
        $('.modal-menu').removeClass('animate__fadeIn').addClass('animate__fadeOut');
        setTimeout(function() {
            $('.modal-menu').removeClass('open-menu');
            $('.point-modal').hide();
        }, 600);
    });
});

window.addEventListener('scroll', function() {
    const header = document.querySelector('.header');
    if (window.pageYOffset > 0) {
        header.classList.add('sticky');
    } else {
        header.classList.remove('sticky');
    }

    if ($('.flag').length) {
        let flagTop = document.querySelector('.flag').offsetTop;

        if(window.pageYOffset >= flagTop - 150 && desktopDevice) {
            document.querySelector('.flag').classList.add('animate');
        } else {
            document.querySelector('.flag').classList.remove('animate');
        };
    }

     if ($('.marker').length) {

        $('.marker').each(function () {
            let el = $(this);
            let markerTop = $(this).offset().top;

            if(window.pageYOffset >=markerTop - 200) {
                el.addClass('animate');
            } else {
                el.removeClass('animate');
            }
        });
    }
});
