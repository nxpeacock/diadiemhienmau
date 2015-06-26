if(Meteor.isServer){
    Meteor.startup(function(){
        Meteor.Configs = EJSON.parse(Assets.getText('configs.json'));
        if(Meteor.users.find().count() === 0){
            var defaultAdmin = Meteor.Configs.default.adminUser;

            var userId = Accounts.createUser({
                username : defaultAdmin.username,
                email : defaultAdmin.email,
                password : defaultAdmin.password,
                profile : {
                    fullName : defaultAdmin.fullname
                }
            });

            Meteor.users.update({_id : userId},{
                $set :{
                    'emails.0.verified': true
                }
            });

            Roles.addUsersToRoles(userId, defaultAdmin.roles);
        }
    })
}