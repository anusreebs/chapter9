
var NeighbourhoodFacility = function () {
	var self = this;
	this.selectedPoi = ko.observable();
	this.selectedPoiCiti = ko.observable();
	this.selectedPoiCountry = ko.observable();
	this.selectedPoiLat = ko.observable();
	this.selectedPoiLng = ko.observable();
	this.facilityNames = [];
	this.facilitiesModel = ko.observableArray(this.facilityNames);
	this.mapStatus = ko.observable(myMap.isMapReady);
	this.currentfacility = ko.observable('Restaurant');
	this.currentFacilitiesList = [];
	this.currentfacilityData = ko.observableArray([]);
	self.loadLocation=function(loc){
       alert(JSON.stringify(loc));
	  
	}
	this.init = function () {
		var hospitalData = {
			facilityType: "Hospital",
			facilityData: [{ title: 'S.K, Edapazhinji', location: { lat: 8.505743, lng: 76.971237 } },
			{ title: 'Chelsa, Poojapura', location: { lat: 8.485123, lng: 76.972025 } },
			{ title: 'P.R.S, karamana', location: { lat: 8.482068, lng: 76.965746 } },
			{ title: 'SUT, Pattom', location: { lat: 8.516354, lng: 76.940363 } },
			{ title: 'KIMS, Aanayara', location: { lat: 8.513947, lng: 76.909565 } }]

		};

		var restaurantData = {
			facilityType: "Restaurant",
			facilityData: [
				{ title: 'The Leela Mumbai', location: { lat: 19.109257, lng: 72.873690 } },
				{ title: 'The Taj Mahal Palace', location: { lat: 18.921876, lng: 72.833322 } },
				{ title: 'Yauatcha Mumbai', location: { lat: 19.069539, lng: 72.864011 } },
				{ title: 'The Oberoi, Mumbai', location: { lat: 19.174093, lng: 72.860063 } }]
				
		};

		var atmData = {
			facilityType: "ATM",
			facilityData: [{ title: 'Canara Bank, Thirumala', location: { lat: 8.502146, lng: 76.992480 } },
			{ title: 'SBT, Poojapura', location: { lat: 8.499164, lng: 76.980807 } },
			{ title: 'FederalBank, Vazhuthacaudu', location: { lat: 8.503757, lng: 76.966215 } },
			{ title: 'SouthIndianBank, Santhi Nagar', location: { lat: 8.490514, lng: 76.949735 } },
			{ title: 'Indian Bank, Thampanoor', location: { lat: 8.490341, lng: 76.958490 } }]
		};
	
		self.facilityNames.push(restaurantData.facilityType);
		self.facilityNames.push(hospitalData.facilityType);
		self.facilityNames.push(atmData.facilityType);
		ko.mapping.fromJS(restaurantData.facilityData, {}, self.currentfacilityData);
		myMap.listPois(restaurantData.facilityData);
		this.currentfacility.subscribe(function (data) {
			
			console.log(data);
			if (data == 'Hospital') {
				ko.mapping.fromJS(hospitalData.facilityData, {}, self.currentfacilityData);
				myMap.listPois(hospitalData.facilityData);
			}
			else if (data == 'Restaurant') {
				ko.mapping.fromJS(restaurantData.facilityData, {}, self.currentfacilityData);
				myMap.listPois(restaurantData.facilityData);
			}
			else if (data == 'ATM') {
				ko.mapping.fromJS(atmData.facilityData, {}, self.currentfacilityData);
				myMap.listPois(atmData.facilityData);
			}
		});
		
		zomatoService.viewModel = self;
	
	};
	var itemChanged = function (data) {
		
	};

	this.updateViewData = function (data) {
		self.selectedPoi(data.dataTitle);
		self.selectedPoiCiti(data.dataCity);
		self.selectedPoiCountry(data.dataCountry);
		self.selectedPoiLat(data.dataLat);
		self.selectedPoiLng(data.dataLng);
	};
};

var neighbourHoodFacilities = new NeighbourhoodFacility();
neighbourHoodFacilities.init();

ko.applyBindings(neighbourHoodFacilities);

