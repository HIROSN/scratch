(function() {
  angular.module('todoApp', ['ngResource'])
    .controller('todoCtrl', todoController);

  function todoController($http) {
    var vm = this;
    var api = 'http://localhost:5000/cors/todos/';

    var getNextUrl = function() {
      $http.get(api)
      .then(function(res) {
        for (var i = 0; i < res.data.length; i++) {
          if (!res.data[i].completed && res.data[i].title != vm.todo.title) {
            vm.todo = res.data[i];
            break;
          }
        }
      });
    };

    vm.navigate = function(url) {
      chrome.tabs.create({'url': 'http://' + url});
    };

    vm.result = function() {
      var id = vm.todo.id;
      getNextUrl();
      $http.put(api + id);
    };

    vm.todo = {title: '(No URL)'};
    getNextUrl();
  }
})();
