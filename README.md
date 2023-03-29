# SoundPace - Discover your Music

## Überblick
Das ist ein Webtool zur Analyse und Interaktion mit der eigenen Musik auf Spotify. Die Webseite ist unter [mysoundpace.com](https://mysoundpace.com) verfügbar.

> **Note**
> Bevor das Tool verwendet werden kann, muss der jeweilige Spotify Account im Developer-Dashboard
 freigeschaltet werden. Dieser Schritt ist nicht mehr notwendig sobald die App durch Spotify freigegeben wurde.


## Dashboard

<p align="center">
  <img width="500" alt="Sound Pace Dashboard" src="https://user-images.githubusercontent.com/97185101/227189487-87abb969-4edb-468a-a055-37c04eb18b29.png">
</p>

Nach dem Login mit dem eigenen Spotify-Account gelangt der User auf ein Dashboard. Hier sieht er die Analyse seiner 
aktuellen Top-Songs und Artisten. Diese Analyse kann über verschiedene Zeitspannen mit dem entsprechenden Button eingesehen werden.

## PaceCreator

### Schritt 1

<p align="center">
  <img width="300" alt="image" src="https://user-images.githubusercontent.com/97185101/227189942-74f4fee6-a73c-4787-8219-c75ed3b6b8d2.png">
</p>

Im ersten Schritt muss die Quelle der eigenen Musik gewählt werden. Es können eine oder mehrere Playlists des Users ausgewählt werden, deren Tracks die Grundlage für eine neue Playlist darstellen.

### Schritt 2

<p align="center">
  <img width="300" alt="image" src="https://user-images.githubusercontent.com/97185101/227190201-6fd2ae08-4b2a-4f72-b1d6-aee1cf3dd79d.png">
</p>

Im nächsten Schritt wird die ausgewählte Musik analysiert und weitere Daten bei Spotify abgefragt. Danach können verschiedene Parameter-Einstellungen vorgenommen werden um eine neue Liste mit Tracks zu erhalten, die den Kriterien entsprechen. Wähle z.B. Musik mit einem bestimmten Tempo (Pace), Energie oder Tanzbarkeit aus.

### Schritt 3

<p align="center">
  <img width="300" alt="image" src="https://user-images.githubusercontent.com/97185101/227190500-bc203bf5-b9e4-462a-b5dd-a410b3102f79.png">
</p>

Im letzten Schritt kann die Playlist überprüft werden und allenfalls noch einzelne Tracks von der Liste entfernt werden. Sobald ein Namen für die Neue Playlist eingegeben wurde, kann nun die neue Playlist im Spotify-Account des Users angelegt werden.

## Verwendete Technologien

| React | Redux | Axios | Spotify-API |
| ------------- | ------------- | ------------- | ------------- |