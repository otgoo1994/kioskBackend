const jwt = require("jwt-then");
const mysql = require("mysql");


const db = mysql.createConnection({
  host: 'localhost',
  database: 'kiosk',
  user: 'root',
  password: ''
});

// const db = mysql.createConnection({
//   host: 'localhost',
//   database: 'sample_kiosk',
//   user: 'sample_kiosk',
//   port: 3306,
//   password: 'password1010@'
// });

module.exports = async (req, res, next) => {
  try {    
    if (!req.headers.authorization) throw "Forbidden!!";
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');
    req.payload = payload;
    let qry = `SELECT id from users WHERE id = ${payload.id}`;
    db.query(qry, async (err, result) => {
      if(err) {
        throw err;
      }
      if(result.length > 0) {
        next();
      } else {
        return res.status(401).json({
          message: "Access denied"
        });
      }
    });
  } catch (err) {
    res.status(401).json({
      message: "Forbidden",
    });
  }
};