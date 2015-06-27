Template.admin_home.rendered = function(){
    document.title = 'Quản trị hệ thống | Địa điểm hiến máu theo ngày'
}

Template.admin_home.helpers({
    myLocations : function(){
        return Locations.find().fetch()
    },
    settings: function () {
        return {
            collection: Locations.find().fetch(),
            rowsPerPage: 10,
            showFilter: true,
            fields: ['name', 'description', 'LatLng']
        };
    }
})
