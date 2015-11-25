var app = angular.module("main", []);

app.controller("mainController", function ($scope, $http) {

    var apiUrl = "/api/contacts";

    function findContactById(id) {
        var result = {
            contact: null,
            index: null
        };

        for (var i = 0; i < $scope.contacts.length; i++) {
            if ($scope.contacts[i].Id === id) {
                result.contact = $scope.contacts[i];
                result.index = i;
                return result;
            }
        }
        return null;
    }

    // the column to sort by
    $scope.orderPredicate = "Id";

    // the sort direction
    $scope.orderReverse = false;

    $scope.order = function (predicate) {
        if ($scope.orderPredicate === predicate) {
            $scope.orderReverse = !$scope.orderReverse;
        } else {
            $scope.orderPredicate = predicate;
            $scope.orderReverse = false;
        }
    }

    // reload button
    $scope.reload = function () {
        $scope.loading = true;
        $scope.working = false;

        $http.get(apiUrl).then(function (successResponse) {
            $scope.contacts = successResponse.data;
            $scope.loading = false;
        }, function (errorResponse) {
            $scope.loading = false;
            alert("error loading data :( code: " + errorResponse.status);
        });
    }

    $scope.newValid = function () {
        return $scope.newEmail != null && $scope.newName != null;
    }

    // create new contact button
    $scope.onCreate = function () {
        var contact = {
            Name: $scope.newName,
            Email: $scope.newEmail
        };

        $scope.working = true;
        $http.put(apiUrl, contact).then(function (successResponse) {
            contact.Id = successResponse.data;
            $scope.contacts.push(contact);
            $scope.newName = null;
            $scope.newEmail = null;
            $scope.working = false;
        }, function (errorResponse) {
            $scope.working = false;
            alert("could not create contact :( code: " + errorResponse.status);
        });
    }

    // delete button - on the row
    $scope.delete = function (id) {
        var result = findContactById(id);
        if (!result)
            return;
        var consent = confirm("Are you sure you want to delete '" + result.contact.Name + "' (id: " + result.contact.Id + ") ?");
        if (!consent)
            return;

        $scope.working = true;
        $http.delete(apiUrl + "/" + result.contact.Id).then(function () {
            $scope.contacts.splice(result.index, 1);
            $scope.working = false;
        }, function (errorResponse) {
            $scope.working = false;
            alert("could not delete contact :( code: " + errorResponse.status);
        });
    }

    // edit button - on the row - enters edit mode
    $scope.edit = function (id) {
        var result = findContactById(id);
        if (!result)
            return;
        var contact = result.contact;
        contact.editing = true;
        contact.newName = contact.Name;
        contact.newEmail = contact.Email;
    }

    // undo edit button - on the row - while in edit mode
    $scope.undoEdit = function (id) {
        var result = findContactById(id);
        if (!result)
            return;
        var contact = result.contact;
        contact.editing = false;
        delete contact.newName;
        delete contact.newEmail;
    }

    // save button - on the row - while in edit mode
    $scope.applyEdit = function (id) {
        var result = findContactById(id);
        if (!result)
            return;
        var contact = result.contact;

        var dto = {
            Id: contact.Id,
            Name: contact.newName,
            Email: contact.newEmail
        };

        $scope.working = true;
        $http.post(apiUrl, dto).then(function () {
            contact.editing = false;
            contact.Name = contact.newName;
            contact.Email = contact.newEmail;
            $scope.working = false;
        }, function (errorResponse) {
            $scope.working = false;
            alert("could not apply edit to contact :( code: " + errorResponse.status);
        });
    }

    // loads data at startup
    $scope.reload();
});