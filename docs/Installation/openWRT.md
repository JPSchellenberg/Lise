# Installation auf openWRT
Dies ist eine Anleitung zum Installieren auf einem Arduino-Yun.

  1. [Lise-openWRT](http://lise.education/download/Lise-openWRT-latest.tar.gz) downloaden und die `.tar.gz` entpacken.

  2. Verbinden mit dem Arduino-Yun via WLAN. In der Regel erstellt der Arduino-Yun ein WLAN-Netzwerk mit dem Namen `ArduinoYun-XXXXXXXXXXXX` wobei die X durch Zahlen oder Buchstaben ersetzt werden.
  
  3. Upload der Dateien auf den Yun:
```
    scp openwrt.tar.gz root@192.168.240.1:/root
```
  4. Um alle benötigten Dateien auf dem Yun zu installieren muss sich per ssh mit dem Yun verbunden werden. Dieser Befehl verlangt in der Regel ein Passwort. Bei einem neuen Yun ist dieses Passwort "arduino". Nach Eingabe des Passwort befindet man sich auf dem Yun.
```
    ssh root@192.168.240.1
```
  5. Auf dem Yun muss nun in den Ordner `/root` gewechselt werden
```
    cd /root
```
  6. Im order `/root` muss nun die Software entpackt werden:
```
    tar -xzf openwrt.tar.gz
```
  7. Anschließend muss man in den entpackten Ordner wechseln:
``` 
  cd openwrt/
```
  8. Nun muss das install-script ausführbar gemacht werden:
```
  chmod +x install
```
  9. Jetzt kann das install-script ausgeführt werden:
``` 
  ./install
```
  10. Der Yun sollte bei erfolgreicher Installation neu starten. Nach ca. 1,5 Minuten ist das Programm über `http://192.168.240.1:8080` zu erreichen.