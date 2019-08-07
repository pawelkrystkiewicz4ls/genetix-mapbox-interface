### Mapa

## Dodawanie znaczników na mapie

`addGeojsonMarkers()`

Funkcja przyjmuje zmienne w postaci tablicy:

```
[
	{
		"type": "Feature",
		"geometry": { "type": "Point", "coordinates": [ 9.5163503, 53.4511744 ] },
		"properties": {
			"id": 392,
			"description": "<div class='genetix-popup'><p class='genetix-popup--header'>W&H Fenster, Turen und Sonnenschtuz GmbH & Co. KG</p><span>O-00012059_7</span><p>Graf Heinrich Strasse 50</br>DE 21698 Harslefd</p><p>Obj\u0119to\u015B\u0107: <span class='genetix-popup--values'>6409,3</span> m<sup>3</sup></br>Waga: <span class='genetix-popup--values'>2733</span> kg</p><p>Data dostawy: <span class='genetix-popup--dates'>2019-06-10,2019-06-10,2019-06-12</span></p></div>",
			"marker-color": "#4169E1",
			"marker-size": "medium",
			"marker-symbol": "1"
		}
	},
	{
		"type": "Feature",
		"geometry": { "type": "Point", "coordinates": [ 11.94854, 57.72994 ] },
		"properties": {
			"id": 123,
			"description": "<div class='genetix-popup'><p class='genetix-popup--header'>W&H Fenster, Turen und Sonnenschtuz GmbH & Co. KG</p><span>O-00012059_7</span><p>Graf Heinrich Strasse 50</br>DE 21698 Harslefd</p><p>Obj\u0119to\u015B\u0107: <span class='genetix-popup--values'>6409,3</span> m<sup>3</sup></br>Waga: <span class='genetix-popup--values'>2733</span> kg</p><p>Data dostawy: <span class='genetix-popup--dates'>2019-06-10,2019-06-10,2019-06-12</span></p></div>",
			"marker-color": "#4169E1",
			"marker-size": "medium",
			"marker-symbol": "2"
		}
	}
]


```

## Tablica znaczników

Jest to tablica poniższych obiektów:
```
	{
		"type": "Feature",
		"geometry": { "type": "Point", "coordinates": [
      Longitude, Latitude ] },
		"properties": {
			"id": RecordID,
			"description": PopupContent,
			"marker-color": "hex-color",
			"marker-size": "medium | middle | large",
			"marker-symbol": OrdersAmount
		}
	}
```