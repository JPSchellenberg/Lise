#include <Wire.h>

#include <Adafruit_ADS1015.h>
#include <RTClib.h>

#define VERSION "1.0.0-prerelease.6"
#define NAME "Lise_Main"

Adafruit_ADS1115 ads1;  /* Use this for the 16-bit version */
Adafruit_ADS1115 ads2;
RTC_Millis rtc;
unsigned long lastReading;
long _samplerate = 20;
long ms_time_to_wait = 50;
boolean _ads1115 = true;
boolean _rtc = false;
adsGain_t ads1gain;
adsGain_t ads2gain;
float gain_bit_factor_ads1 = 0.1875; //default immer mit der niedrigsten Verstärkung beginnen !!
float gain_bit_factor_ads2 = 0.1875; //default

void setup(void)
{
  Serial1.begin(115200);
  while (!Serial1) {}
  ads1.begin();
  ads2.begin();
  ads1.setGain(GAIN_TWOTHIRDS);  //default
  ads2.setGain(GAIN_TWOTHIRDS);  //default
  rtc.begin(DateTime(F(__DATE__), F(__TIME__)));
  lastReading = millis();
  scan_I2C(); //Muss das in der HAuptschleife sein? Braucht immer Zeit. Vlt. besser im Serial1Command aufgehoben. Habs mal rausgenommen, schon sind 30ms gewonnen!!!
}                 // und nur beim init reingemacht. Vorerst unnötig, wichtig ist dass der AD/Wandler richtig funktioniert!! SCheint jetzt so zu sein..



void loop(void)
{
  ms_time_to_wait = 1000L / _samplerate;
  while (Serial1.available() > 0) {
    char command = (char)Serial1.read();
    handle_command(command);
  }

  if (millis () - lastReading >= ms_time_to_wait)   //
  {
    lastReading = millis ();
    measure();
    //   scan_I2C(); //Muss das in der HAuptschleife sein? Braucht immer Zeit. Vlt. besser im Serial1Command aufgehoben
    //    Bildschirmbutton Bus neu lesen?
  }
  //  delay( _samplerate ); //Das geht natürlich so nicht! Die Messung braucht vorher schon zeit und der i2c-scan auch!
  Serial1.flush();
}


void measure(void) {
    Serial1.print("data {");

  // time
    Serial1.print("\"time\":[");
    Serial1.print( millis() );
    Serial1.print("]");

  // ADS1115
  // The ADC input range (or gain) can be changed via the following
  // functions, but be careful never to exceed VDD +0.3V max, or to
  // exceed the upper and lower limits if you adjust the input range!
  // Setting these values incorrectly may destroy your ADC!
  //                                                                ADS1015  ADS1115
  //                                                                -------  -------
  // ads.setGain(GAIN_TWOTHIRDS);  // 2/3x gain +/- 6.144V  1 bit = 3mV      0.1875mV (default)
  // ads.setGain(GAIN_ONE);        // 1x gain   +/- 4.096V  1 bit = 2mV      0.125mV
  // ads.setGain(GAIN_TWO);        // 2x gain   +/- 2.048V  1 bit = 1mV      0.0625mV
  // ads.setGain(GAIN_FOUR);       // 4x gain   +/- 1.024V  1 bit = 0.5mV    0.03125mV
  // ads.setGain(GAIN_EIGHT);      // 8x gain   +/- 0.512V  1 bit = 0.25mV   0.015625mV
  // ads.setGain(GAIN_SIXTEEN);    // 16x gain  +/- 0.256V  1 bit = 0.125mV  0.0078125mV

  if (_ads1115) {
    Serial1.print(",\"ads1115\":[");
    ads1.setGain(ads1gain); //Da es nur einen Verstärker gibt, muss immer dem Wandeln der  Verstärker gesetzt werden!
    Serial1.print((ads1.readADC_Differential_0_1() * gain_bit_factor_ads1));
    Serial1.print(",");
    ads2.setGain(ads2gain); //Da es nur einen Verstärker gibt, muss immer dem Wandeln der  Verstärker gesetzt werden!
    Serial1.print((ads2.readADC_Differential_2_3() * gain_bit_factor_ads2));
    Serial1.print("]");
  }

//Mach das nicht so. Zum Beginn des Programms nechsehen, ob rtc da ist und gestellt ist, evtl stellen
//Danach interne millis() benutzen. Beim Speichern dann erst im Browser die rtc verrechnen...
 
  if (_rtc) {
    Serial1.print(",\"rtc\":[");
    Serial1.print(rtc.now().unixtime());
    Serial1.print("]");
  }


  // end
  Serial1.println("}");
//  Serial1.println("");
  Serial1.flush();
}

