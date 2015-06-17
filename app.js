var app = angular.module('app', ['ngRoute']);

// ------------------------USERS------------------------ //

app.controller('UsersController', function ($scope, UsersFactory) {
  $scope.users = UsersFactory.get_users(function (res) {
    $scope.users = res;
  });

  $scope.add_user = function () {
    UsersFactory.add_user($scope.new_user, function (users) {
      $scope.users = users;
    });
    $scope.new_user = {};
  };
});

app.factory('UsersFactory', function ($http) {
  var factory = {};
  var users = [];

  factory.get_users = function (callback) {
    $http.get('http://localhost:3000/users').success(function (res) {
      users = res;
      callback(users);
    });
  };

  factory.add_user = function (callback) {
    $http({
      method: 'POST',
      url: 'http://localhost:3000/users',
      params: new_user,
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' }
    }).success(function (res) {
      users = res;
      callback(users);
    });
  };

  return factory;
});

