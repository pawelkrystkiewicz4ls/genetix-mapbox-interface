const yellow = '#E3B505';
const blue = '#2677BD';
const green = '#2ecc71';
const orange = '#e67e22';
const purple = '#D27AFF';

L.mapbox.accessToken =
	'pk.eyJ1IjoicGF3ZWxrcnlzdGtpZXdpY3o0bHMiLCJhIjoiY2p0enFrNDJ1Mm9oYTQ1cW4xeXV3aWsyciJ9.eR3LT4VJppS8DpdaNCQZ2w';

const map = L.mapbox
	.map('map')
	.setView([ 0, 0 ], 3)
	.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

const data = { type: 'FeatureCollection', features: [] };
let markersLayer = L.mapbox.featureLayer(data).addTo(map);

const resetView = () => {
	map.setView([ 0, 0 ], 3);
};

const addGeoJSONMarkers = (features) => {
	markersLayer.setGeoJSON({ type: 'FeatureCollection', features });
	map.fitBounds(markersLayer.getBounds());

	// Bind a popup to each
	markersLayer
		.eachLayer((layer) => {
			layer.bindPopup(layer.feature.properties.description, { closeButton: false });
		})
		.addTo(map);

	// Open popups on hover
	markersLayer.on('mouseover', function(e) {
		e.layer.openPopup();
	});
	markersLayer.on('mouseout', function(e) {
		e.layer.closePopup();
	});

	markersLayer.on('click', function(e) {
		map.panTo(e.layer.getLatLng());

		// let clickedMarker = e.layer.feature;
		// Get the GeoJSON from libraryFeatures and hospitalFeatures
		// let oldMarkers = markersLayer.getGeoJSON();
		// Using Turf, find the nearest hospital to library clicked
		// Change the nearest hospital to a large marker
		// clickedMarker.properties['marker-size'] = 'large';

		// oldMarkers.push(clickedMarker);
		// // Add the new GeoJSON to hospitalLayer
		// markersLayer.setGeoJSON(oldMarkers);
		// // Bind popups to new hospitalLayer and open popup
		// // for nearest hospital
		// markersLayer.eachLayer((layer) => {
		// 	layer.bindPopup(layer.feature.properties.description, { closeButton: false });
		// });
	});
};
const getMarkersBounds = () => {
	if (markersLayer._geojson.features && markersLayer._geojson.features.length > 0) {
		map.fitBounds(markersLayer.getBounds());
	} else return `Can't focus on empty layer`;
};
