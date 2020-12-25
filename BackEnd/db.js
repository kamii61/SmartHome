<<<<<<< HEAD
const Pool = require("pg").Pool;
const pool = new Pool({
  user: "postgres",
  password: "1",
  host: "localhost",
  port: 5432,
  database: "smarthome",
});
module.exports = pool;
=======
const Pool =require ("pg").Pool;
const pool=new Pool({
user:"sysadmin",
password:"1",
host:"localhost",
port:5432,
database:"smarthome"


});
module.exports=pool;
>>>>>>> e86cec3613e572d871f3429e6f9867695a6b526b
