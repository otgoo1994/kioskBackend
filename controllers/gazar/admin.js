const jwt = require('jwt-then');
const sql = require('../../config/query');
const sha256 = require("js-sha256");
const axios = require('axios');
const db = require('../../config/sql');

Date.prototype.addHours = function(h){
  this.setHours(this.getHours()+h);
  return this;
}

exports.login = async (req, res) => {
  const {username, password} = req.body;
  db.query(sql.adminLogin(username, password), async (err, user) => {
    if(err) {
      res.status(500).json({
        msg: 'Something went wrong'
      });
    }
    if(user.length > 0) {
      const expired = new Date().addHours(24).valueOf();
      const token  = await jwt.sign({ id: user[0].id, expired },  'HS256');

      res.json({
        status: 200,
        token,
        user: user[0]
      });

    } else {
      res.json({
        status: 404
      });
    }
  });
}


exports.lastProperties = async (req, res) => {
  db.query(sql.getNotApproved(), async (err, props) => {
    if (err) {
      throw err;
    }

    res.json({
      status: 200,
      props
    });
  });
}

exports.approveProperty = async (req, res) => {
  const { propertyId } = req.body;
  db.query(sql.aproveProperty(propertyId, req.payload.id), async err => {
    if (err) {
      throw err;
    }

    res.json({
      status: 200
    });
  });
}