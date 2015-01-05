$(function() {
  var $myContent = $('.myContent');
  var $myColumns = $('#myColumns');
  var $showColumn = $('#showColumn');
  var $numContents = $('#numContents');

  var showHideColumn = function() {
    if ($showColumn.is(':checked')) {
      $myColumns.removeClass('hidden');
    }
    else {
      $myColumns.addClass('hidden');
    }
  }

  var showContents = function() {
    $('.myContent div').remove();

    for (var i = 0; i < +$numContents.val(); i++) {
      $myContent.append($('<div class="App_v2"></div>'));
    }
  }

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
