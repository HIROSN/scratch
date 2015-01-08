$(function() {
  var $myPageWrapper = $('#myPageWrapper');
  var $myColumns = $('#myColumns');
  var $myContent = $('.myContent');

  var $showColumn = $('#showColumn');
  var $numContents = $('#numContents');

  var $showAnimation = $('#showAnimation');
  var $numAnimations = $('#numAnimations');

  var $fixed = $('#fixed');
  var $headerImage = $('#header-image img');

  var showHideColumn = function() {
    if ($showColumn.is(':checked')) {
      $myColumns.removeClass('hidden');
    }
    else {
      $myColumns.addClass('hidden');
    }
  };

  var showContents = function() {
    $('.myContent div').remove();

    for (var i = 0; i < +$numContents.val(); i++) {
      $myContent.append($('<div class="App_v2"></div>'));
    }
  };

  var showAnimation = function() {
    for (var i = 0; i < +$numAnimations.val(); i++) {
      $myPageWrapper.append($('<div class="animated tada">tada</div>'));
    }
  };

  var removeAnimation = function() {
    $('#myPageWrapper .animated').remove();
  };

  $showColumn.on('click', function() {
    showHideColumn();
  });

  $numContents.on('keyup', function(event) {
    if (13 === event.which) {
      $(this).blur();
    }
  });

  $numContents.on('blur', function() {
    showContents();
  });

  $showAnimation.on('click', function() {
    if ($showAnimation.is(':checked')) {
      showAnimation();
    }
    else {
      removeAnimation();
    }
  });

  $numAnimations.on('keyup', function(event) {
    if (13 === event.which) {
      $(this).blur();
    }
  });

  $numAnimations.on('blur', function() {
    removeAnimation();
    showAnimation();
  });

  $fixed.on('click', function() {
    if ($fixed.is(':checked')) {
      $headerImage.css('background-attachment', 'fixed');
    }
    else {
      $headerImage.css('background-attachment', 'scroll');
    }
  });

  $myContent.on('mouseenter', '.App_v2', function() {
    $(this).animate({width: '+=10px'});
  })
  .on('mouseleave', '.App_v2', function() {
    $(this).animate({width: '-=10px'});
  })
  .on('click', '.App_v2', function() {
    $(this).toggle(1000);
  });

  showHideColumn();
  showContents();
});
