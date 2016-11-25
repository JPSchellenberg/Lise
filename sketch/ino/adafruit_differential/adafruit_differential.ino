#include <Wire.h>
#include <Adafruit_ADS1015.h>

Adafruit_ADS1115 ads1;  /* Use this for the 16-bit version */
Adafruit_ADS1115 ads2;

int16_t results1, results2;

void setup(void)
{
  Serial.begin(9600);
  while(!Serial){}
  ads1.begin();
  ads2.begin();
  ads1.setGain(GAIN_ONE);
  ads2.setGain(GAIN_ONE);
}

int _sampleRate = 20;
float multiplier1 = 0.125F;
// float multiplier2 = 0.125F;

void loop(void)
{   
    while (Serial.available() > 0) {
      char command = (char)Serial.read();
      
      if (command == 'v') { Serial.print("version {\"name\":\"adafruit_ads1115_differential\",\"version\":\"0.0.4\"}"); Serial.print("\n"); Serial.flush(); }
      
      if (command == 's') { 
        _sampleRate = 1000/Serial.parseInt();
        Serial.print("update {\"name\":\"samplerate\",\"value\":"); Serial.print( 1000/_sampleRate ); Serial.print("}"); Serial.print("\n"); Serial.flush();
      }
      
      if (command == 'g') {
        int gain = Serial.parseInt();
        switch (gain) {
          case 0:
             ads1.setGain(GAIN_TWOTHIRDS);
            //  multiplier1 = 0.1875F; 
           break;
           case 1:
             ads1.setGain(GAIN_ONE);
            //  multiplier1 = 0.125F; 
           break;
           case 2:
             ads1.setGain(GAIN_TWO);
            //  multiplier1 = 0.0625F;
           break;
           case 3:
             ads1.setGain(GAIN_FOUR);
            //  multiplier1 = 0.03125F;
           break;
           case 4:
             ads1.setGain(GAIN_EIGHT);
            //  multiplier1 = 0.15625F;
           break;
           case 5:
             ads1.setGain(GAIN_SIXTEEN);
            //  multiplier1 = 0.0078125F;
           break;
           default:
             Serial.print("info {\"message\": \"No such gain\"}"); Serial.print("\n"); Serial.flush();
           break;
        }
        Serial.print("update {\"name\":\"channel1\",\"parameter\":\"gain\",\"value\":"); Serial.print(gain); Serial.print("}\n"); Serial.flush();

      }

      if (command == 'h') {
        int gain = Serial.parseInt();
        switch (gain) {
          case 0:
             ads2.setGain(GAIN_TWOTHIRDS);
            //  multiplier2 = 0.1875F;
           break;
           case 1:
             ads2.setGain(GAIN_ONE);
            //  multiplier2 = 0.125F; 
           break;
           case 2:
             ads2.setGain(GAIN_TWO);
            //  multiplier2 = 0.0625F;
           break;
           case 3:
             ads2.setGain(GAIN_FOUR);
            //  multiplier2 = 0.03125F;
           break;
           case 4:
             ads2.setGain(GAIN_EIGHT);
            //  multiplier2 = 0.15625F;
           break;
           case 5:
             ads2.setGain(GAIN_SIXTEEN);
            //  multiplier2 = 0.0078125F;
           break;
           default:
             Serial.print("info {\"message\": \"No such gain\"}"); Serial.print("\n"); Serial.flush();
           break; 
      }
      Serial.print("update {\"name\":\"channel2\",\"parameter\":\"gain\",\"value\":"); Serial.print(gain); Serial.print("}\n"); Serial.flush();

    }
   }

  results1 = ads1.readADC_Differential_0_1();  
  results2 = ads2.readADC_Differential_2_3();  
  
  Serial.print("data ");
  
  Serial.print("{\"time\":");
  Serial.print( millis() );
  Serial.print(",\"channel1\":");
  Serial.print((results1 * multiplier1) / 1000); // / 1000 to get V instead of mV
  Serial.print(",\"channel2\":");
  Serial.print((results2 * multiplier1) / 1000 );
  Serial.print("}");
  Serial.print("\n");
  
  delay( _sampleRate );
  Serial.flush();
}
