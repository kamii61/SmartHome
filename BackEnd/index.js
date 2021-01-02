var express = require("express");
var app = express();
var cors = require("cors");
var pool = require("./db");
/////////
var routes = require("./routes");
var path = require("path");
var fileUpload = require("express-fileupload");
var bodyParser = require("body-parser");

// all environments

app.set("views", __dirname + "/views");
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public")));
app.use(fileUpload());

// development only

//middle ware
app.use(cors());
app.use(express.json()); //req.body
//ROUTES//

//create a smarthome//clients
// app.get("/", routes.index); //call for main index page
// app.post("/", routes.index); //call for signup post
// app.get("/profile/:id", routes.profile);
///////////////

// signup
app.post("/clients/signup", async (req, res) => {
  try {
    const { client_name, client_password, contact, email } = req.body;
    const { client_id } = req.params;
    const newClient = await pool.query(
      "INSERT INTO clients (client_name,client_password,contact,email) VALUES($1,$2,$3,$4) RETURNING *",
      [client_name, client_password, contact, email]
    );
    res.json(newClient.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//login
app.post("/clients/login", async (req, res) => {
  try {
    const { email, client_password } = req.body;

    if (!email || !client_password) {
      return res.status(400).send({ message: "Some values are missing" });
    }

    const getEmailClient = await pool.query(
      "SELECT * FROM clients WHERE email = $1 ",
      [email]
    );
    res.json(getEmailClient.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get all
app.get("/clients", async (req, res) => {
  try {
    const getClient = await pool.query("SELECT * FROM clients");
    res.json(getClient.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//get theo id
app.get("/clients/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getIDClient = await pool.query(
      "SELECT * FROM clients WHERE client_id=$1 ",
      [id]
    );
    res.json(getIDClient.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
app.put("/clients/:id", async (req, res) => {
  try {
    const { client_name, client_password, contact, email } = req.body;
    const { id } = req.params;
    const putClient = await pool.query(
      "UPDATE clients SET client_name=$1,client_password=$2,contact=$3,email=$4  WHERE client_id  = $5",
      [client_name, client_password, contact, email, id]
    );
    res.json("Updated");
  } catch (error) {
    console.error(error.message);
  }
});
app.delete("/clients/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newClient = await pool.query(
      "DELETE FROM clients  WHERE client_id=$1",
      [id]
    );
    res.json("Deleted");
  } catch (error) {
    console.error(error.message);
  }
});
//items
app.post("/items", async (req, res) => {
  try {
    const {
      client_id,
      item_name,
      item_data_description,
      item_status,
    } = req.body;
    const { item_id } = req.params;
    const newItem = await pool.query(
      "INSERT INTO items (client_id,item_name,item_data_description,item_status) VALUES($1,$2,$3,$4) RETURNING *",
      [client_id, item_name, item_data_description, item_status]
    );
    res.json(newItem.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
//get all
app.get("/items", async (req, res) => {
  try {
    const getItem = await pool.query("SELECT * FROM items");
    res.json(getItem.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//get theo id
app.get("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getIDItem = await pool.query(
      "SELECT * FROM items WHERE item_id = $1 ",
      [id]
    );
    res.json(getIDItem.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
//put
app.put("/items/:id", async (req, res) => {
  try {
    const {
      client_id,
      item_name,
      item_data_description,
      item_status,
    } = req.body;
    const { id } = req.params;
    const putItems = await pool.query(
      "UPDATE items SET client_id=$1,item_name=$2,item_data_description=$3,item_status=$4  WHERE item_id  = $5",
      [client_id, item_name, item_data_description, item_status, id]
    );
    res.json("Updated");
  } catch (error) {
    console.error(error.message);
  }
});
//del
app.delete("/items/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delitem = await pool.query("DELETE FROM items  WHERE item_id=$1", [
      id,
    ]);
    res.json("Deleted");
  } catch (error) {
    console.error(error.message);
  }
});

//room
app.post("/rooms", async (req, res) => {
  try {
    const { item_id, room_name, room_image } = req.body;
    const { room_id } = req.params;
    const newRoom = await pool.query(
      "INSERT INTO rooms (item_id,room_name, room_image) VALUES($1,$2,$3) RETURNING *",
      [item_id, room_name, room_image]
    );
    res.json(newRoom.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});

//get all
app.get("/rooms", async (req, res) => {
  try {
    const getRoom = await pool.query("SELECT * FROM rooms");
    res.json(getRoom.rows);
  } catch (error) {
    console.error(error.message);
  }
});
//get theo id
app.get("/rooms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const getIDRoom = await pool.query(
      "SELECT * FROM rooms WHERE room_id = $1 ",
      [id]
    );
    res.json(getIDRoom.rows[0]);
  } catch (error) {
    console.error(error.message);
  }
});
//put
app.put("/rooms/:id", async (req, res) => {
  try {
    const { item_id, room_name, room_image } = req.body;
    const { id } = req.params;
    const putRooms = await pool.query(
      "UPDATE rooms SET item_id=$1,room_name=$2, room_image=$3  WHERE room_id  = $4",
      [item_id, room_name, room_image, id]
    );
    res.json("Updated");
  } catch (error) {
    console.error(error.message);
  }
});
//del
app.delete("/rooms/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const delroom = await pool.query("DELETE FROM rooms  WHERE room_id=$1", [
      id,
    ]);
    res.json("Deleted");
  } catch (error) {
    console.error(error.message);
  }
});

app.listen(8000, () => {
  console.log("server has started on port 8000");
});
