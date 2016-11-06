#include <Wire.h>
#include <Adafruit_ADS1015.h>

Adafruit_ADS1115 ads;  /* Use this for the 16-bit version */

int16_t results1, results2;

void setup(void)
{
  Serial1.begin(9600);
  while(!Serial1){}
  ads.begin();
  ads.setGain(GAIN_ONE);
}

int _sampleRate = 1000;

void loop(void)
{   
    while (Serial1.available() > 0) {
      char command = (char)Serial1.read();
      
      if (command == 'v') { Serial1.print("version {\"sketch\":\"adafruit_differential\",\"version\":\"0.0.2\"}"); Serial1.print("\n"); Serial1.flush(); }
      
      if (command == 's') { 
        _sampleRate = Serial1.parseInt();
        Serial1.print("info samplerate "); Serial1.print( _sampleRate ); Serial1.print("\n"); Serial1.flush();
      }
      
      if (command == 'g') {
        int gain = Serial1.parseInt();
        switch (gain) {
          case 0:
             ads.setGain(GAIN_TWOTHIRDS);
           break;
           case 1:
             ads.setGain(GAIN_ONE);
           break;
           case 2:
             ads.setGain(GAIN_TWO);
           break;
           case 4:
             ads.setGain(GAIN_FOUR);
           break;
           case 8:
             ads.setGain(GAIN_EIGHT);
           break;
           case 16:
             ads.setGain(GAIN_SIXTEEN);
           break;
           default:
             Serial1.print("info gain No such gain"); Serial1.print("\n"); Serial1.flush();
           break;
           
        }
      }
    }

  results1 = ads.readADC_Differential_0_1();  
  results2 = ads.readADC_Differential_2_3();  
  
  Serial1.print("data ");
  
  Serial1.print("{\"time\":");
  Serial1.print( millis() );
  Serial1.print(",\"channel1\":");
  Serial1.print(results1);
  Serial1.print(",\"channel2\":");
  Serial1.print(results2);
  Serial1.print("}");
  Serial1.print("\n");
  
  delay( _sampleRate );
  Serial1.flush();
}
