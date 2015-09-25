
//
// Model
//

var airportMarker, contentStr, infowindow, initialLocations, map, viewModel;

// START initMap() which initializes Google Maps API map object
function initMap() {
	var mapOptions = {
        center: {lat: 25.2048, lng: 55.2708},
        zoom: 12,
        panControl: false,
        streetViewControl: false,
        zoomControl: false,
        mapTypeControl: false,
        styles: [
            // Hides the default clickable location icons on the map.
            {
                elementType: 'labels.icon',
                stylers: [{ visibility: 'off' }]
            }
        ]
    };

	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	infowindow = new google.maps.InfoWindow({content: contentStr});

	// All the locations that will be put on the map
	initialLocations  = [
    new Location('JW Marriott Marquis Hotel Dubai', 'Business Bay, Sheikh Zayed Road', 25.1856, 55.2566, {'foursquareId': '4f5c600be4b0c4b689a73154'}),
    new Location('Crowne Plaza Dubai', 'Sheikh Zayed Road', 25.270475, 55.325669, {'foursquareId': '4b0587eaf964a52091a622e3'}),
    new Location('Grand Hyatt Dubai', 'Sheikh Rashid Road, Oud metha Road', 25.226043, 55.327974, {'foursquareId': '4b0587ebf964a520dba622e3'}),
    new Location('Dubai Marina Beach Resort & Spa', 'Jumeirah Beach Road', 25.2101, 55.249, {'foursquareId': '4b0587ebf964a520daa622e3'}),
    new Location('The Address Downtown Dubai', 'Btw Sheikh Zayed Rd. & Doha St.', 25.193933, 55.279362, {'foursquareId': '4bc5cb805935c9b6aa5ba6d2'}),  
    new Location('Emirates Grand Hotel', 'Sheikh Zayed Road', 25.273121, 55.381643, {'foursquareId': '4f06bd70e4b09a8a3d27001e'}),
    new Location('Atlantis The Palm', 'Crescent Road, Palm Island', 25.130366, 55.117378, {'foursquareId': '4b0587ecf964a520f0a622e3'}),
    new Location('Burj Al Arab', 'Jumeirah Road', 25.141186, 55.185420, {'foursquareId': '4bebf8d661aca593759c8500'}),
    new Location('Kempinski Hotel & Residences Palm Jumeirah', 'Crescent Road Palm Jumeirah', 25.113089, 55.109826, {'foursquareId': '4b0c87bff964a520da3e23e3'}),
    new Location('Fairmont the Palm Jumeirah', 'Palm Jumeirah', 25.11100, 55.13967, {'foursquareId': '50df3865e4b053b5ee21aacf'}),
    new Location('Radisson Blue Hotel Dubai Deira Creek', 'Baniyas Street', 25.194676, 55.28819, {'foursquareId': '4bc737c0af07a5939bb47e2d'}),
    new Location('Hilton Dubai Jumeirah Resort', 'The Walk - Jumeirah Beach Residence', 25.0787781, 55.1340484, {'foursquareId': '5200d5da498e797de1c90e3e'}),
    new Location('Dubai Intercontinental Hotel', 'Crescent Dr.', 25.265246, 55.309607, {'foursquareId': '4bab5e6ef964a5200ca43ae3'}),
    new Location('Conrad Dubai', 'Sheikh Zayed Road', 25.2259947, 55.2837688, {'foursquareId': '4d3170065c2db60c9518b86c'}),
    new Location('Flora Creek Deluxe Hotel Apartments', 'Port Saeed Road Near Deira City Center', 25.268123, 55.392035, {'foursquareId': '4c0d7fa22466a5933eb17721'}),
    new Location('Four Seasons Dubai at Jumeirah', 'Jumeirah Beach Rd', 25.212515, 55.245474, {'foursquareId': '519080d9498ef8b46e92e052'})
 	];

    // Setup local AIRPORT on the map
 	var airportMarker = new google.maps.Marker({
 		position: new google.maps.LatLng(25.250266, 55.357919),
		map: map,
		icon: 'img/planeimg.png',
		animation: google.maps.Animation.DROP,
		title: 'Dubai International Airport',
        wurl: 'http:\/\/www.dubaiairport.com',
        purl: 'https:\/\/irs1.4sqi.net\/img\/general\/200x200\/47857651_E9Hr367v3WOyNmzOMjW37O41S-sxOpRF3sJhXW9v2Ck.jpg'
 	});

    // Airport Info Window
 	google.maps.event.addListener(airportMarker, 'click', function() {
 		viewModel.currentLocation().marker.setAnimation(null);
        var airportPhotoUrl = '<div><br><img src="' + airportMarker.purl + '"></div>';
        var contentStr = '<div><h2 class="info-title"><a href="' + airportMarker.wurl 
                    + '">' + airportMarker.title + '</a></h2></div>';
        contentStr = contentStr.concat(airportPhotoUrl);
        infowindow.setContent(contentStr);
 		infowindow.open(map, this);
        contentStr = '';
 	});

    // Bind to the ViewModel
    viewModel = new ViewModel();
    ko.applyBindings(viewModel);
    
} // END initMap()

// START LOCATION object on the map
var Location = function(title, description, latitude, longitude, apiType) {
    var self = this;
    self.title = ko.observable(title);
    self.description = ko.observable(description);
    self.latitude = ko.observable(latitude);
    self.longitude = ko.observable(longitude);
    self.marker = ko.observable('');
    self.foursquareId = ko.observable(apiType.foursquareId);
    self.foursquareInfo = ko.observable();
    /**
     * google.maps.Marker object 
     */
    self.marker = new google.maps.Marker({
        position: new google.maps.LatLng(self.latitude(), self.longitude()),
        map: map,
        icon: 'img/marker-red.png',
        animation: google.maps.Animation.DROP,
        title: self.title()
    });

    // When the location's marker is clicked, trigger openInfoWindow
    google.maps.event.addListener(self.marker,'click', function() {
        parent.viewModel.openInfoWindow(self);
    });
}; // END Location


