if(Meteor.isServer){
    Meteor.publish('locations',function(){
        return Locations.find();
    });

    Meteor.publish('locationById',function(id){
        return Locations.find({_id : id});
    });

    Meteor.publish('locationsByDay',function(fromDate,toDate){

    })
}