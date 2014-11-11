$(function() {
  var token;

  var api = function(type, path, data) {
    var dfd = $.Deferred();
    var url = '/' + path;

    $.ajax({
      type: type,
      url: url,
      data: data && JSON.stringify(data),
      contentType: data && 'application/json; charset=utf-8',
      dataType: 'json',
      success: dfd.resolve,
      error: dfd.reject
    });

    return dfd.promise();
  };

  $('#get').on('click', function() {
    api('POST', 'user/' + $('#user').text(),
      {password: $('#password').val()}).then(function(results) {
      if (results) {
        token = results.token;

        $('#msg').html(
          '<p>Token: ' + results.token.split('.')[0] +
          '...</p><p>Expires: ' + new Date(results.expires) +
          '</p>');
      }
    });
  });

  $('#access').on('click', function() {
    api('POST', 'jwt', {accessToken: token}).then(function(results) {
      if (results) {
        $('#msg').text('Access granted for ' + results.username);
      }
    });
  });
});
