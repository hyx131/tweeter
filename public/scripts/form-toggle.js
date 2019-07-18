$(document).ready(function() {

  /**************** Hide Create-Tweet && Alert Section Upon Page Load ***************/

  $('.new-tweet').hide();
  $('.alert').hide();


  /**************** First Toggle: Show/hide Create-Tweet Button ***************/

  $('.arrow-img').click(function() {
    $('.new-tweet').slideToggle();
    $('textarea').focus();
  });


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
    $('textarea').focus();
  });

});



