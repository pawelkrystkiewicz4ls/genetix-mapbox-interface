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

const addGeojsonMarkers = (features) => {
	let data = { type: 'FeatureCollection', features };
	const markersLayer = L.mapbox.featureLayer(data).addTo(map);
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
};
