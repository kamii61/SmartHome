const express = require("express");
const app = express();
const cors = require("cors");
const pool = require("./db");

//middle ware
app.use(cors());
app.use(express.json()); //req.body
//ROUTES//

//create a smarthome//clients
app.post("/clients", async (req, res, next) => {
  try {
    const { client_name, client_password, contact, email } = req.body;
    const { client_id } = req.params;
    const newClient = await pool.query(
      "INSERT INTO clients (client_name,client_password,contact,email) VALUES($1,$2,$3,$4,$5) RETURNING *",
      [client_name, client_password, contact, email]
    );
    res.json(newClient.rows[0]);
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
    const { item_id, room_name } = req.body;
    const { room_id } = req.params;
    const newRoom = await pool.query(
      "INSERT INTO rooms (item_id,room_name) VALUES($1,$2) RETURNING *",
      [item_id, room_name]
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
    const { item_id, room_name } = req.body;
    const { id } = req.params;
    const putRooms = await pool.query(
      "UPDATE rooms SET item_id=$1,room_name=$2  WHERE room_id  = $3",
      [item_id, room_name, id]
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