//
// View Model 
//

var ViewModel = function() {
    var self = this;
    self.enteredText = ko.observable(''); // text input in the search field
    self.locations = ko.observableArray(initialLocations); // locations array
    self.currentLocation = ko.observable(this.locations()[0]); // clicked location
    self.hasWebsite = ko.observable(false); // has url in api results
    self.hasPhoto = ko.observable(false); // has photo in api results

    /**
     * Following function makes an asynchronous call to the Foursquare API to obtain info in JSON format 
     * on the clicked location. It sets the info window content with the location's Website info and photo, if available.
     * If the api call fails, a message will be displayed instead, asking end user to try again.
    */
    self.showInInfoWindow = function(location) {
        var errmsg, venuePhoto;
        // Set default infowindow content if API call returns no website url or photo id for the location
        contentStr = '<div><h2 class="info-title">' + location.title() + '</h2>'
        + '<p class="info-description">' + location.description() + '</p>';

        var foursquareURL = 'https://api.foursquare.com/v2/venues/' + location.foursquareId() + '?client_id=V5AOEGTHUVSOQ55G50DYC3KQP4XVQT152WJPBVY3DWNHBPFF&client_secret=5SIWI2P2FW5IPZ0PL2203GXULP1DBGLP1TU0K2M1CXVFJXU1&v=20150922';
        $.getJSON( foursquareURL, function(data) {              
            location.foursquareInfo(data);
            
            if (location.foursquareInfo().response.venue.url != null) { self.hasWebsite(true);
            } else { self.hasWebsite(false); } 

            if (location.foursquareInfo().response.venue.photos.groups[0].items[0].id != null) { self.hasPhoto(true);
            } else { self.hasPhoto(false); }

            // Set infowindow content if API call returns a website url for the location
            if (self.hasWebsite()) {
                contentStr = '<div><h2 class="info-title"><a href="' + location.foursquareInfo().response.venue.url 
                    + '">' + location.title() + '</a></h2>' 
                    + '<p class="info-description">' + location.description() 
                    + '</p></div>';
            } 
            // Set infowindow content if API call returns photo id for the location
            if (self.hasPhoto()) {
                try {
                var venuePhoto = location.foursquareInfo().response.venue.photos.groups[0].items[0],
                photoId = venuePhoto.id,
                prefix = venuePhoto.prefix,
                suffix = venuePhoto.suffix,
                size = "200x200",
                source = prefix + size + suffix;
                var photoUrl = '<div><br><img src="' + source + '"></div>';
                } catch (e) {
                    onErrorCallback();
                }
                contentStr = contentStr.concat(photoUrl);
            } 
            // Set infowindow content if API call returns no website url or photo id for the location
            if (!(self.hasWebsite()) && !(self.hasPhoto())) {
                contentStr = contentStr.concat('</div>');
            }

            infowindow.setContent(contentStr);
        }).error(function (e) {
            errmsg = '<p>Additional information can not be obtained at the moment. Please try again later.</p></div>';
            contentStr = contentStr.concat(errmsg);
            infowindow.setContent(contentStr);
            console.log("Additional info can not be obtained at the moment. Please try later.")
        });
        // Open infowindow for the clicked location
       	infowindow.open(map, location.marker);
       	map.panTo(location.marker.getPosition());            

        function onErrorCallback() {
            console.log("There was an unexpected error. Please try again.")
        }

    };

    /**
     * Sets the clicked location as the current location
     */
	self.setCurrentLocation = function(currLoc) {
        if (currLoc = self.getLoc(currLoc.title())) {
            currLoc != self.currentLocation()? self.currentLocation().marker.setAnimation(null) : self.currentLocation();
            currLoc.marker.setAnimation(google.maps.Animation.BOUNCE);
            map.panTo(currLoc.marker.getPosition());
            return self.currentLocation(currLoc);
        }
    };
    /**
     * Returns the location object matching the title
     */
    self.getLoc = function(title) {
        for (var i in self.locations()) {
            if (self.locations()[i].title() === title) {
                return self.locations()[i];
            }
        }
    };

    /**
     * Opens the infowindow at the clicked location marker
     * and sets it as the current location.
     */
    self.openInfoWindow = function(location) {      
        self.setCurrentLocation(location);
        self.showInInfoWindow(location);
    };

    /**
     * Filters locations that match the entered text
     */
    self.filterLocations = ko.computed(function() {
        return ko.utils.arrayFilter(self.locations(), function (location) {
            if (location.title().toLowerCase().indexOf(self.enteredText().toLowerCase()) >= 0) {
                if (map!=null) {
                    location.marker.setMap(map);
                }
                return true;
            } else {
                location.marker.setMap(null);
                return false;
            }
        });
    });
    
    // Sets the infowindow's marker as the current location when opened
    google.maps.event.addListener(parent.infowindow, 'domready', function(e) {
        var location = self.getLoc(parent.infowindow.getAnchor().title);
        if (location) {
            self.setCurrentLocation(location);
        }
    });

    // Stops marker-bouncing when the infowindow is closed
    google.maps.event.addListener(parent.infowindow, 'closeclick', function(e) {
        self.currentLocation().marker.setAnimation(null);
    });

}; // END ViewModel
