$(function() {
  for (var i = 0; i < 10; i++) {
    $('.myContent').append($('<div class="App_v2"></div>'));
  }

  $('.App_v2')
  .mouseenter(function() {
    $(this).animate({width: '+=10px'});
  })
  .mouseleave(function() {
    $(this).animate({width: '-=10px'});
  })
  .click(function() {
    $(this).toggle(1000);
  });
});
