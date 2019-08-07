const yellow = '#E3B505';
const blue = '#2677BD';
const mapboxBlue = '#3544FE';
const green = '#2ecc71';
const orange = '#e67e22';
const purple = '#D27AFF';

L.mapbox.accessToken =
	'pk.eyJ1IjoicGF3ZWxrcnlzdGtpZXdpY3o0bHMiLCJhIjoiY2p0enFrNDJ1Mm9oYTQ1cW4xeXV3aWsyciJ9.eR3LT4VJppS8DpdaNCQZ2w';

const map = L.mapbox
	.map('map')
	.setView([ 0, 0 ], 3)
	.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

// let markersLayer = L.mapbox.featureLayer({ type: 'FeatureCollection', features: [] }); //.addTo(map);
const initiateMarkersLayer = () => L.mapbox.featureLayer({ type: 'FeatureCollection', features: [] }); //.addTo(map);
const initiateClusterGroup = () =>
	new L.MarkerClusterGroup({
		polygonOptions: {
			fillColor: '#3887be',
			color: '#3887be',
			weight: 2,
			opacity: 1,
			fillOpacity: 0.5
		}
	});

let markersLayer = initiateMarkersLayer();

let clusterGroup = initiateClusterGroup();
//RESET MAP VIEW 0,0
const resetView = () => {
	map.setView([ 0, 0 ], 3);
};



const addGeoJSONMarkers = (features = []) => {
	markersLayer = initiateMarkersLayer();
	clusterGroup = initiateClusterGroup();

	markersLayer.setGeoJSON({ type: 'FeatureCollection', features });
	map.fitBounds(markersLayer.getBounds());

	markersLayer.eachLayer((layer) => {
		layer.bindPopup(layer.feature.properties.description, { closeButton: false });
	});
	markersLayer.eachLayer(function(layer) {
		clusterGroup.addLayer(layer);
	});
	map.addLayer(clusterGroup);
};

//SET VIEW TO ACTIVE MARKERS
const getMarkersBounds = () => {
	if (markersLayer._geojson.features && markersLayer._geojson.features.length > 0) {
		map.fitBounds(markersLayer.getBounds());
	} else return `Can't focus on empty layer`;
};

/**MARKERS EVENTS START */
markersLayer.on('mouseover', function(e) {
	e.layer.openPopup();
});
markersLayer.on('mouseout', function(e) {
	e.layer.closePopup();
});

markersLayer.on('click', function(e) {
	map.panTo(e.layer.getLatLng());
});

/**MARKER EVENTS END */
