# Installation auf openWRT
Dies ist eine Anleitung zum Installieren auf einem Arduino-Yun. Vorraussetzung für die Installation ist, dass sich der Ardunio-Yun angeschaltet im Netzwerk befindet.

  1. Download von [Lise-openWRT](http://lise.education/download/Lise-openWRT.zip)
  2. Upload der Dateien auf den Yun:
```
    scp openwrt.tar.gz root@192.168.240.1:/root
```
  3. Um alle benötigten Dateien auf dem Yun zu installieren muss sich per ssh mit dem Yun verbunden werden. Dieser Befehl verlangt in der Regel ein Passwort. Bei einem neuen Yun ist dieses Passwort "arduino". Nach Eingabe des Passwort befindet man sich auf dem Yun.
```
    ssh root@192.168.240.1
```
  4. Auf dem Yun muss nun in den Ordner `/root` gewechselt werden
```
    cd /root
```
  5. Im order `/root` muss nun die Software entpackt werden:
```
    tar -xzf openwrt.tar.gz
```
  6. Anschließend muss man in den entpackten Ordner wechseln:
``` 
  cd openwrt/
```
  7. Nun muss das install-script ausführbar gemacht werden:
```
  chmod u+x install
```
  8. Jetzt kann das install-script ausgeführt werden:
``` 
  ./install
```
  9. Der Yun sollte bei erfolgreicher Installation neu starten. Nach ca. 1,5 Minuten ist das Programm über `http://192.168.240.1:8080` zu erreichen.