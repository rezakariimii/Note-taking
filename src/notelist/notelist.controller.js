(function () {
  "use strict";
  
  angular.module("app").controller("TodoCtrl", NoteListController);

  NoteListController.$inject = ["$scope", "$http"];

  function NoteListController($scope, $http) {
    $scope.todos = [];
    $scope.loading = true;
    const pathUrl = "https://jsonplaceholder.typicode.com/posts"

    function initializeTodos() {
      $http.get(pathUrl)
        .then(function (response) {
          $scope.todos = response.data.map(function (item) {
            item.showDescription = false;
            item.editing = false;
            return item;
          });
          $scope.loading = false;
        });
    }

    function addTodo() {
      if (!$scope.newTodoTitle || !$scope.newTodoBody) {
        $scope.showError = true;
      } else {
        $http.post(pathUrl, {
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
      }
    }

    function removeTodo(todo) {
      $http.delete(`https://jsonplaceholder.typicode.com/posts/${todo.id}`)
        .then(function (response) {
          const index = $scope.todos.indexOf(todo);
          $scope.todos.splice(index, 1);
        });
    }

    function editTodo(todo) {
      $scope.editing = true;
      $scope.editingTodo = angular.copy(todo);
      $scope.editingTodo.editing = true;
    }

    function cancelEditing(todo) {
      $scope.editing = false;
      $scope.editingTodo = null;
      todo.editing = false;
    }

    function updateTodo() {
      $http.put(`https://jsonplaceholder.typicode.com/posts/${$scope.editingTodo.id}`, $scope.editingTodo)
        .then(function (response) {
          const index = $scope.todos.findIndex((todo) => todo.id === response.data.id);
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
    }

    function toggleDescription(todo) {
      todo.showDescription = !todo.showDescription;
    }

    // Initialize the todos when the controller is loaded
    initializeTodos();

    // Add functions to the scope
    $scope.addTodo = addTodo;
    $scope.removeTodo = removeTodo;
    $scope.editTodo = editTodo;
    $scope.cancelEditing = cancelEditing;
    $scope.updateTodo = updateTodo;
    $scope.toggleDescription = toggleDescription;
  }
})();