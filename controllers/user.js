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
  password: 'AVNS_OVLR3V3VHsxDLKq2fez'
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

exports.changeRuntime = async (req, res) => {
  const { poweron, poweroff, kiosk } = req.body;
  db.query(`UPDATE kiosk SET poweron = '${poweron}', poweroff = '${poweroff}' WHERE code = '${kiosk}'`, async err => {
    if(err) {
      throw err;
    }
    res.json({
      result: 200
    });
  });
}

exports.removeTextFromKiosk = async (req, res) => {
  const { id, kiosk } = req.body;
  db.query(`SELECT texts FROM kiosk WHERE code = '${kiosk}'`, async (err, photos) => {
    if(err) {
      throw err;
    }
    if(photos.length > 0) {
      if(!photos[0].texts) {
        res.json({
          result: 402
        });
      } else {
        var code = photos[0].texts.split(',');
        code.forEach((eleme, idx) => {
          if(eleme == id) {
            code.splice(idx, 1)
          }
        });
        db.query(`UPDATE kiosk SET texts = '${code.toString()}' WHERE code = '${kiosk}'`, async err => {
          if(err) {
            throw err;
          }
          res.json({
            result: 200
          });
        });
      }
    } else {
      res.json({
        result: 402
      });
    }    
  });
}

exports.removePhotoFromKiosk = async (req, res) => {
  const { id, kiosk } = req.body;
  db.query(`SELECT photos FROM kiosk WHERE code = '${kiosk}'`, async (err, photos) => {
    if(err) {
      throw err;
    }
    if(photos.length > 0) {
      if(!photos[0].photos) {
        res.json({
          result: 402
        });
      } else {
        var code = photos[0].photos.split(',');
        code.forEach((eleme, idx) => {
          if(eleme == id) {
            code.splice(idx, 1)
          }
        });
        db.query(`UPDATE kiosk SET photos = '${code.toString()}' WHERE code = '${kiosk}'`, async err => {
          if(err) {
            throw err;
          }
          res.json({
            result: 200
          });
        });
      }
    } else {
      res.json({
        result: 402
      });
    }
    
  });
}

exports.removeVideoFromKiosk = async (req, res) => {
  const { id, kiosk } = req.body;
  db.query(`SELECT videos FROM kiosk WHERE code = '${kiosk}'`, async (err, photos) => {
    if(err) {
      throw err;
    }
    if(photos.length > 0) {
      if(!photos[0].videos) {
        res.json({
          result: 402
        });
      } else {
        var code = photos[0].videos.split(',');
        code.forEach((eleme, idx) => {
          if(eleme == id) {
            code.splice(idx, 1)
          }
        });
        db.query(`UPDATE kiosk SET videos = '${code.toString()}' WHERE code = '${kiosk}'`, async err => {
          if(err) {
            throw err;
          }
          res.json({
            result: 200
          });
        });
      }
    } else {
      res.json({
        result: 402
      });
    }
  });
}

formatDate = function (date) {
  var d = new Date(date),
      month = '' + (d.getMonth() + 1),
      day = '' + d.getDate(),
      year = d.getFullYear();

  if (month.length < 2) 
      month = '0' + month;
  if (day.length < 2) 
      day = '0' + day;

  return [year, month, day].join('-');
}


exports.updateEndAt = async (req, res) => {
  const { row } = req.body;
  db.query(`UPDATE photos SET end_at = '${formatDate(row.changed_at)}', active = 1, description = '${row.changed_desc}' WHERE id = ${row.id}`, async (err) => {
    if(err) {
      throw err;
    }
    res.json({
      result: 200
    });
  });
}

exports.updateMarqueeEndAt = async (req, res) => {
  const { row } = req.body;
  db.query(`UPDATE marguee SET end_at = '${formatDate(row.changed_at)}', active = 1 WHERE id = ${row.id}`, async (err) => {
    if(err) {
      throw err;
    }
    res.json({
      result: 200
    });
  });
}

exports.updateVideoEndAt = async (req, res) => {
  const { row } = req.body;
  db.query(`UPDATE videos SET end_at = '${formatDate(row.changed_at)}', active = 1, description = '${row.changed_desc}' WHERE id = ${row.id}`, async (err) => {
    if(err) {
      throw err;
    }
    res.json({
      result: 200
    });
  });
}

