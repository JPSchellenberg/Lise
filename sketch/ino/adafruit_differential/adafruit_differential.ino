#include <Wire.h>
#include <Adafruit_ADS1015.h>

Adafruit_ADS1115 ads;  /* Use this for the 16-bit version */

int16_t results1, results2;

void setup(void)
{
  Serial.begin(9600);
  while(!Serial){}
  ads.begin();
  ads.setGain(GAIN_ONE);
}

int _sampleRate = 1000;
float multiplier = 0.125F;

void loop(void)
{   
    while (Serial.available() > 0) {
      char command = (char)Serial.read();
      
      if (command == 'v') { Serial.print("version {\"sketch\":\"adafruit_differential\",\"version\":\"0.0.2\"}"); Serial.print("\n"); Serial.flush(); }
      
      if (command == 's') { 
        _sampleRate = Serial.parseInt();
        Serial.print("info samplerate "); Serial.print( _sampleRate ); Serial.print("\n"); Serial.flush();
      }
      
      if (command == 'g') {
        int gain = Serial.parseInt();
        switch (gain) {
          case 0:
             ads.setGain(GAIN_TWOTHIRDS);
             multiplier = 0.1875F;
           break;
           case 1:
             ads.setGain(GAIN_ONE);
             multiplier = 0.125F;
           break;
           case 2:
             ads.setGain(GAIN_TWO);
             multiplier = 0.0625F;
           break;
           case 4:
             ads.setGain(GAIN_FOUR);
             multiplier = 0.03125F;
           break;
           case 8:
             ads.setGain(GAIN_EIGHT);
             multiplier = 0.15625F;
           break;
           case 16:
             ads.setGain(GAIN_SIXTEEN);
             multiplier = 0.0078125F;
           break;
           default:
             Serial.print("info gain No such gain"); Serial.print("\n"); Serial.flush();
           break;
           
        }
      }
    }

  results1 = ads.readADC_Differential_0_1();  
  results2 = ads.readADC_Differential_2_3();  
  
  Serial.print("data ");
  
  Serial.print("{\"time\":");
  Serial.print( millis() );
  Serial.print(",\"channel1\":");
  Serial.print(results1 * multiplier);
  Serial.print(",\"channel2\":");
  Serial.print(results2 * multiplier);
  Serial.print("}");
  Serial.print("\n");
  
  delay( _sampleRate );
  Serial.flush();
}
