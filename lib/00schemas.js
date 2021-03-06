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
        type : String,
        label : 'Tên địa điểm'
    },
    description : {
        type : String,
        label : 'Chi tiết thời gian & địa chỉ',
        autoform: {
            afFieldInput: {
                type: 'summernote',
                class: 'editor',
                settings: {
                    height: 150,
                    toolbar : [
                        ['style', ['bold', 'italic', 'underline', 'clear']]
                    ]
                }
            }
        }
    },
    LatLng : {
        type : String,
        label : 'Tọa độ',
        optional: true
    },
    radius : {
        type : Number,
        label : 'Độ phủ',
        optional: true
    },
    fromTime : {
        type : Date,
        optional: true
    },
    toTime:{
        type : Date,
        optional: true
    }
    ,
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

Locations.attachSchema(Schemas.Location);