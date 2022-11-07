const jwt = require("jwt-then");
const db = require('../../config/sql');

module.exports = async (req, res, next) => {
  try {    
    if (!req.headers.authorization) throw "Forbidden!!";
    const token = req.headers.authorization.split(" ")[1];
    const payload = await jwt.verify(token, 'HS256');
    req.payload = payload;
    let qry = `SELECT id from employee WHERE id = ${payload.id}`;
    db.query(qry, async (err, result) => {
      if(err) {
        throw err;
      }
      if(result.length > 0) {
        next();
      } else {
        return res.json({
          status: 401,
          message: "Access denied"
        });
      }
    });
  } catch (err) {
    res.json({
      status: 401,
      message: "Forbidden",
    });
  }
};