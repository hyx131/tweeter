$(document).ready(function() {

  $('.new-tweet').hide();

  $('.arrow-img').click(function() {
    $('.new-tweet').slideToggle();
  });

  $('.alert').hide();




  /**************** Second Toggle: To Top Button ***************/

  $(window).scroll(function() {
    if ($(this).scrollTop() > 500) {
        $('.to-top').fadeIn();
    } else {
        $('.to-top').hide();
    }
  }).trigger('scroll');

  $('.to-top').click(function() {
    $("html, body").animate({scrollTop: 0 }, 1000);
    $('.new-tweet').slideDown();
  });

});