exports.addTextToKiosk = async (req, res) => {
  const { kiosk, id } = req.body;
  if(id != undefined) {
    for (const k of kiosk) {
      await checkTextAddedToKiosk(id, k);
    }
    res.json({
      result: 'success'
    });
  } else {
    res.json({
      result: 'failed'
    });
  }
}

exports.getTexts = async (req, res) => {
  db.query(`SELECT id, text, DATE_FORMAT(created_at, '%Y-%m-%d') as created_at, DATE_FORMAT(end_at, '%Y-%m-%d') as end_at, DATE_FORMAT(end_at, '%Y-%m-%d') as changed_at, false as isChange from marguee`, async (err, id) => {
      if(err) {
          throw err;
      }
      res.json({
        result: 'success',
        marquee: id
    });
  });
}

exports.addText = async (req, res) => {
  const { text } = req.body;
  text.created_at = new Date(text.created_at);
  text.end_at = new Date(text.end_at);
  db.query('INSERT INTO marguee SET ?', text, async err => {
    if(err) {
       throw err;
    }
    res.json({
      result: 'success'
    });
  });
}

exports.deleteText = async (req, res) => {
  const { id } = req.body;
  db.query(`DELETE FROM marguee WHERE id = ${id}`, async err => {
    if(err) {
      throw err;
    }
    res.json({
      result: 'success'
    });
  });
}

exports.login = async (req, res) => {
  const {email, password} = req.body;
  console.log(email);
  // const user = await User.findOne({email, password: sha256(password + process.env.SALT)});
  let qry = `SELECT id, lastname, firstname, image, email, phone, city, district, address, permission from users WHERE email = '${email}' AND password = '${sha256(password + process.env.SALT)}'`;
  db.query(qry, async (err, user) => {
    if(err) {
      throw err;
    }
    if(user.length > 0) {
      const token  = await  jwt.sign({
        id: user[0].id
      }, 
      'HS256');
      res.json({
        result: 'success',
        user: user[0],
        token
      });
    } else {
      res.json({
        result: 'failed'
      });
    }
  });
}

exports.getAllKiosk = async (req, res) => {
  db.query(`SELECT k.id, k.code, k.address, c.cityname, d.districtname, live, k.photos, k.videos from city as c inner join kiosk as k on c.id = k.city inner join district as d on k.district = d.id`, async (err, kiosk) => {
    if(err) {
      throw err;
    }
    db.query(`SELECT id, name from photos WHERE active = 1`, async (err, photos) => {
      if(err) {
        throw err
      }
      db.query(`SELECT id, name from videos WHERE active = 1`, async (err, videos) => {
        if(err) {
          throw err;
        }
        res.json({
          result: 'success',
          kiosk,
          photos,
          videos
        });
      });
    });
  });
}

exports.getNewKioskInfo = async (req, res) => {
  db.query(`SELECT * from city`, async (err, city) => {
    if(err) {
      throw err;
    }
    db.query(`SELECT * from district`, async (err, district) => {
      if(err) {
        throw err;
      }
      res.json({
        result: 'success',
        city,
        district
      });
    });
  });
}

exports.addNewCity = async (req, res) => {
  const { city } = req.body;
  db.query(`SELECT id from city WHERE cityname = '${city}'`, async (err, check) => {
    if(err) {
      throw err;
    }
    if(check.length > 0) {
      res.json({
        result: 'already_exist'
      });
    } else {
      db.query(`INSERT INTO city VALUES('', '${city}')`, async err => {
        if(err) {
          throw err;
        }
        res.json({
          result: 'success'
        });
      });
    }
  });
}

exports.addNewDistrict = async (req, res) => {
  const { city, district } = req.body;
  db.query(`SELECT id from district WHERE districtname = '${district}' AND cityId = ${city}`, async (err, check) => {
    if(err) {
      throw err;
    }
    if(check.length > 0) {
      res.json({
        result: 'already_exist'
      });
    } else {
      db.query(`INSERT INTO district VALUES('', ${city}, '${district}')`, async err => {
        if(err) {
          throw err;
        }
        res.json({
          result: 'success'
        });
      });
    }
  });
}

