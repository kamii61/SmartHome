#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <ArduinoJson.h>
#include <DHT.h>
#define DHTTYPE DHT11
#define DHTPIN D4
#define Led1 D3

DHT dht(DHTPIN, DHTTYPE);
const char *ssid = "OPPO F9";
const char *password = "12345678";
const char *mqttServer = "192.168.43.129";
const int mqttPort = 1234;
const char *mqttUser = "";
const char *mqttPassword = "";

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

#define mqtt_temp "/dht/tc"
#define mqtt_humi "/dht/hum"


unsigned long timer = 0;
float temp, humi;
StaticJsonDocument<200> doc;
void setup()
{
  Serial.begin(115200);
  dht.begin();
  WiFi.begin(ssid, password);
  Serial.print("Connecting to WiFi");
  while (WiFi.status() != WL_CONNECTED)
  {
    Serial.print(".");
    delay(500);
  }
  Serial.println("Connected to the WiFi network");
  Serial.println(WiFi.localIP());
  pinMode(Led1, OUTPUT);
  digitalWrite(Led1, LOW);
  mqttClient.setServer(mqttServer, mqttPort);
  mqttClient.setCallback(callback);
  while (!mqttClient.connected())
  {
    Serial.println("Connecting to MQTT...");
    if (mqttClient.connect("ESP8266Client"))
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
  mqttClient.subscribe("LED");
  //mqttClient.subscribe("/dht/tc");
}

void loop()
{
  if (millis() - timer > 1000)
  {
    timer = millis();

    temp = dht.readTemperature();
    humi = dht.readHumidity();
//            if (isnan(temp) || isnan(humi))
//            {
//              Serial.println("Failed to read from DHT sensor!");
//              return;
//            }
            Serial.print("Temperature: ");
            Serial.println(temp);
            Serial.print("Humidity: ");
            Serial.println(humi);
    //mqttClient.publish("/dht/tc", String("temp = " + temp +"  humi=" + humi).c_str());
    mqttClient.publish("/dht/tc", String(temp).c_str());
    mqttClient.publish("/dht/hum", String(humi).c_str());
  }

  
  mqttClient.loop();
}

void callback(char* topic, byte* payload, unsigned int lenght)
{
  String data = "";
  for (int i = 0; i < lenght; i++)
  {
    //Serial.print((char)message[i]);
     data += (char)payload[i];
  }

  Serial.println();
  Serial.print("LED1: ");
  Serial.println(data);

  String str = String(topic);
  Serial.println(str);
  DeserializationError error = deserializeJson(doc, data);
  int LED1=doc["led"];
    
  if(str == "LED")
    {
      Serial.print("LED: ");
      Serial.println(data);
      if (LED1 == 1)
      {
        digitalWrite(Led1, HIGH);
      }
      if(LED1 == 0)
      {
        digitalWrite(Led1, LOW);
      }
    }

}
