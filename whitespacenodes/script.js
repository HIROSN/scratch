$(document).ready(function() {
  var parent = document.getElementById('list');
  var child = parent.firstChild;
  var name;

  while (child) {
    name = child.tagName || child.nodeName;

    switch (name) {
    case '#text':
      $('#nodes').append('<div class="text"></div>');
      break;
    case 'LI':
      $('#nodes').append('<div class="item"></div>');
      break;
    }

    child = child.nextSibling;
  }

  $(document.body).append('<p>' + navigator.userAgent + '</p');
});