exports.addNewKiosk = async (req, res) => {
  const { kiosk } = req.body;
  kiosk.lstRequest = 'NOW()';
  console.log(kiosk);
  var n = `INSERT INTO kiosk SET ?`;
  db.query(`SELECT id from kiosk WHERE code = '${kiosk.code}'`, async (err, check) => {
    if(err) {
      throw err;
    }
    if(check.length > 0) {
      res.json({
        result: 'duplicate'
      });
    } else {
      db.query(n, kiosk, async err => {
        if(err) {
          throw err;
        }
        res.json({
          result: 'success'
        });
      });
    }
  });
}

exports.deleteKiosk = async (req, res) => {
  const { id } = req.body;
  db.query(`DELETE from kiosk WHERE id = ${id}`, async err => {
    if(err) {
      throw err;
    }
    res.json({
      result: 'success'
    });
  });
}

exports.photoUpload = async (req, res) => {
  let { info } = req.body;
  info = JSON.parse(info);
  const image = req.files.photo;
  const type = image.mimetype.split("/")[1];
  const token = req.headers.authorization.split(" ")[1];
  const payload = await jwt.verify(token, 'HS256');
  const time = Date.now();
  const imageName = "p-" + time + "." + type;
  image.mv("./public/contents/image/slide/" + imageName, function (err) {
    if(err) {
      throw err;
    }
    let n = `INSERT INTO photos SET ?`;
    let post = { name: imageName, created_at: new Date(info.created_at), end_at: new Date(info.end_at), userId: payload.id, active: 1, extn: type, description: info.description };
    
    db.query(n, post, async err => {
      if(err) {
        throw err;
      }
      res.json({
        result: 'success'
      });
    });
  });
}


exports.videoUpload = async (req, res) => {
  let { info } = req.body;
  info = JSON.parse(info);
  const video = req.files.video;
  const type = video.mimetype.split("/")[1];
  const token = req.headers.authorization.split(" ")[1];
  const payload = await jwt.verify(token, 'HS256');
  const time = Date.now();
  const videoName = "v-" + time + "." + type;
  video.mv("./public/contents/video/" + videoName, function (err) {
    if(err) {
      throw err;
    }
    let n = `INSERT INTO videos SET ?`;
    let post = { name: videoName, created_at: new Date(info.created_at), end_at: new Date(info.end_at), userId: payload.id, active: 1, extn: video.mimetype, description: info.description };
    
    db.query(n, post, async err => {
      if(err) {
        throw err;
      }
      res.json({
        result: 'success'
      });
    });
  });
}

exports.getVideos = async (req, res) => {
  let q = `SELECT p.id, p.extn, p.name, p.description, p.description as changed_desc, DATE_FORMAT(p.created_at, '%Y-%m-%d') as created_at, DATE_FORMAT(p.end_at, '%Y-%m-%d') as end_at, DATE_FORMAT(p.end_at, '%Y-%m-%d') as changed_at, p.active, u.firstname, false as isChange, false as descChange from videos as p inner join users as u on p.userId = u.id`;
  db.query(q, async (err, video) => {
    if(err) {
      throw err;
    }
    video.forEach(eleme => {
      eleme.size = (fs.statSync("./public/contents/video/" + eleme.name).size / (1024*1024)).toFixed(2);
    });
    
    res.json({
      result: 'success',
      video
    });
  });
}

exports.getPhotos = async (req, res) => {
  let q = `SELECT p.id, p.name, p.description, p.description as changed_desc, DATE_FORMAT(p.created_at, '%Y-%m-%d') as created_at, DATE_FORMAT(p.end_at, '%Y-%m-%d') as end_at, DATE_FORMAT(p.end_at, '%Y-%m-%d') as changed_at, p.active, u.firstname, false as isChange, false as descChange from photos as p inner join users as u on p.userId = u.id`;
  db.query(q, async (err, photo) => {
    if(err) {
      throw err;
    }
    photo.forEach(eleme => {
      eleme.size = (fs.statSync("./public/contents/image/slide/" + eleme.name).size / (1024*1024)).toFixed(2);
    });
    res.json({
      result: 'success',
      photo
    });
  });
}

exports.updatePhotoActive = async (req, res) => {
  const { id, active } = req.body;
  db.query(`UPDATE photos SET active = ${active} WHERE id = ${id}`, async err => {
    if(err) {
      throw err;
    }
    res.json({
      result: 'success'
    });
  });
}

