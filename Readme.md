### Mapa

## Tablica znaczników

Jest to tablica zawierająca obiektu jak w przykładzie pniżej:
```
	{
		"type": "Feature",
		"geometry": { "type": "Point", "coordinates": [
      {Longitude: Float}, {Latitude: Float} ] },
		"properties": {
			"id": {RecordID: int},
			"description": {PopupContents: string | int},
			"marker-color": {hex-color: string},
			"marker-size": Enum["medium" | "middle" | "large"],
			"marker-symbol": {OrdersAmount: int}
		}
	}
```

## Dodawanie znaczników na mapie

`addGeoJSONMarkers()`

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
## Aktualizowanie znaczników
Wykonywane jest przez ponowne wywołanie funkcji `addGeoJSONMarkers` z nowym zestawem danych.

    Uwaga! Mapa nie zapamiętuje znaczników i dodanie nowego znacznika powinno następić po stronie użytkownika przez dodanie nowego punktu do zestawu danych jaki zostanie przekazany w argumencie funkcji.


## Usuwanie znaczników

Usunięcie znaczników z mapy natępuje przez wywołanie funkcji `addGeoJSONMarkers` bez argumentów


