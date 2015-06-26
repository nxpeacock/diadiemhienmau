function renderView() {
    renderAdminLayoutWith(this.name);
}

function renderAdminLayoutWith(view) {
    FlowLayout.render('adminLayout', {
        top : 'header',
        main: view
    });
}

if(Meteor.isClient){
    FlowLayout.setRoot('body');
}

FlowRouter.route('/',{
    name: 'home', action: function(){
        FlowLayout.render('mainLayout', {
            top : 'header',
            main: 'home'
        });
    }
});

var adminRoutes = FlowRouter.group({
    prefix: '/admin'
});

adminRoutes.route('/sign_in',{
    name : 'admin_login',
    action : function(params,query){
        FlowLayout.render('blankLayout',{main : 'admin_login'});
    }
})

adminRoutes.route('/',{
    name : 'admin_home',
    triggersEnter : [requireManager],
    subscriptions : function(params, query){
        this.register('myLocations',Meteor.subscribe('locations'));
    },
    action : renderView
});

locationsAdminRoutes = adminRoutes.group({
    prefix : '/locations'
});

locationsAdminRoutes.route('/create',{
    name : 'locations_create',
    action : renderView
})

function requireManager(){
    var redirectPath = (!Meteor.userId())? "/admin/sign_in" : '/admin';
    FlowRouter.go(redirectPath)
}