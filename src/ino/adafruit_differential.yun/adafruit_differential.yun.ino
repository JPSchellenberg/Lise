#include <Wire.h>
#include <Adafruit_ADS1015.h>

Adafruit_ADS1115 ads;  /* Use this for the 16-bit version */

int16_t results1, results2;

void setup(void)
{
  Serial1.begin(9600);
  while(!Serial1){}
  ads.begin();
}

void loop(void)
{
  
  if (Serial1.available()) {
    int command = Serial1.read();
    switch(command) {
      case 118:
        Serial1.println("version {\"sketch\":\"adafruit_differential\",\"version\":\"0.0.1\"}");
      break;
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
  
  delay(50);
}
