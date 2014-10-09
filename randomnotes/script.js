$(document).ready(function() {

  // All buttons
  $('.button').mouseenter(function() {
    if (!$(this).hasClass('disabled')) {
      $(this).addClass('active');
    }
  });

  $('.button').mouseleave(function() {
    $(this).removeClass('active');
  });

  // Cat Counter
  (function() {
    var startButton;
    var counterButton;
    var counter;
    var catCounter;
    var fade;

    var catUrl = 'http://images2.fanpop.com/images/photos/8400000/' +
      'cute-cats-cats-8477446-600-600.jpg';

    startButton = $('#start');
    counterButton = $('#counter');

    /*
    class Counter {
    public:
      Counter(int c, Element e);
      void increment();
      int getValue();
      void reset();
    private:
      void update();
    private:
      int count;
      Element element;
    };

    Counter counter(5, counterButton);
    */
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

    counterButton.click(function() {
      counter.increment();
    });

    counterButton.dblclick(function() {
      counter.reset();
    });

    /*
    setInterval callback function has access to idTimer for free. Lifetime of
    idTimer is until it is cleared and even after this function returns.
    */
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

    fade = function(element) {
      var level = 1;
      var step = function() {
        var hex = level.toString(16);
        element.css('background-color', '#' + hex + hex + 'FFFF');

        if (level < 15) {
          level += 1;
          setTimeout(step, 100);
        }
        else {
          element.removeAttr('style');
        }
      };

      setTimeout(step, 100);
    };

    startButton.click(function() {
      if (!$(this).hasClass('disabled')) {
        $('#cats > img').remove();
        catCounter(counter.getValue(), 2000, $(this));
        fade($(this));
      }
    });
  }());
});
