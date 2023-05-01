describe('NoteListController', function() {
    let $controller, $httpBackend, $rootScope;
  
    beforeEach(module('app'));
  
    beforeEach(inject(function(_$controller_, _$httpBackend_, _$rootScope_) {
      $controller = _$controller_;
      $httpBackend = _$httpBackend_;
      $rootScope = _$rootScope_;
    }));
  
    afterEach(function() {
      $httpBackend.verifyNoOutstandingExpectation();
      $httpBackend.verifyNoOutstandingRequest();
    });
  
    describe('$scope.addTodo', function() {
      it('should add a new todo item to $scope.todos', function() {
        const $scope = $rootScope.$new();
        const controller = $controller('NoteListController', { $scope: $scope });
  
        $httpBackend.expectPOST('https://jsonplaceholder.typicode.com/posts')
          .respond({ id: 1, title: 'New Todo', body: 'New Todo Body', completed: false });
  
        $scope.newTodoTitle = 'New Todo';
        $scope.newTodoBody = 'New Todo Body';
        $scope.addTodo();
        $httpBackend.flush();
  
        expect($scope.todos.length).toEqual(1);
        expect($scope.todos[0].title).toEqual('New Todo');
        expect($scope.todos[0].body).toEqual('New Todo Body');
        expect($scope.todos[0].completed).toEqual(false);
      });
    });
  
    describe('$scope.removeTodo', function() {
      it('should remove the selected todo item from $scope.todos', function() {
        const $scope = $rootScope.$new();
        const controller = $controller('NoteListController', { $scope: $scope });
        $scope.todos = [
          { id: 1, title: 'Todo 1', body: 'Todo 1 Body', completed: false },
          { id: 2, title: 'Todo 2', body: 'Todo 2 Body', completed: true },
          { id: 3, title: 'Todo 3', body: 'Todo 3 Body', completed: false }
        ];
  
        $httpBackend.expectDELETE('https://jsonplaceholder.typicode.com/posts/2')
          .respond('');
  
        $scope.removeTodo($scope.todos[1]);
        $httpBackend.flush();
  
        expect($scope.todos.length).toEqual(2);
        expect($scope.todos[0].id).toEqual(1);
        expect($scope.todos[1].id).toEqual(3);
      });
    });
  
    describe('$scope.editTodo', function() {
      it('should set $scope.editing to true and copy the selected todo item to $scope.editingTodo', function() {
        const $scope = $rootScope.$new();
        const controller = $controller('NoteListController', { $scope: $scope });
        $scope.todos = [
          { id: 1, title: 'Todo 1', body: 'Todo 1 Body', completed: false },
          { id: 2, title: 'Todo 2', body: 'Todo 2 Body', completed: true },
          { id: 3, title: 'Todo 3', body: 'Todo 3 Body', completed: false }
        ];
  
        $scope.editTodo($scope.todos[1]);
  
        expect($scope.editing).toEqual(true);
        expect($scope.editingTodo.id).toEqual(2);
        expect($scope.editingTodo.title).toEqual('Todo 2');
        expect($scope.editingTodo.body).toEqual('Todo 2 Body');
        expect($scope.editingTodo.completed).toEqual(true);
        expect($scope.todos[1].editing).toEqual(true);
      });
    });
  
    describe('$scope.cancelEditing', function() {
      it('should reset $scope.editing to false and $scope.editingTodo to null, and set the selected todo item\'s editing property to false', function() {
        const $scope = $rootScope.$new();
        const controller = $controller('NoteListController', { $scope: $scope });
        $scope.todos = [
          { id: 1, title: 'Todo 1', body: 'Todo 1 Body', completed: false },
          { id: 2, title: 'Todo 2', body: 'Todo 2 Body', completed: true },
          { id: 3, title: 'Todo 3', body: 'Todo 3 Body', completed: false }
        ];
        $scope.editing = true;
        $scope.editingTodo = { id: 2, title: 'Todo 2', body: 'Todo 2 Body', completed: true, editing: true };
        $scope.todos[1].editing = true;
  
        $scope.cancelEditing($scope.todos[1]);
  
        expect($scope.editing).toEqual(false);
        expect($scope.editingTodo).toEqual(null);
        expect($scope.todos[1].editing).toEqual(false);
      });
    });
  
    describe('$scope.updateTodo', function() {
      it('should update the selected todo item in $scope.todos with the edited values', function() {
        const $scope = $rootScope.$new();
        const controller = $controller('NoteListController', { $scope: $scope });
        $scope.todos = [
          { id: 1, title: 'Todo 1', body: 'Todo 1 Body', completed: false },
          { id: 2, title: 'Todo 2', body: 'Todo 2 Body', completed: true },
          { id: 3, title: 'Todo 3', body: 'Todo 3 Body', completed: false }
        ];
        $scope.editingTodo = { id: 2, title: 'Edited Todo 2', body: 'Edited Todo 2 Body', completed: false };
  
        $httpBackend.expectPUT('https://jsonplaceholder.typicode.com/posts/2', $scope.editingTodo)
          .respond({ id: 2, title: 'Edited Todo 2', body: 'Edited Todo 2 Body', completed: false });
  
        $scope.updateTodo();
        $httpBackend.flush();
  
        expect($scope.editing).toEqual(false);
        expect($scope.editingTodo).toEqual(null);
        expect($scope.todos[1].id).toEqual(2);
        expect($scope.todos[1].title).toEqual('Edited Todo 2');
        expect($scope.todos[1].body).toEqual('Edited Todo 2 Body');
        expect($scope.todos[1].completed).toEqual(false);
      });
    });
  
    describe('$scope.toggleDescription', function() {
      it('should toggle the showDescription property of the selected todo item', function() {
        const $scope = $rootScope.$new();
        const controller = $controller('NoteListController', { $scope: $scope });
        $scope.todos = [
          { id: 1, title: 'Todo 1', body: 'Todo 1 Body', completed: false, showDescription: false },
          { id: 2, title: 'Todo 2', body: 'Todo 2 Body', completed: true, showDescription: true },
          { id: 3, title: 'Todo 3', body: 'Todo 3 Body', completed: false, showDescription: false }
        ];
  
        $scope.toggleDescription($scope.todos[0]);
        expect($scope.todos[0].showDescription).toEqual(true);
  
        $scope.toggleDescription($scope.todos[1]);
        expect($scope.todos[1].showDescription).toEqual(false);
  
        $scope.toggleDescription($scope.todos[2]);
        expect($scope.todos[2].showDescription).toEqual(true);
      });
    });
  });