angular.module('puzzle-resources').factory('User', function() {
    return new UserStorage();
});

function UserStorage() {
    this.get = function() {
        return this.user;
    };
    this.set = function(user) {
        this.user = user;
    };
}