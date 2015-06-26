Users = Meteor.users;

Users.helpers({
    isManager : function(){
        return Roles.userIsInRole(this._id, ['admin','moderator'])
    },
    isAdmin : function(){
        return Roles.userIsInRole(this._id, ['admin'])
    }
});

var Schemas = {};

Locations = new Meteor.Collection('locations');

Schemas.Location = new SimpleSchema({
    name : {
        type : String
    },
    description : {
        type : String,
        optional : true
    },
    LatLng : {
        type : String
    },
    radius : {
        type : Number,
        defaultValue : function(){
            return 200;
        }
    },

    updatedAt : {
        type : Date,
        autoValue : function(){
            return new Date;
        }
    },
    updatedBy : {
        type : String,
        autoValue : function(){
            return Meteor.userId();
        }
    }
});

