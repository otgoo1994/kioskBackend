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
  const {phone, password} = req.body;

  db.query(sql.login(phone, password), async (err, user) => {
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

exports.getAgentInfo = async (req, res) => {
  const { email } = req.body;
  db.query(sql.selectAgentInfo(email), async (err, info) => {
    if(err) {
      throw err;
    }
    if(info.length > 0) {
      db.query(sql.getAgentProperties(info[0].id), async (err, props) => {
        if(err) {
          throw err;
        }
        res.json({
          status: 200,
          info: info[0],
          props
        });
      });
    } else {
      res.json({
        status: 402
      });
    }
  });
}

exports.forgotPassword = async (req, res) => {
  const { phone } = req.body;
  var rand = Math.random().toString(36).slice(-8);
  console.log(sql.forgotPassword(phone));
  db.query(sql.forgotPassword(phone), async (err, mem) => {
    if (err) {
      throw err;
    }

    if (mem.length > 0) {
      var data = JSON.stringify({
        "username": "FjnrrIJNavyygJr6",
        "password": "EU5LMBLvcWXJ0WM0"
      });

      var config = {
        method: 'post',
        url: 'https://sms.unipay.mn/ws/token/get',
        headers: { 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        let tkn = response.data;
        var config = {
          method: 'get',
          url: 'https://sms.unipay.mn/ws/sms?to=' + phone + '&sms=Hereglegch tanii shinechlegdsen nuuts ug: ' + rand,
          headers: { 
            'Authorization': 'Bearer ' + tkn.access_token
          }
        };
        
        axios(config)
        .then(function (response) {
          db.query(sql.updatePassword(phone, sha256(rand + process.env.SALT)), async err => {
            if (err) {
              throw err;
            }

            res.json({
              status: 200,
              code: rand
            });
          });
        })
        .catch(function (error) {
          res.json({
            status: 403
          });
        });
      })
      .catch(function (error) {
        res.json({
          status: 403
        });
      });
    } else {
      res.json({
        status: 401
      });
    }
  })
}

exports.register = async (req, res) => {
  const { register } = req.body;
  register.password = sha256(register.password + process.env.SALT);
  let generatedCode;
  db.query(sql.checkMemberExisted(register.phone), async (err, mem) => {
    if(err) {
      throw err;
    }
    if (mem.length > 0) {
      res.json({
        status: 409
      });
    } else {
      db.query(sql.addMember(), register, async err => {
        if (err) {
          throw err;
        }

        var data = JSON.stringify({
          "username": "FjnrrIJNavyygJr6",
          "password": "EU5LMBLvcWXJ0WM0"
        });

        var config = {
          method: 'post',
          url: 'https://sms.unipay.mn/ws/token/get',
          headers: { 
            'Content-Type': 'application/json'
          },
          data : data
        };
        
        axios(config)
        .then(function (response) {
          generatedCode = Math.floor(100000 + Math.random() * 900000);
          let tkn = response.data;
          var config = {
            method: 'get',
            url: 'https://sms.unipay.mn/ws/sms?to=' +register.phone + '&sms=Hereglegch tanii batalgaajuulah code: ' + generatedCode,
            headers: { 
              'Authorization': 'Bearer ' + tkn.access_token
            }
          };
          
          axios(config)
          .then(function (response) {
            res.json({
              status: 200,
              code: generatedCode
            });
          })
          .catch(function (error) {
            console.log(error, '==');
            res.json({
              status: 403
            });
          });
        })
        .catch(function (error) {
          console.log(error, '===');
          res.json({
            status: 403
          });
        });

      });
    }
  })
}


exports.verifyCode = async (req, res) => {
  const { verify, phone } = req.body;

  if ( Number(verify.current) === verify.generated) {
    console.log(Number(verify.current), verify.generated, Number(verify.current) === verify.generated);
    db.query(sql.verifyMember(phone), async (err) => {
      if (err) {
        throw err;
      }
      res.json({
        status: 200
      });

    });
  } else {
    res.json({
      status: 403
    });
  }
}