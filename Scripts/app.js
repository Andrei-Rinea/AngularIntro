var app = angular.module('main', []);
app.controller('mainController', function ($http, $scope) {
    $scope.loading = true;
    $http.get('/api/contacts').then(function (response) {
        $scope.contacts = response.data;
        $scope.loading = false;
    }, function (error) {
        alert('could not get contacts :(');
        $scope.loading = false;
    });

    $scope.newName = null;
    $scope.newEmail = null;
    $scope.createNewContact = function () {
        if (!$scope.newName || !$scope.newEmail) {
            alert('Please enter a name and an email.');
            return;
        }
        var newContact = {
            Name: $scope.newName,
            Email: $scope.newEmail
        };
        $http.put('/api/contacts', newContact).then(function (response) {
            newContact.Id = response.data;
            $scope.contacts.push(newContact);
            $scope.newName = null;
            $scope.newEmail = null;
        }, function (error) {
            alert('could not create contact :(');
        });
    };
});