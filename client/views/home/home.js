
Template.home.onCreated(function(){
    currentLocation = new ReactiveVar({});
    mapView = new ReactiveVar({});
    availableLocations = new ReactiveVar([]);
    this.autorun(function(c){
        if(FlowRouter.subsReady('myLocations') && mapView.get()){
            var myLocations = Locations.find().fetch(),
                map = mapView.get(),
                available = []
            _.each(myLocations,function(l){
                var popup = _.template('<b><%=name%></b></br><%=description%>')
                var LatLng = _.map(l.LatLng.split(','),function(i){ return parseFloat(i)}),
                    marker = L.marker(LatLng).addTo(map).bindPopup(popup({name : l.name, description : l.description})),
                    circle = L.circle(LatLng, l.radius).addTo(map);
                    available.push({
                        marker : marker,
                        circle : circle
                    });
            })
            availableLocations.set(available);
        }
    })
})

Template.home.rendered = function(){
    $(document).ready(function(){
        L.Icon.Default.imagePath = '/packages/bevanhunt_leaflet/images';
        var osmUrl='http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        var osmCredit='Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        var osm = new L.TileLayer(osmUrl, {attribution: osmCredit});

        map = L.map('map')
            .addLayer(osm)
            .setView([21.034, 105.853], 10);

        var sidebar = L.control.sidebar('sidebar').addTo(map);

        var helloPopup = L.popup().setContent('Hello World!');

        L.easyButton('fa-compass', function(btn, map){
            map.locate({setView: true, maxZoom: 17});
        }).addTo(map);

        map.on('locationfound', onLocationFound);
        map.on('locationerror', onLocationError);

        L.easyButton('fa-refresh', function(btn, map){
            location.reload();
        }).addTo(map);

        mapView.set(map);
    })
}

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    var current = currentLocation.get();
    if(_.has(current,'marker') && _.has(current,'circle')){
        map.removeLayer(current.marker);
        map.removeLayer(current.circle);
    }
    var marker = L.marker(e.latlng).addTo(map).bindPopup("Bạn đang trong bán kính " + radius + " mét tại điểm này.").openPopup(),
        circle = L.circle(e.latlng, radius).addTo(map);


    currentLocation.set({
        marker : marker,
        circle : circle
    });
}

function onLocationError(e) {
    alert(e.message);
}