Template.admin_login.rendered = function(){
    document.title = 'Đăng nhập quản trị | Địa điểm hiến máu theo ngày'
}

Template.admin_login.events({
    'click #btnLogin' : function(e,t){
        e.preventDefault();
        var username = $('#login-username').val() || '',
            password = $('#login-password').val() || '';
        if(!_.isEmpty(username) && !_.isEmpty(password)){
            Meteor.loginWithPassword(username,password,function(err){
                if(err){
                    console.log('Error : ',err);
                }else{
                    FlowRouter.go('/admin/');
                }
            })
        }
    }
})