const jwt = require('jwt-then');
const sql = require('../../config/query');
const sha256 = require("js-sha256");
const axios = require('axios');
const db = require('../../config/sql');
const nodemailer = require('nodemailer');

Date.prototype.addHours = function(h){
  this.setHours(this.getHours()+h);
  return this;
}

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: 'badarch.ogino22@gmail.com',
    pass: 'ddheafxdsjolebze'
  },
});


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

exports.getEmployee = async (req, res) => {
  db.query(sql.getEmployee(), async (err, employee) => {
    if (err) {
      res.status(500).json({
        msg: 'Something went wrong'
      });
    }

    res.json({
      status: 200,
      employee
    });
  });
}

exports.forgotPassword = async (req, res) => {
  const { email } = req.body;
  console.log('====', process.env.MAIL_HOST);
  db.query(sql.checkAdmin(email), async (err, admin) => {
    if (err) {
      res.status(500).json({
        msg: 'Something went wrong'
      });
    }

    if (admin.length > 0) {
      var rand = Math.random().toString(36).slice(-8);
      const password = sha256(rand + process.env.SALT);
      const options = {
        from: '\'gazarmn.mn\' badarch.ogino22@gmail.com',
        to: email,
        subject: "Нууц үг сэргээх хүсэлт",
        html: `<table style="width: 100%;" cellspacing="0" cellpadding="0">
        <tr><td colspan="3" style="height: 50px; background-color: #f6f6f6;"></td></tr>
        <tr>
        <td width="25%" style="background-color: #f6f6f6;"></td>
        <td width="50%" style="background-color: #ffffff; border-radius: 30px;">
          <div align="center" style="margin-bottom: 20px; font-weight: 700; margin-top: 50px;">
            Нууц үг сэргээх
          </div>
        
          <div style="margin-bottom: 10px; padding-left: 50px;">
            Сайн байна уу?
          </div>
        
          <div style="margin-bottom: 50px; padding-left: 50px;">
            Таны шинэчлэгдсэн нууц үг: <b>${rand}</b>
          </div>
        
        </td>
        <td width="25%" style="background-color: #f6f6f6;"></td>
        </tr>
        <tr><td colspan="3" style="height: 50px; background-color: #f6f6f6;">
        <div align="center" style="margin-top: 10px; margin-bottom: 50px;">© <a href="javascript:;"><strong>gazarmn</strong></a> - All rights reserved.</div>
        </td></tr>
        </table>`,
      };
  
      let result = await transporter.sendMail(options);

      if (result) {
        db.query(sql.updateAdminPassword(email, password), async err => {
          if(err) {
            res.status(500).json({
              msg: 'Something went wrong'
            });
          } 

          res.json({
            status: 200,
            message: 'success password restored' 
          });
        });
      }
    } else {
      res.json({
        status: 404
      });
    }
  });
}


exports.lastProperties = async (req, res) => {
  const { approved, report } = req.body;
  db.query(sql.getNotApproved(approved ? approved : 0, report ? true : false), async (err, props) => {
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

exports.addEmployee = async (req, res) => {
  const { user } = req.body;
  db.query(sql.getEmployee(user.email), async (err, check) => {
    if (err) {
      throw err;
    }

    if (check.length > 0) {
      res.json({
        status: 409
      });
    } else {
      db.query(sql.addEmployee(user), async err => {
        if (err) {
          throw err;
        }

        res.json({
          status: 200
        });
      })
    }
  })
}

exports.removeEmployee = async (req, res) => {
  const { id } = req.body;
  db.query(sql.removeEmployee(id), async ( err) => {
    if (err) {
      throw err;
    }

    res.json({
      status: 200
    });
  });
}

exports.removeProperty = async (req, res) => {
  const { propertyId } = req.body;
  if (!propertyId) {
    return res.json({
      status: 402
    });
  }

  db.query(sql.removeProperty(propertyId), async (err) => {
    if (err) {
      throw err;
    }

    res.json({
      status: 200
    });
  });
}

exports.updateReport = async (req, res) => {
  const { propertyId, resolve } = req.body;
  if (!propertyId || !resolve) {
    return res.json({
      status: 402
    });
  }

  db.query(sql.updateReport(propertyId, resolve), async (err) => {
    if (err) {
      throw err;
    }

    res.json({
      status: 200
    });
  });
}