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
  Serial1.begin(57600);
  while(!Serial1){}
  ads1.begin();
  ads2.begin();
  ads1.setGain(GAIN_ONE);
  ads2.setGain(GAIN_ONE);
  rtc.begin(DateTime(F(__DATE__), F(__TIME__)));
}



void loop(void)
{   
    while (Serial1.available() > 0) {
      char command = (char)Serial1.read();
      handle_command(command);
   }
  
  measure();
  scan_I2C();
  
  delay( _samplerate );
  Serial1.flush();
}


void measure(void) {
  Serial1.print("data {");
  
  // time
  Serial1.print("\"time\":[");
  Serial1.print( millis() );
  Serial1.print("]");
  
  // ADS1115
  if (_ads1115) {
    Serial1.print(",\"ads1115\":[");
    Serial1.print((ads1.readADC_Differential_0_1() * 0.125F));
    Serial1.print(",");
    Serial1.print((ads2.readADC_Differential_2_3() * 0.125F));
    Serial1.print("]");
  }
  
  if (_rtc) {
    Serial1.print(",\"rtc\":[");
    Serial1.print(rtc.now().unixtime());
    Serial1.print("]");
  }
  
  
  // end
  Serial1.print("}\n");
  Serial1.flush();
}

void scan_I2C(void) {  
  byte error, address;
  for(address = 1; address < 127; address++ )
  {
    Wire.beginTransmission(address);
    error = Wire.endTransmission();
 
    if (error == 0) {
      if (address == 72) { if (_ads1115 == false) { _ads1115 = true; print_sensor_list(); Serial1.print("\n"); } }
      if (address == 104) { if (_rtc == false) { _rtc = true;  print_sensor_list(); Serial1.print("\n"); } }
    } else {
      if (address == 72) { if (_ads1115 == true) { _ads1115 = false; print_sensor_list(); Serial1.print("\n"); } }
      if (address == 104) { if (_rtc == true) { _rtc = false;  print_sensor_list(); Serial1.print("\n"); } }
    }  
  }
}

void print_sensor_list(void) {
  Serial1.print("sensor [");
  if (_ads1115) { Serial1.print("\"ads1115\","); }
  if (_rtc) { Serial1.print("\"rtc\","); }
  Serial1.print("\"time\"]");
}

void handle_command(char command) {
  if (command == 'v') { Serial1.print("sketch {\"name\":\""); Serial1.print(NAME); Serial1.print("\",\"version\":\""); Serial1.print(VERSION); Serial1.print("\"}"); Serial1.print("\n"); Serial1.flush(); }
      
      if (command == 's') { 
        _samplerate = 1000/Serial1.parseInt();
        Serial1.print("update {\"name\":\"samplerate\",\"value\":"); Serial1.print( 1000/_samplerate ); Serial1.print("}"); Serial1.print("\n"); Serial1.flush();
      }
      
      if (command == 'g') {
        int gain = Serial1.parseInt();
        if (gain <= 5) { 
          ads1.setGain((adsGain_t)gain ); 
          Serial1.print("update {\"name\":\"channel1\",\"parameter\":\"gain\",\"value\":"); Serial1.print(gain); Serial1.print("}\n"); Serial1.flush();
        }
       }

      if (command == 'h') {
        int gain = Serial1.parseInt();
        if (gain <= 5) {
           ads2.setGain((adsGain_t)gain ); 
           Serial1.print("update {\"name\":\"channel2\",\"parameter\":\"gain\",\"value\":"); Serial1.print(gain); Serial1.print("}\n"); Serial1.flush();
        }
    }
      if (command == 'i') {
        print_sensor_list();
        Serial1.print("\n");
      }
}
