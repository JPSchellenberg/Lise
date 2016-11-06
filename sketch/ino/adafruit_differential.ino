#include <Wire.h>
#include <Adafruit_ADS1015.h>

Adafruit_ADS1115 ads;  /* Use this for the 16-bit version */

int16_t results1, results2;

void setup(void)
{
  Serial.begin(9600);
  while(!Serial){}
  ads.begin();
}

void loop(void)
{
  
  if (Serial.available()) {
    int command = Serial.read();
    switch(command) {
      case 118:
        Serial.println("version {\"sketch\":\"adafruit_differential\",\"version\":\"0.0.1\"}");
      break;
    }
  }

  results1 = ads.readADC_Differential_0_1();  
  results2 = ads.readADC_Differential_2_3();  
  
  Serial.print("data ");
  
  Serial.print("{\"time\":");
  Serial.print( millis() );
  Serial.print(",\"channel1\":");
  Serial.print(results1);
  Serial.print(",\"channel2\":");
  Serial.print(results2);
  Serial.print("}");
  Serial.print("\n");
  
  delay(50);
}
