#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <DHT.h> // Gọi thư viện DHT22
#include <ArduinoJson.h>
const int DHTPIN = D4; //Đọc dữ liệu từ DHT22 ở chân A3 trên mạch Arduino
const int DHTTYPE = DHT11; //Khai báo loại cảm biến, có 2 loại là DHT11 và DHT22
const int led1 = D0;//D5;
const int led2 = D1;//D4;
DHT dht(DHTPIN, DHTTYPE);
const char *ssid = "B804_AIOT_Wifi_2.4GHz";
const char *password = "B84@aiot";

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);


const char *mqttServer = "192.168.1.117";
const int mqttPort = 1883;
const char *mqttUser = "iotlab";
const char *mqttPassword = "iotlab";

char *publishTc = "/dht/tc";
char *publishHum = "/dht/hum";
char *subcribeTopic = "LED";

  
  String value =""; 
unsigned long timer = 0;
StaticJsonDocument<200> doc;
void setup()
{
   
    Serial.begin(115200);
    dht.begin();
    pinMode(led1, OUTPUT);
    pinMode(led2, OUTPUT);
    WiFi.begin(ssid, password);

    Serial.print("Connecting to WiFi");
    while (WiFi.status() != WL_CONNECTED)
    {
        Serial.print(".");
        delay(500);
    }
    Serial.println("Connected to the WiFi network");
    Serial.println(WiFi.localIP());

    mqttClient.setServer(mqttServer, mqttPort);
    mqttClient.setCallback(callback);
    while (!mqttClient.connected())
    {
        Serial.println("Connecting to MQTT...");
        if (mqttClient.connect("ESP8266Client", mqttUser, mqttPassword))
        {
            Serial.println("connected");
        }
        else
        {
            Serial.print("Failed with state ");
            Serial.println(mqttClient.state());
            delay(1000);
        }
    }
    mqttClient.subscribe(subcribeTopic);
}

void loop()
{
  if(!mqttClient.connected())
    {
        Serial.println("Connecting to MQTT...");
        if (mqttClient.connect("ESP8266Client", mqttUser, mqttPassword))
        {
            Serial.println("connected");
        }
        else
        {
            Serial.print("Failed with state ");
            Serial.println(mqttClient.state());
            delay(1000);
        }
    }
    
//        value = "Hum: " + String(dht.readHumidity()) + " Tem: " + String(dht.readTemperature());
//        Serial.println(value);
    if (millis() - timer > 1000)
    {
        timer = millis();
        mqttClient.publish(publishHum, String(dht.readHumidity()).c_str());
        mqttClient.publish(publishTc, String(dht.readTemperature()).c_str());
    }
    mqttClient.loop();
}

void callback(char *topic, byte *payload, unsigned int lenght)
{
    String data = "";
    for (int i = 0; i < lenght; i++)
    {
        data += (char)payload[i];
    }
    Serial.print("receive: ");
    Serial.println(data);
    
    DeserializationError error = deserializeJson(doc, data);
  
    if (error) {
      Serial.print(F("deserializeJson() failed: "));
//      Serial.println(error.f_str());
      return;
    }
    int sig1 = doc["led"][0];
    int sig2 = doc["led"][1];
    
    if(sig1 ==1){
        digitalWrite(led1, HIGH);
    }
    else if (sig1 ==0)
      digitalWrite(led1, LOW);
    
   if(sig2 ==1){
        digitalWrite(led2, HIGH);
    } 
   else if (sig2 ==0)
      digitalWrite(led2, LOW);

    
   
    

    
}

void ReadDHT(){
  
//   h = dht.readHumidity(); 
//  ​ t = dht.readTemperature();
//    ​Serial.println("Arduino.vn");
//    ​Serial.print("Nhiet do: ");
//    ​Serial.println(t); 
//    ​Serial.print("Do am: ");
//    ​Serial.println(h); 
 
}
