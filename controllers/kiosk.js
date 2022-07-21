const mysql = require("mysql");
const nodemailer = require("nodemailer");
const fs = require('fs');

// const db = mysql.createConnection({
//   host: 'localhost',
//   database: 'kiosk',
//   user: 'root',
//   password: ''
// });

const db = mysql.createConnection({
    host: 'localhost',
    database: 'sample_kiosk',
    user: 'root',
    port: 3306,
    password: 'password1010@'
  });

const transporter = nodemailer.createTransport({
  host: 'smtp.mail.mn',
  port: 465,
  secure: true,
  auth: {
    user: 'sales@icbc.mn',
    pass: 'Sales@75117733'
  }
});

const sha256 = require("js-sha256");
const jwt = require('jwt-then');


Date.prototype.addHours = function(h) {
  this.setTime(this.getTime() + (h*60*60*1000));
  return this;
}

exports.login = async (req, res) => {
  const { kioskId } = req.body;
  db.query(`SELECT id, poweron, poweroff from kiosk WHERE code = '${kioskId}'`, async (err, id) => {
      if(err) {
          throw err;
      }
      if(id.length > 0) {
          res.json({
              result: 'success',
              id: id[0]
          });
      } else {
          res.json({
              result: 'failed'
          });
      }
  });
}

exports.getContentForKiosk = async (req, res) => {
    const { detailnumber } = req.body;
    db.query(`SELECT videos, photos, texts, poweron, poweroff from kiosk WHERE code = '${detailnumber}'`, async (err, k) => {
        if(err) {
            res.status(500).json({
                msg: 'something went wrong'
            });
        }

        if(k.length > 0) {
            db.query(`SELECT id, name, active, DATE_FORMAT(created_at, '%Y-%m-%d') as created_at, DATE_FORMAT(end_at, '%Y-%m-%d') as end_at from photos WHERE id in (0, ${k[0].photos})`, async (err, photos) => {
                if(err) {
                    res.status(500).json({
                        msg: 'something went wrong'
                    });
                }
                db.query(`SELECT id, name, active, DATE_FORMAT(created_at, '%Y-%m-%d') as created_at, DATE_FORMAT(end_at, '%Y-%m-%d') as end_at from videos WHERE id in (0, ${k[0].videos})`, async (err, videos) => {
                    if(err) {
                        res.status(500).json({
                            msg: 'something went wrong'
                        });
                    }
                    db.query(`SELECT id, text, active, DATE_FORMAT(created_at, '%Y-%m-%d') as created_at, DATE_FORMAT(end_at, '%Y-%m-%d') as end_at from marguee WHERE id in (0, ${k[0].texts})`, async (err, text) => {
                        if(err) {
                            res.status(500).json({
                                msg: 'something went wrong'
                            });
                        }
                        videos.forEach(eleme => {
                            eleme.size = (fs.statSync("./public/contents/video/" + eleme.name).size / (1024*1024)).toFixed(2);
                        });
                        photos.forEach(eleme => {
                            eleme.size = (fs.statSync("./public/contents/image/slide/" + eleme.name).size / (1024*1024)).toFixed(2);
                        });
                        
                        db.query(`SELECT DATE_FORMAT(date, '%Y-%m-%d %H:%i:%s') as date , live from logfile WHERE kioskId = '${detailnumber}' ORDER BY date DESC`, async (err, logfile) => {
                            if(err) {
                                throw err;
                            }
                            res.json({
                                status: 200,
                                logfile,
                                photos,
                                videos,
                                text,
                                k: k[0]
                            });
                        });
                    });
                });
            });
        } else {
            res.json({
                status: '402',
                msg: 'not found'
            });
        }

    });
}

exports.getPhotos = async (req, res) => {
    var { id } = req.body; 
    db.query(`UPDATE kiosk SET lstRequest = NOW(), live = 1 WHERE code = '${id}'`, async err => {
        if(err) {
            throw err;
        }
        db.query(`SELECT photos, videos, texts from kiosk WHERE code = '${id}'`, async (err, photo) => {
            if(photo.length > 0) {
                db.query(`SELECT * from photos WHERE id in(${photo[0].photos}) AND active = 1`, async (err, photos) => {
                    if(err) {
                        throw err;
                    }
                    db.query(`SELECT * from videos WHERE id in(${photo[0].videos}) AND active = 1`, async (err, videos) => {
                        if(err) {
                            throw err;
                        }
                        db.query(`SELECT * from marguee WHERE id in(${photo[0].texts}) AND active = 1`, async (err, texts) => {
                            if(err) {
                                throw err;
                            }
                            res.json({
                                result: 'success',
                                photos,
                                videos,
                                texts
                            });
                        });
                    });
                });
            } else {
                res.json({
                    result: 'failed'
                });
            }
        });
    });
}