exports.updateVidoActive = async (req, res) => {
  const { id, active } = req.body;
  db.query(`UPDATE videos SET active = ${active} WHERE id = ${id}`, async err => {
    if(err) {
      throw err;
    }
    res.json({
      result: 'success'
    });
  });
}

exports.deletePhoto = async (req, res) => {
  const { id } = req.body;
  var qr = '';
  db.query(`SELECT name from photos WHERE id = ${id}`, async (err, check) => {
    if(err) {
      throw err;
    }
    
    db.query(`SELECT photos, id from kiosk WHERE photos LIKE '%${id}%'`, async (err, checker) => {
      if(err) {
        throw err;
      }
      checker.forEach(el => {
        var code = el.photos.split(',');
        var codes = '';
        if(code.includes(String(id))) {
          code.forEach(c => {
            if(c != id) {
              if(codes == '') {
                codes = `${c}`;
              } else {
                codes += `,${c}`
              }
            }
          });
          qr += ` WHEN id = '${el.id}' THEN '${codes}'`;
        } 
      });
      

      if(check.length > 0) {
        if(fs.existsSync("./public/contents/image/slide/" + check[0].name)){
          fs.unlinkSync("./public/contents/image/slide/" + check[0].name); 
        }
        db.query(`DELETE from photos WHERE id = ${id}`, async err => {
          if(err) {
            throw err;
          }
          db.query(`UPDATE kiosk SET photos = (CASE ${qr} END)`, async err => {
            if(err) {
              throw err;
            }
            res.json({
              result: 'success'
            });
          });
        });
      }
    });
  });
}

exports.deleteVideo = async (req, res) => {
  const { id } = req.body;
  var qr = '';
  db.query(`SELECT name from videos WHERE id = ${id}`, async (err, check) => {
    if(err) {
      throw err;
    }
    
    db.query(`SELECT videos, id from kiosk WHERE videos LIKE '%${id}%'`, async (err, checker) => {
      if(err) {
        throw err;
      }
      checker.forEach(el => {
        var code = el.videos.split(',');
        var codes = '';
        if(code.includes(String(id))) {
          code.forEach(c => {
            if(c != id) {
              if(codes == '') {
                codes = `${c}`;
              } else {
                codes += `,${c}`
              }
            }
          });
          qr += ` WHEN id = '${el.id}' THEN '${codes}'`;
        } 
      });
      

      if(check.length > 0) {
        if(fs.existsSync("./public/contents/video/" + check[0].name)){
          fs.unlinkSync("./public/contents/video/" + check[0].name); 
        }
        db.query(`DELETE from videos WHERE id = ${id}`, async err => {
          if(err) {
            throw err;
          }
          db.query(`UPDATE kiosk SET videos = (CASE ${qr} END)`, async err => {
            if(err) {
              throw err;
            }
            res.json({
              result: 'success'
            });
          });
        });
      }
    });
  });
}

exports.updatePhotoKiosk = async (req, res) => {
  const { kiosk, id } = req.body;
  if(id != undefined) {
    db.query(`SELECT photos from kiosk WHERE code = '${kiosk}'`, async (err, check) => {
      if(err) {
        throw err;
      }
      if(check.length > 0) {
        var code = check[0].photos.split(',');
        if(code.includes(String(id))) {
          res.json({
            result: 'duplicate'
          });
        } else {
          var c = `${id}`;
          code.forEach(el => {
            if(el != '') {
              c += ',' + el;
            }
          });
          db.query(`UPDATE kiosk SET photos = '${c}' WHERE code = '${kiosk}'`, async err => {
            if(err) {
              throw err;
            }
            res.json({
              result: 'success'
            });
          });
        }
      } else {
        res.json({
          result: 'failed'
        });
      }
    });
  } else {
    res.json({
      result: 'failed'
    });
  }
}
checkPhotoAddedToKiosk = async function ( id, kiosk ) {
  return new Promise(function(resolve, reject){
    db.query(`SELECT photos from kiosk WHERE code = '${kiosk}'`, async (err, check) => {
      if(err) {
        throw err;
      }
      if(check.length > 0) {
        if(check[0].photos == null) {
          db.query(`UPDATE kiosk SET photos = '${id}' WHERE code = '${kiosk}'`, async err => {
            if(err) {
              throw err;
            }
            return resolve(id);
          });
        } else {
          var code = check[0].photos.split(',');
          if(code.includes(String(id))) {
            return resolve(id);
          } else {
            var c = `${id}`;
            code.forEach(el => {
              if(el != '') {
                c += ',' + el;
              }
            });
            db.query(`UPDATE kiosk SET photos = '${c}' WHERE code = '${kiosk}'`, async err => {
              if(err) {
                throw err;
              }
              return resolve(id);
            });
          }
        }
        
      } else {
        return resolve(0);
      }
    });
  })
}

