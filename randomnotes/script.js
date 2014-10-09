$(document).ready(function() {
  var catUrl = 'http://images2.fanpop.com/images/photos/8400000/' +
    'cute-cats-cats-8477446-600-600.jpg';

  var catCounter = function(maxCats) {
    var count = 0;
    var idTimer = setInterval(function() {
      if (count++ < maxCats) {
        $('#cats').append('<img src="' + catUrl + '" class="cat"></div>');
      }
      else {
        clearInterval(idTimer);
      }
    }, 2000);
  };

  catCounter(5);
});
