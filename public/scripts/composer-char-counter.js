$(document).ready(function() {

  $('#textarea').on("keyup", function() {
    let textLimit = 140;
    let remainingChar = textLimit - ($(this).val()).length;
    let counter = $(this).siblings('.counter');

    if (remainingChar < 0) {
      counter.html(remainingChar).addClass('red-color'); // adding another class with color red to overwrite the original test color
    } else {
      counter.html(remainingChar).removeClass('red-color');
    }
  })

});