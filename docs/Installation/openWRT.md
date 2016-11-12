# Installation auf openWRT
Dies ist eine Anleitung zum Installieren auf einem Arduino-Yun. Vorraussetzung für die Installation ist, dass sich der Ardunio-Yun angeschaltet im Netzwerk befindet.

  1. Download von [Lise-openWRT](http://lise.education/download/Lise-openWRT.zip)
  2. Upload der Dateien auf den Yun:
```
    scp -r <lokaler_ordner> root@arduino.local:/srv/lise
```
  3. Um alle benötigten Dateien auf dem Yun zu installieren muss sich per ssh mit dem Yun verbunden werden. Dieser Befehl verlangt in der Regel ein Passwort. Bei einem neuen Yun ist dieses Passwort "arduino". Nach Eingabe des Passwort befindet man sich auf dem Yun.
```
    ssh root@arduino.local
```
  4. Auf dem Yun muss nun in den Ordner `/srv/lise` gewechselt werden
```
    cd /srv/lise
```
  5. Im order `/srv/lise` muss nun nur noch folgender Befehl ausgeführt werden:
```
    ./install
```
  6. Der Yun sollte bei erfolgreicher Installation neu starten. Nach ca. 1,5 Minuten ist das Programm über `http://arduino.local:3000` zu erreichen.