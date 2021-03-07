"use strict";

// MQTT broker
var ip = require("ip");
var mosca = require("mosca");
var settings = { port: 1234 };
var broker = new mosca.Server(settings);
var fs = require("fs");
var path = require("path");
const { parse } = require("path");
const { exit } = require("process");
console.log(
  "Server nodejs chay tai dia chi: " + ip.address() + ":" + settings.port
);
broker.on("ready", () => {
  console.log("Broker is ready!");
});

// broker.on("published", (packet) => {
//   let message = packet.payload;
//   console.log(message.toString());
//   if (message.toString() == "esp32-8860f0bd9e7c") {
//     return 0;
//   } else {
//     let buff = new Buffer.from(message, "base64");
//     //let text = buff.toString("ascii");
//     //console.log(message);
//     console.log("buff", buff);
//     //console.log("mess", message);

//     //fs.writeFileSync("1.png", text);
//     fs.writeFile("1.png", buff, { encoding: "base64" }, function (err, data) {
//       console.log("File created");

//       if (err) {
//         return console.log(err);
//       }
//     });
//   }
//});
broker.on("published", (packet) => {
  var message = packet.payload.toString();

  console.log(message);
});
