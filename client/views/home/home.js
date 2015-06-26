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
    })
}

function onLocationFound(e) {
    var radius = e.accuracy / 2;

    L.marker(e.latlng).addTo(map)
        .bindPopup("Bạn đang trong bán kính " + radius + " mét tại điểm này.").openPopup();

    L.circle(e.latlng, radius).addTo(map);
}

function onLocationError(e) {
    alert(e.message);
}