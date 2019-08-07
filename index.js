const yellow = '#E3B505';
const blue = '#2677BD';
const mapboxBlue = '#3544FE';
const green = '#2ecc71';
const orange = '#e67e22';
const purple = '#D27AFF';

const ENABLE_ADJUSTING_MAP_VIEW_MIDDLE_CLICK = true;

L.mapbox.accessToken =
	'pk.eyJ1IjoicGF3ZWxrcnlzdGtpZXdpY3o0bHMiLCJhIjoiY2p0enFrNDJ1Mm9oYTQ1cW4xeXV3aWsyciJ9.eR3LT4VJppS8DpdaNCQZ2w';

document.addEventListener('DOMContentLoaded', (event) => {
	if (ENABLE_ADJUSTING_MAP_VIEW_MIDDLE_CLICK) {
		const mapDIV = document.querySelector('#map');
		mapDIV.addEventListener('mouseup', (e) => {
			if (typeof e === 'object' && e.button === 1) {
				getViewBounds();
			}
		});
	}
});

const map = L.mapbox
	.map('map', null, { zoomControl: false })
	.setView([ 0, 0 ], 3)
	.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));

new L.Control.Zoom({ position: 'topright' }).addTo(map);
L.control.scale().addTo(map);
// let markersLayer = L.mapbox.featureLayer({ type: 'FeatureCollection', features: [] }); //.addTo(map);
const initiateMarkersLayer = () => L.mapbox.featureLayer({ type: 'FeatureCollection', features: [] }); //.addTo(map);
const initiateRouteLayer = () => L.mapbox.featureLayer({ type: 'FeatureCollection', features: [] }); //.addTo(map);
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
let routeLayer = initiateRouteLayer();
let clusterGroup = initiateClusterGroup();
//RESET MAP VIEW 0,0
const resetView = () => {
	map.setView([ 0, 0 ], 3);
};

const addGeoJSONMarkers = (features = null) => {
	removeAndRestartLayer();

	if (!!features) {
		markersLayer = initiateMarkersLayer();
		clusterGroup = initiateClusterGroup();
		markersLayer.setGeoJSON({ type: 'FeatureCollection', features });

		// fit to bounds
		map.fitBounds(markersLayer.getBounds());

		markersLayer.eachLayer((layer) => {
			layer.bindPopup(layer.feature.properties.description, { closeButton: false });
		});
		markersLayer.eachLayer(function(layer) {
			clusterGroup.addLayer(layer);
		});

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
		map.addLayer(clusterGroup);
	}
};

const addGeoJSONRoute = (features = null) => {
	removeAndRestartLayer();

	if (!!features) {
		routeLayer.setGeoJSON({ type: 'FeatureCollection', features });

		// fit to bounds
		map.fitBounds(routeLayer.getBounds());

		routeLayer.eachLayer((layer) => {
			if (layer instanceof L.Point) {
				layer.bindPopup(layer.feature.properties.description, { closeButton: false });
			}

			if (layer instanceof L.Polyline) {
				layer.setStyle({
					color: layer.feature.properties.color
				});
			}
		});

		routeLayer.on('mouseover', function(e) {
			if (e.layer.feature.geometry.type === 'Point') {
				e.layer.openPopup();
			}
		});
		routeLayer.on('mouseout', function(e) {
			if (e.layer.feature.geometry.type === 'Point') {
				e.layer.closePopup();
			}
		});

		routeLayer.on('click', function(e) {
			if (e.layer.feature.geometry.type === 'Point') {
				map.panTo(e.layer.getLatLng());
			}
		});

		map.addLayer(routeLayer);
	}
};

//SET VIEW TO ACTIVE MARKERS / ROUTE /
const getViewBounds = () => {
	switch (true) {
		case markersLayer._geojson.features && markersLayer._geojson.features.length > 0:
			map.fitBounds(markersLayer.getBounds());
			break;
		case routeLayer._geojson.features && routeLayer._geojson.features.length > 0:
			map.fitBounds(routeLayer.getBounds());
			break;
		// case !!userGPS:
		// 	map.setView(userGPS, 6);
		// 	break;

		default:
			map.setView({ lon: 0, lat: 0 }, 3);
			break;
	}
};
const removeAndRestartLayer = () => {
	map.removeLayer(routeLayer);
	map.removeLayer(markersLayer);
	map.removeLayer(clusterGroup);

	markersLayer = initiateMarkersLayer();
	routeLayer = initiateRouteLayer();
	clusterGroup = initiateClusterGroup();

	getViewBounds();
};
