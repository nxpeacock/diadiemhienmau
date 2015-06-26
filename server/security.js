Security.defineMethod("ifIsManager", {
    fetch: [],
    transform: null,
    deny: function (type, arg, userId, doc) {
        var user = Meteor.users.findOne(userId);
        return !user.isManager();
    }
});

Locations.permit(['insert', 'update', 'remove']).ifIsManager().apply();