checkVideoAddedToKiosk = async function ( id, kiosk ) {
  return new Promise(function(resolve, reject){
    db.query(`SELECT videos from kiosk WHERE code = '${kiosk}'`, async (err, check) => {
      if(err) {
        throw err;
      }
      if(check.length > 0) {
        if(check[0].videos == null) {
          db.query(`UPDATE kiosk SET videos = '${id}' WHERE code = '${kiosk}'`, async err => {
            if(err) {
              throw err;
            }
            return resolve(1);
          });
        } else {
          var code = check[0].videos.split(',');
          if(code.includes(String(id))) {
            return resolve(1);
          } else {
            var c = `${id}`;
            code.forEach(el => {
              if(el != '') {
                c += ',' + el;
              }
            });
            db.query(`UPDATE kiosk SET videos = '${c}' WHERE code = '${kiosk}'`, async err => {
              if(err) {
                throw err;
              }
              return resolve(1);
            });
          }
        }
        
      } else {
        return resolve(0);
      }
    });
  })
}

checkTextAddedToKiosk = async function ( id, kiosk ) {
  return new Promise(function(resolve, reject){
    db.query(`SELECT texts from kiosk WHERE code = '${kiosk}'`, async (err, check) => {
      if(err) {
        throw err;
      }
      if(check.length > 0) {
        if(check[0].texts == null) {
          db.query(`UPDATE kiosk SET texts = '${id}' WHERE code = '${kiosk}'`, async err => {
            if(err) {
              throw err;
            }
            return resolve(1);
          });
        } else {
          var code = check[0].texts.split(',');
          if(code.includes(String(id))) {
            return resolve(1);
          } else {
            var c = `${id}`;
            code.forEach(el => {
              if(el != '') {
                c += ',' + el;
              }
            });
            db.query(`UPDATE kiosk SET texts = '${c}' WHERE code = '${kiosk}'`, async err => {
              if(err) {
                throw err;
              }
              return resolve(1);
            });
          }
        }
        
      } else {
        return resolve(0);
      }
    });
  })
}
exports.addphototokiosk = async (req, res) => {
  const { kiosk, id } = req.body;
  if(id != undefined) {
    for (const k of kiosk) {
      await checkPhotoAddedToKiosk(id, k);
    }
    res.json({
      result: 'success'
    });
  } else {
    res.json({
      result: 'failed'
    });
  }
}

exports.addVideoToKiosk = async (req, res) => {
  const { kiosk, id } = req.body;
  if(id != undefined) {
    for (const k of kiosk) {
      await checkVideoAddedToKiosk(id, k);
    }
    res.json({
      result: 'success'
    });
  } else {
    res.json({
      result: 'failed'
    });
  }
}


exports.getUsers = async (req, res) => {
  db.query(`SELECT u.id, u.permission, u.lastname, u.firstname, u.email, u.phone, u.image, c.cityname, d.districtname from district as d inner join users as u on d.id = u.district inner join city as c on u.city = c.id`, async (err, users) => {
      if(err) {
          throw err;
      }
      res.json({
          result: 'sucdess',
          users
      });
  });
}

exports.deleteUser = async (req, res) => {
  const { id } = req.body;
  db.query(`DELETE FROM users WHERE id = ${id}`, async err => {
    if(err) {
      throw err;
    }
    res.json({
      result: 'success'
    });
  });
}

exports.addNewUser = async (req, res) => {
  const { user } = req.body;
  user.password = sha256(user.phone + process.env.SALT);
  db.query(`SELECT id from users WHERE email = '${user.email}'`, async (err, check) => {
    if(err) {
      throw err;
    }
    if(check.length > 0) {
      res.json({
        result: 'duplicate'
      });
    } else {
      db.query(`INSERT INTO users SET ?`, user, async err => {
        if(err) {
          throw err;
        }
        res.json({
          result: 'success'
        });
      })
    }
  });
}