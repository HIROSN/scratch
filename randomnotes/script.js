$(document).ready(function() {
  var startButton;
  var counterButton;
  var counter;
  var catCounter;

  var catUrl = 'http://images2.fanpop.com/images/photos/8400000/' +
    'cute-cats-cats-8477446-600-600.jpg';

  startButton = $('#start');
  counterButton = $('#counter');

  counter = function(count, element) {
    var update = function() {
      element.text(count + ' cats');
    };

    update();

    return {
      increment: function() {
        ++count;
        update();
      },

      getValue: function() {
        return count;
      },

      reset: function() {
        count = 0;
        update();
      }
    };
  }(5, counterButton);

  $('.button').mouseenter(function() {
    if (!$(this).hasClass('disabled')) {
      $(this).addClass('active');
    }
  });

  $('.button').mouseleave(function() {
    $(this).removeClass('active');
  });

  counterButton.click(function() {
    counter.increment();
  });

  counterButton.dblclick(function() {
    counter.reset();
  });

  catCounter = function(maxCats, msec, element) {
    var count = 0;
    var idTimer;

    if (count < maxCats) {
      idTimer = setInterval(function() {
        if (count++ < maxCats) {
          $('#cats').append('<img src="' + catUrl + '" class="cat"></div>');
        }

        if (count >= maxCats) {
          clearInterval(idTimer);
          element.removeClass('disabled');
        }
      }, msec);

      element.removeClass('active');
      element.addClass('disabled');
    }
  };

  startButton.click(function() {
    if (!$(this).hasClass('disabled')) {
      $('#cats > img').remove();
      catCounter(counter.getValue(), 2000, $(this));
    }
  });
});
