function CustomMap() {
    this.markers = [];
    this.isMapReady = false;
    this.map = null;
    this.isMapInitialized = false;
    this.listPoiDataBuffer = null;
    //initialize google map
    this.initMap = function () {
        var self = this;

        self.map = new google.maps.Map(document.getElementById('map'), {
            center: { lat: 40.7413549, lng: -73.9980244 },
            zoom: 13
        });
        self.isMapReady = true;
        if(this.listPoiDataBuffer!=null){
            this.listPois(this.listPoiDataBuffer);
        }


    };

    this.listPois = function (locations) {
        if (this.isMapReady) {
            console.log(JSON.stringify(locations));
            var largeInfowindow = new google.maps.InfoWindow();
            var bounds = new google.maps.LatLngBounds();

            console.log("markers:" + this.markers.length);
            if (this.markers.length > 0) {
                this.markers.forEach(function (v, i) {
                    v.setMap(null);
                });
                this.markers = [];
            }

            //uses location array to create an array of markers on initialize
            for (var i = 0; i < locations.length; i++) {

                console.log(i);
                //get the position from the location array
                var position = locations[i].location;
                var title = locations[i].title;

                //creating markers per location
                var marker = new google.maps.Marker({

                    position: position,
                    title: title,
                    animation: google.maps.Animation.DROP,
                    icon: "http://maps.google.com/mapfiles/ms/icons/red-dot.png",
                    id: i
                });
                function stopAnimation(marker) {
                    marker.setAnimation(null);
                    marker.setIcon('http://maps.google.com/mapfiles/ms/icons/blue-dot.png');
                }
                marker.addListener('click', function () {
                    zomatoService.getLocInfo(this.title);
                    if (this.getAnimation() !== null) {
                        this.setAnimation(null);
                    }
                    else {
                        this.setIcon('http://maps.google.com/mapfiles/ms/icons/green-dot.png');
                        this.setAnimation(google.maps.Animation.BOUNCE);
                        var marker = this;
                        // alert(JSON.stringify(marker));
                        populateInfoWindow(this, largeInfowindow);
                        setTimeout(stopAnimation.bind(this, marker), 2100);
                    }
                });

                //pushing the markers to the array
                this.markers.push(marker);
                //Extend the boundaries of the map for each marker
                bounds.extend(marker.position);

                //function to populate the info window
                function populateInfoWindow(marker, infowindow) {
                    //chk to see if info window is already open/not
                    if (infowindow.marker != marker) {
                        infowindow.marker = marker;
                        infowindow.setContent('<div>' + marker.title + '<br>' + marker.position + '<div>');
                        infowindow.open(map, marker);

                        infowindow.addListener('closeclick', function () {
                            //infowindow.setMarker = null;
                        });
                    }
                }
                for (var j = 0; j < this.markers.length; j++) {
                    this.markers[j].setMap(this.map);
                    bounds.extend(this.markers[j].position);
                }
                this.map.fitBounds(bounds);
            }
        } else {
            this.listPoiDataBuffer = locations;
        }
    }

}

var myMap = new CustomMap();


//myMap.initMap();
//myMap.listPois(pois);