void scan_I2C(void) {
  byte error, address;
  for (address = 1; address < 127; address++ )
  {
    Wire.beginTransmission(address);
    error = Wire.endTransmission();

    if (error == 0) {
      if (address == 72) {
        if (_ads1115 == false) {
          _ads1115 = true;
          print_sensor_list();
          Serial1.print("\n");
        }
      }
      if (address == 104) {
        if (_rtc == false) {
          _rtc = true;
          print_sensor_list();
          Serial1.print("\n");
        }
      }
    } else {
      if (address == 72) {
        if (_ads1115 == true) {
          _ads1115 = false;
          print_sensor_list();
          Serial1.print("\n");
        }
      }
      if (address == 104) {
        if (_rtc == true) {
          _rtc = false;
          print_sensor_list();
          Serial1.print("\n");
        }
      }
    }
  }
}

void print_sensor_list(void) {
  Serial1.print("sensor [");
  if (_ads1115) {
    Serial1.print("\"ads1115\",");
  }
  if (_rtc) {
    Serial1.print("\"rtc\",");
  }
  Serial1.print("\"time\"]");
}

void handle_command(char command) {
  if (command == 'v') {
    Serial1.print("sketch {\"name\":\"");
    Serial1.print(NAME);
    Serial1.print("\",\"version\":\"");
    Serial1.print(VERSION);
    Serial1.print("\"}");
    Serial1.print("\n");
    Serial1.flush();
  }

  if (command == 's') {
    _samplerate = Serial1.parseInt();
    Serial1.print("update {\"name\":\"samplerate\",\"value\":"); Serial1.print(1000 / _samplerate); Serial1.print("}\n"); Serial1.flush();
  }

  if (command == 'g') {
    int gain = Serial1.parseInt();
    if (gain <= 5) {           // range value:
      switch (gain) {
        case 0:
          ads1.setGain(GAIN_TWOTHIRDS);
          gain_bit_factor_ads1 = 0.1875;
          break;
        case 1:
          ads1.setGain(GAIN_ONE);
          gain_bit_factor_ads1 = 0.125;
          break;
        case 2:
          ads1.setGain(GAIN_TWO);
          gain_bit_factor_ads1 = 0.0625;
          break;
        case 3:
          ads1.setGain(GAIN_FOUR);
          gain_bit_factor_ads1 = 0.03125;
          break;
        case 4:
          ads1.setGain(GAIN_EIGHT);
          gain_bit_factor_ads1 = 0.015625;
          break;
        case 5:
          ads1.setGain(GAIN_SIXTEEN);
          gain_bit_factor_ads1 = 0.0078125;
          break;
        default:
          ads1.setGain(GAIN_TWOTHIRDS);
          gain_bit_factor_ads1 = 0.1875;
          break;
      }
      ads1gain=ads1.getGain();
      Serial1.print("update {\"name\":\"channel1\",\"parameter\":\"gain\",\"value\":"); Serial1.print(ads1gain); Serial1.print("}\n"); Serial1.flush();
    }
  }

  if (command == 'h') {
    int gain = Serial1.parseInt();
    if (gain <= 5) {           // range value:
      switch (gain) {
        case 0:
          ads2.setGain(GAIN_TWOTHIRDS);
          gain_bit_factor_ads2 = 0.1875;
          break;
        case 1:
          ads2.setGain(GAIN_ONE);
          gain_bit_factor_ads2 = 0.125;
          break;
        case 2:
          ads2.setGain(GAIN_TWO);
          gain_bit_factor_ads2 = 0.0625;
          break;
        case 3:
          ads2.setGain(GAIN_FOUR);
          gain_bit_factor_ads2 = 0.03125;
          break;
        case 4:
          ads2.setGain(GAIN_EIGHT);
          gain_bit_factor_ads2 = 0.015625;
          break;
        case 5:
          ads2.setGain(GAIN_SIXTEEN);
          gain_bit_factor_ads2 = 0.0078125;
          break;
        default:
          ads2.setGain(GAIN_TWOTHIRDS);
          gain_bit_factor_ads2 = 0.1875;
          break;
      }
      ads2gain=ads2.getGain();
      Serial1.print("update {\"name\":\"channel1\",\"parameter\":\"gain\",\"value\":"); Serial1.print(ads2gain); Serial1.print("}\n"); Serial1.flush();
    }
  }
  if (command == 'i') {
    print_sensor_list();
    Serial1.print("\n");
  }
}

