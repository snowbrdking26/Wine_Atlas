// console.log('testing')

// $(() => {


// });




// side nav menu  -----------------------
// https://www.w3schools.com/howto/howto_js_sidenav.asp

// function openNav() {
//     "use strict";
//     document.getElementById("mySidenav").style.width = "250px";
// }

// function closeNav() {
//     "use strict";
//     document.getElementById("mySidenav").style.width = "0";
// }

//end side nav  -----------------------


        // This sample uses the Place Autocomplete widget to allow the user to search
        // for and select a place. The sample then displays an info window containing
        // the place ID and other information about the place that the user has
        // selected.

        // This example requires the Places library. Include the libraries=places
        // parameter when you first load the API. For example:
        // <script src="https://maps.googleapis.com/maps/api/js?key=YOUR_API_KEY&libraries=places">

        function initMap() {
            var map = new google.maps.Map(document.getElementById('map'), {
                center: { lat: 44.9130, lng: 0.2440 },
                zoom: 8
            });

            var input = document.getElementById('pac-input');

            var autocomplete = new google.maps.places.Autocomplete(input);
            autocomplete.bindTo('bounds', map);

            map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);

            var infowindow = new google.maps.InfoWindow();
            var infowindowContent = document.getElementById('infowindow-content');
            infowindow.setContent(infowindowContent);
            var marker = new google.maps.Marker({
                map: map
            });
            marker.addListener('click', function () {
                infowindow.open(map, marker);
            });

            autocomplete.addListener('place_changed', function () {
                infowindow.close();
                var place = autocomplete.getPlace();
                if (!place.geometry) {
                    return;
                }

                if (place.geometry.viewport) {
                    map.fitBounds(place.geometry.viewport);
                } else {
                    map.setCenter(place.geometry.location);
                    map.setZoom(17);
                }

                // Set the position of the marker using the place ID and location.
                marker.setPlace({
                    placeId: place.place_id,
                    location: place.geometry.location
                });
                marker.setVisible(true);

                infowindowContent.children['place-name'].textContent = place.name;
                infowindowContent.children['place-id'].textContent = place.place_id;
                infowindowContent.children['place-address'].textContent =
                    place.formatted_address;
                infowindow.open(map, marker);
            });
        }
 
//  wine api info

// const getWineData = () => {
//     let variety = 
// }

// var keyNames = Wines.keys();
// for (var i in keyNames) {
//     console.log(i);
// }
// const wineData = wine.getElementById('name');
// for (var i in wineData) {
//     console.log(i)
   
// }
// 



