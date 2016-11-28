#include <Wire.h>

#include <Adafruit_ADS1015.h>
#include <RTClib.h>

#define VERSION "1.0.0-prerelease.6"
#define NAME "Lise_Main"

Adafruit_ADS1115 ads1;  /* Use this for the 16-bit version */
Adafruit_ADS1115 ads2;
RTC_Millis rtc;

long _samplerate = 50;
boolean _ads1115 = false;
boolean _rtc = false;

void setup(void)
{
  Serial.begin(57600);
  while(!Serial){}
  ads1.begin();
  ads2.begin();
  ads1.setGain(GAIN_ONE);
  ads2.setGain(GAIN_ONE);
  rtc.begin(DateTime(F(__DATE__), F(__TIME__)));
}



void loop(void)
{   
    while (Serial.available() > 0) {
      char command = (char)Serial.read();
      handle_command(command);
   }
  
  measure();
  scan_I2C();
  
  delay( _samplerate );
  Serial.flush();
}


void measure(void) {
  Serial.print("data {");
  
  // time
  Serial.print("\"time\":[");
  Serial.print( millis() );
  Serial.print("]");
  
  // ADS1115
  if (_ads1115) {
    Serial.print(",\"ads1115\":[");
    Serial.print((ads1.readADC_Differential_0_1() * 0.125F));
    Serial.print(",");
    Serial.print((ads2.readADC_Differential_2_3() * 0.125F));
    Serial.print("]");
  }
  
  if (_rtc) {
    Serial.print(",\"rtc\":[");
    Serial.print(rtc.now().unixtime());
    Serial.print("]");
  }
  
  
  // end
  Serial.print("}\n");
  Serial.flush();
}

void scan_I2C(void) {  
  byte error, address;
  for(address = 1; address < 127; address++ )
  {
    Wire.beginTransmission(address);
    error = Wire.endTransmission();
 
    if (error == 0) {
      if (address == 72) { if (_ads1115 == false) { _ads1115 = true; print_sensor_list(); Serial.print("\n"); } }
      if (address == 104) { if (_rtc == false) { _rtc = true;  print_sensor_list(); Serial.print("\n"); } }
    } else {
      if (address == 72) { if (_ads1115 == true) { _ads1115 = false; print_sensor_list(); Serial.print("\n"); } }
      if (address == 104) { if (_rtc == true) { _rtc = false;  print_sensor_list(); Serial.print("\n"); } }
    }  
  }
}

void print_sensor_list(void) {
  Serial.print("sensor [");
  if (_ads1115) { Serial.print("\"ads1115\","); }
  if (_rtc) { Serial.print("\"rtc\","); }
  Serial.print("\"time\"]");
}

void handle_command(char command) {
  if (command == 'v') { Serial.print("sketch {\"name\":\""); Serial.print(NAME); Serial.print("\",\"version\":\""); Serial.print(VERSION); Serial.print("\"}"); Serial.print("\n"); Serial.flush(); }
      
      if (command == 's') { 
        _samplerate = 1000/Serial.parseInt();
        Serial.print("update {\"name\":\"samplerate\",\"value\":"); Serial.print( 1000/_samplerate ); Serial.print("}"); Serial.print("\n"); Serial.flush();
      }
      
      if (command == 'g') {
        int gain = Serial.parseInt();
        if (gain <= 5) { 
          ads1.setGain((adsGain_t)gain ); 
          Serial.print("update {\"name\":\"channel1\",\"parameter\":\"gain\",\"value\":"); Serial.print(gain); Serial.print("}\n"); Serial.flush();
        }
       }

      if (command == 'h') {
        int gain = Serial.parseInt();
        if (gain <= 5) {
           ads2.setGain((adsGain_t)gain ); 
           Serial.print("update {\"name\":\"channel2\",\"parameter\":\"gain\",\"value\":"); Serial.print(gain); Serial.print("}\n"); Serial.flush();
        }
    }
      if (command == 'i') {
        print_sensor_list();
        Serial.print("\n");
      }
}
