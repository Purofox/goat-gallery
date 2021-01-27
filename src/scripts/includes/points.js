import 'styles/includes/points.scss';
import $ from "jquery";

$('.point').click(function () {
  $(this).find('.tooltip').fadeIn();
  $('.point').not(this).find('.tooltip').fadeOut();
});

$('.points-list__item').click(function () {
  $('body').addClass('open-modal');
  let id = $(this).attr('data-id');
  $('.point-modal[data-id="'+ id +'"]').removeClass('animate__fadeOut').addClass('animate__fadeIn').show();
});

$(document).click( function(e){
    if ( $(e.target).closest('.point').length ) {
        return;
    }

    $('.tooltip').fadeOut();
});
