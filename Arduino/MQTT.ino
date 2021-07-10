#include <ESP8266WiFi.h>
#include <PubSubClient.h>
#include <DHT.h> // Gọi thư viện DHT22
#include <ArduinoJson.h>
#include <Servo.h>
const int DHTPIN = D4;     //Đọc dữ liệu từ DHT22 ở chân A3 trên mạch Arduino
const int DHTTYPE = DHT11; //Khai báo loại cảm biến, có 2 loại là DHT11 và DHT22
const int led1 = D0;       //D5;
const int led2 = D8;       //D4;
const int gas = D2;
const int gasD = D1;
const int ldr = A0;
const int servo = D5;
const int pir = D6;
const int relay = 13; //d7

int incomingByte = 0; // for incoming serial data


DHT dht(DHTPIN, DHTTYPE);
Servo myservo;

const char *ssid = "Chau Vit 3  Bang";
const char *password = "0933008741";

WiFiClient wifiClient;
PubSubClient mqttClient(wifiClient);

const char *mqttServer = "192.168.1.6";
const int mqttPort = 1234;
const char *mqttUser = "";
const char *mqttPassword = "";

char *publishTc = "/dht/tc";
char *publishHum = "/dht/hum";
char *subcribeTopic = "LED";
char *subcribeAuto = "Auto";
char *publishGas = "/gas";
char *publishLdr = "/ldr";
char *publishPir = "/pir";

String value = "";
unsigned long timer = 0;
StaticJsonDocument<200> doc;
void setup()
{

    Serial.begin(115200);
    dht.begin();
    pinMode(led1, OUTPUT);
    pinMode(led2, OUTPUT);
    pinMode(relay, OUTPUT);
    myservo.attach(servo);
    myservo.write(0);
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
     mqttClient.subscribe(subcribeAuto);
}

void loop()
{
    int valGas = analogRead(gas);
    int valLdr = analogRead(ldr);
    int valPir = digitalRead(pir);
  
    if (Serial.available() > 0) {
    // read the incoming byte:
    incomingByte = Serial.read();
    valGas = incomingByte;
    
    // say what you got:
    Serial.print("I received: ");
    Serial.println(incomingByte, DEC);
  }

    if (!mqttClient.connected())
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

//            value = "Hum: " + String(dht.readHumidity()) + " Tem: " + String(dht.readTemperature());
//            Serial.println(value);
//            Serial.print("gas: ");
//            Serial.println(valGas);
//      
//             Serial.print("LDR: ");
//            Serial.println(valLdr);
    if (millis() - timer > 1000)
    {
        timer = millis();
        mqttClient.publish(publishHum, String(dht.readHumidity()).c_str());
        mqttClient.publish(publishTc, String(dht.readTemperature()).c_str());
        mqttClient.publish(publishGas, String(valGas).c_str());
        mqttClient.publish(publishLdr, String(valLdr).c_str());
        mqttClient.publish(publishPir, String(valPir).c_str());
    }
    mqttClient.loop();
    delay(2000);
}

void callback(char *topic, byte *payload, unsigned int lenght)
{
  int checkRelay =0;
  int checkServo = 0;
  
    String data = "";
    for (int i = 0; i < lenght; i++)
    {
        data += (char)payload[i];
    }
    Serial.print("receive: ");
    Serial.println(data);

    DeserializationError error = deserializeJson(doc, data);

    if (error)
    {
        Serial.print(F("deserializeJson() failed: "));
        //      Serial.println(error.f_str());
        return;
    } 
    int sig2 = doc["led"][1];
    int sig3 = doc["led"][2];
    int sig4 = doc["led"][3];
    Serial.println(sig1);


    if (sig1 == 1)
    {
        digitalWrite(led1, HIGH);
    }
    else if (sig1 == 0)
        digitalWrite(led1, LOW);

    if (sig2 == 1)
    {
        digitalWrite(led2, HIGH);
    }
    else if (sig2 == 0)
        digitalWrite(led2, LOW);

    if (sig3 == 1 && checkRelay == 0)
    {
        digitalWrite(relay, HIGH);
        checkRelay = 1;
    }
    else if (sig3 == 0 && checkRelay == 1)
       { digitalWrite(relay, LOW);
          checkRelay = 0;
       }
    if (sig4 == 1 && checkRelay == 0)
    {
        myservo.write(180);
        delay(3000);
        myservo.write(90);
        checkRelay = 1;
    }
    else if (sig4 == 0 && checkRelay == 1)
    {
        myservo.write(0);
        delay(3000);
        myservo.write(90);
        checkRelay = 0;
    }

// auto

    int sig5 = doc["autoButton"][0];
    int sig6 = doc["autoButton"][1];
        if (sig5 == 1)
    {
       digitalWrite(led1, HIGH);
        delay(1000);
    }
    else if (sig5 == 0)
    {
       digitalWrite(led1, LOW);
        delay(1000);
    }
}

void ReadDHT()
{

    //   h = dht.readHumidity();
    //  ​ t = dht.readTemperature();
    //    ​Serial.println("Arduino.vn");
    //    ​Serial.print("Nhiet do: ");
    //    ​Serial.println(t);
    //    ​Serial.print("Do am: ");
    //    ​Serial.println(h);
}