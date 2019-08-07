L.mapbox.accessToken =
	'pk.eyJ1IjoicGF3ZWxrcnlzdGtpZXdpY3o0bHMiLCJhIjoiY2p0enFrNDJ1Mm9oYTQ1cW4xeXV3aWsyciJ9.eR3LT4VJppS8DpdaNCQZ2w';

const map = L.mapbox
	.map('map')
	.setView([ 0,0 ], 3)
	.addLayer(L.mapbox.styleLayer('mapbox://styles/mapbox/streets-v11'));
