var ZomatoService = function () {
	var self = this;
	this.getLocInfo = function (data) {
		console.log(data);
		var url = 'https://developers.zomato.com/api/v2.1/locations?query=' + data;
		$.ajax({
			type: 'GET',
			url: url,

			headers: {
				"Accept": "application/json",
				"user-key": "1dbd046386b4a08a31781eb833291c88"
			}

		}).done(function (data) {
			if (data.location_suggestions && data.location_suggestions.length>0) {
				if (self.viewModel != null) {
					var dataModel = {
						dataTitle: data.location_suggestions[0].title || 'No Title',
						dataCity: data.location_suggestions[0].city_name || 'City Name unavalable',
						dataCountry: data.location_suggestions[0].country_name || 'Country Name unavailable',
						dataLat: data.location_suggestions[0].latitude || 'NA',
						dataLng: data.location_suggestions[0].longitude || 'NA'
					}

					self.viewModel.updateViewData(dataModel);
				}


		}}).fail(function(e) {
               alert( "error:"+ e );
        })
	};
	this.currentPoi;
	this.viewModel = null;
}

var zomatoService = new ZomatoService();