// MQTT broker
var ip = require("ip");
var mosca = require("mosca");
var settings = { port: 1234 };
var broker = new mosca.Server(settings);
console.log(
  "Server nodejs chay tai dia chi: " + ip.address() + ":" + settings.port
);
broker.on("ready", () => {
  console.log("Broker is ready!");
});

broker.on("published", (packet) => {
  message = packet.payload.toString();
  console.log(message);
});
