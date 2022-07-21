const mysql = require('mysql');
let timer = null;

// const db = mysql.createConnection({
//   host: 'localhost',
//   database: 'kiosk',
//   user: 'root',
//   password: ''
// });

const db = mysql.createConnection({
  host: 'localhost',
  database: 'sample_kiosk',
  user: 'doadmin',
  port: 3306,
  password: 'AVNS_OVLR3V3VHsxDLKq2fez'
});

var timerStart = function() {
  clearInterval(timer);
  timer = setInterval(updateTimer, 1800000);
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

var updateTimer =  function () {
  db.query(`UPDATE kiosk SET live = (CASE WHEN 2 > TIMESTAMPDIFF(HOUR, lstRequest, NOW()) THEN 1
          WHEN 1 < TIMESTAMPDIFF(HOUR, lstRequest, NOW()) THEN 0 END)`, async err => {
    if(err) {
      throw err;
    } 
    db.query(`SELECT live, code from kiosk`, async (err, kiosk) => {
      if(err) {
        throw err;
      }
      var n = `INSERT INTO logfile (kioskId, live) VALUES ?`;
      var rows = [];
      kiosk.forEach(eleme => {
          var pst = [eleme.code, eleme.live];
          rows.push(pst);
      });
      db.query(n, [rows], async err => {
        if (err) {
            throw err;
        }
        console.log('success added logfile');
    });
    });
  })
}

db.connect(err => {
  if(err) {
    throw err
  }
  console.log('My sql connected');
});

const app = require('./app');
const port = 8010;
const server = app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
    timerStart();
});

const io = require("socket.io")(server);
const jwt = require("jwt-then");

io.use(async (socket, next) => {
  try {
    const token = socket.handshake.query.token;
    const payload = await jwt.verify(token, 'HS256');
    socket.userId = payload.id;
    next();
  } catch (err) {}
});


io.on("connection", (socket) => {

  console.log("Connected: " + socket.userId);

  socket.on("disconnect", () => {
    console.log("Disconnected: " + socket.userId);
  });

});