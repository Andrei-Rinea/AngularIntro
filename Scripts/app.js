var app = angular.module('main', []);
app.controller('mainController', function ($http, $scope) {
    $scope.sortPredicate = "Id";
    $scope.sortReversed = true;

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

    function getContactById(id) {
        var contacts = $scope.contacts;
        for (var i = 0; i < contacts.length; i++) {
            var contact = contacts[i];
            if (contact.Id === id)
                return contact;
        }
        return null;
    }

    $scope.delete = function (id) {
        var contact = getContactById(id);
        if (contact == null)
            return;

        var consent = confirm('Are you sure you want to delete "' + contact.Name + '"?');
        if (!consent)
            return;

        $http.delete('/api/contacts/' + id).then(function () {
            var index = $scope.contacts.indexOf(contact);
            $scope.contacts.splice(index, 1);
        }, function () {
            alert('could not delete contact :(');
        });
    };

    $scope.order = function (predicate) {
        if ($scope.sortPredicate === predicate) {
            $scope.sortReversed = !$scope.sortReversed;
        } else {
            $scope.sortPredicate = predicate;
            $scope.sortReversed = false;
        }
    };

    $scope.edit = function (id) {
        var contact = getContactById(id);
        if (contact == null)
            return;

        contact.NewName = contact.Name;
        contact.NewEmail = contact.Email;
        contact.Editing = true;
    }

    $scope.undoEdit = function (id) {
        var contact = getContactById(id);
        if (contact == null)
            return;

        contact.Editing = false;
    }

    $scope.applyEdit = function (id) {
        var contact = getContactById(id);
        if (contact == null)
            return;

        if (!contact.NewName || !contact.NewEmail) {
            alert('please enter a name and an email');
            return;
        }

        var dto = {
            Id: contact.Id,
            Name: contact.NewName,
            Email: contact.NewEmail
        };

        $http.post('/api/contacts', dto).then(function () {
            contact.Name = contact.NewName;
            contact.Email = contact.NewEmail;
            contact.Editing = false;
        }, function () {
            alert('could not save changes :(');
        });
    }
});