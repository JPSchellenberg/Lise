# Installation auf openWRT
Dies ist eine Anleitung zum Installieren auf einem Arduino-Yun. Vorraussetzung für die Installation ist, dass sich der Ardunio-Yun angeschaltet im Netzwerk befindet.

  1. Download von [Lise-openWRT](http://lise.education/download/Lise-openWRT.zip)
  2. Upload der Dateien auf den Yun:
```
    scp openwrt.tar.gz root@<ip_des_arduinos>:/root
```
  3. Um alle benötigten Dateien auf dem Yun zu installieren muss sich per ssh mit dem Yun verbunden werden. Dieser Befehl verlangt in der Regel ein Passwort. Bei einem neuen Yun ist dieses Passwort "arduino". Nach Eingabe des Passwort befindet man sich auf dem Yun.
```
    ssh root@<ip_des_arduinos>
```
  4. Auf dem Yun muss nun in den Ordner `/root` gewechselt werden
```
    cd /root
```
  5. Im order `/root` muss nun die Software entpackt werden:
```
    tar -xzf openwrt.tar.gz
```
  6. Anschließend kann das install-script ausgeführt werden:
``` 
  ./install
```
  7. Der Yun sollte bei erfolgreicher Installation neu starten. Nach ca. 1,5 Minuten ist das Programm über `http://<ip_des_arduinos>` zu erreichen.