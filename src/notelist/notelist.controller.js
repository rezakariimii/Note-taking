(function () {
  "use strict";
  
  angular.module("app").controller("TodoCtrl", NoteListController);
  NoteListController.$inject = ["$scope", "$http"];

  function NoteListController($scope, $http) {
    $scope.todos = [];

    $http
      .get("https://jsonplaceholder.typicode.com/posts")
      .then(function (response) {
        $scope.todos = response.data.map(function (item) {
          item.showDescription = false;
          item.editing = false;
          return item;
        });
      });

    $scope.addTodo = function () {
      $http
        .post("https://jsonplaceholder.typicode.com/posts", {
          title: $scope.newTodoTitle,
          body: $scope.newTodoBody,
          completed: false,
        })
        .then(function (response) {
          const newTodo = {
            id: response.data.id,
            userId: response.data.userId,
            title: response.data.title,
            body: response.data.body,
            showDescription: false,
            editing: false,
          };
          $scope.todos.push(newTodo);
          $scope.newTodoTitle = "";
          $scope.newTodoBody = "";
        });
    };

    $scope.removeTodo = function (todo) {
      $http
        .delete("https://jsonplaceholder.typicode.com/posts/" + todo.id)
        .then(function (response) {
          const index = $scope.todos.indexOf(todo);
          $scope.todos.splice(index, 1);
        });
    };

    $scope.editTodo = function (todo) {
      $scope.editing = true;
      $scope.editingTodo = angular.copy(todo);
      $scope.editingTodo.editing = true;
    };

    $scope.cancelEditing = function (todo) {
      $scope.editing = false;
      $scope.editingTodo = null;
      todo.editing = false;
    };

    $scope.updateTodo = function () {
      $http
        .put(
          "https://jsonplaceholder.typicode.com/posts/" + $scope.editingTodo.id,
          $scope.editingTodo
        )
        .then(function (response) {
          const index = $scope.todos.findIndex(
            (todo) => todo.id === response.data.id
          );
          const updatedTodo = {
            id: response.data.id,
            userId: response.data.userId,
            title: response.data.title,
            body: response.data.body,
            showDescription: $scope.todos[index].showDescription,
            editing: false,
          };
          $scope.todos[index] = updatedTodo;
          $scope.editing = false;
          $scope.editingTodo = null;
        });
    };

    $scope.toggleDescription = function (todo) {
      todo.showDescription = !todo.showDescription;
    };
  }
})();