const sha256 = require("js-sha256");


Date.prototype.addHours = function(h){
  this.setHours(this.getHours()+h);
  return this;
}

const query = {
    /**
     * @param {string} username 
     * @param {string} password 
     * @returns дамжуулсан параметрийг ашиглаад query текст үүсгээд буцаах болно.
     */
    login: (phone, password) => {
        return `SELECT id, name, image, phone, email from member WHERE phone = '${phone}' AND password = '${sha256(password + process.env.SALT)}' AND verified = 1`
    },
    getTypes: () => {
      return `SELECT id, typename from types`
    },
    getSizes: () => {
      return `SELECT id, size, sizeTitle from sizes`
    },
    getUsage: () => {
      return `SELECT id, usename from formuse`;
    },
    getDistricts: () => {
      return `SELECT id, district, cityId from district`
    },
    getCity: () => {
      return `SELECT id, cityname from city`
    },
    getIntents: () => {
      return `SELECT id, intent from intent`
    },
    checkPropertyCheckIdx: (value) => {
      return `SELECT propertyId from property WHERE propertyId LIKE '${value}%'`
    },
    addProperty: () => {
      return 'INSERT INTO property SET ?'
    },
    addPolygons: () => {
      return `INSERT INTO coord (lat, lng, propertyId) VALUES ?`
    },
    selectLastProperties: () => {
      return `SELECT i.imagename, COUNT(i.imagename) as totalImage, m.image, m.name, m.email, p.title, p.usage, p.description, p.sizes, p.usage, p.types, p.intent, p.lizing, p.price, p.special, p.city, p.district, p.created_at, p.propertyId, p.discount 
              FROM images as i INNER JOIN property as p on i.propertyId = p.propertyId 
              INNER JOIN member as m on p.member = m.id WHERE p.approved = 1 AND p.is_deleted = 'N' GROUP BY p.propertyId ORDER BY p.created_at DESC LIMIT 16`;
    },
    selectSingleProperty: (propertyId) => {
      return `SELECT (SELECT usename from formuse WHERE p.usage LIMIT 1) as usename, (SELECT intent from intent WHERE p.intent LIMIT 1) as intent, e.name as empName, e.phone as empPhone, e.image as empPhoto, m.phone, m.email, m.image, m.name, p.watched, p.video, p.title, p.description, p.price, p.special, p.city, p.district, DATE_FORMAT(p.created_at, "%Y-%m-%d") as created_at, p.propertyId, p.discount 
              FROM employee as e INNER JOIN property as p on e.id = p.approvedEmp 
              INNER JOIN member as m on p.member = m.id WHERE p.approved = 1 AND p.propertyId = '${propertyId}' AND p.is_deleted = 'N' LIMIT 1;`
    },
    selectPolygons: (propertyId) => {
      return `SELECT lat, lng FROM coord WHERE propertyId = '${propertyId}'`
    },
    selectPhotos: (propertyId) => {
      return `SELECT imagename FROM images WHERE propertyId = '${propertyId}'`
    },
    selectSimilarProperty: (propertyId) => {
      return `SELECT i.imagename, COUNT(i.imagename) as totalImage, m.image, m.name, p.title, p.description, p.price, p.special, p.city, p.district, p.created_at, p.propertyId, p.discount, p.sizes, p.usage, p.types, p.intent, p.lizing
              FROM images as i INNER JOIN property as p on i.propertyId = p.propertyId 
              INNER JOIN member as m on p.member = m.id WHERE p.approved = 1 AND p.is_deleted = 'N' AND  p.types = (SELECT types from property WHERE propertyId = '${propertyId}') AND p.usage = (SELECT property.usage from property WHERE propertyId = '${propertyId}') GROUP BY p.propertyId ORDER BY p.created_at DESC LIMIT 10`
    },
    selectRecommended: () => {
      return `SELECT i.imagename, COUNT(i.imagename) as totalImage, m.image, m.name, p.title, p.description, p.price, p.special, p.city, p.district, p.created_at, p.propertyId, p.discount, p.sizes, p.usage, p.types, p.intent, p.lizing
              FROM images as i INNER JOIN property as p on i.propertyId = p.propertyId 
              INNER JOIN member as m on p.member = m.id WHERE p.approved = 1 AND p.is_deleted = 'N' GROUP BY p.propertyId ORDER BY RAND() LIMIT 16`
    },
    selectProperties: (intent, usage, city, detail, special) => {
      if(!intent) { intent = ''; }
      if(!usage) { usage = ''; }
      if(!city) { city = ''; }
      if(!detail) { detail = ''; }
      let query = `SELECT i.imagename, COUNT(i.imagename) as totalImage, 
      m.image, 
      m.name, 
      p.title, 
      p.description, 
      p.price, 
      p.special, 
      p.city, 
      p.district, 
      p.created_at, 
      p.propertyId, 
      p.discount,
      p.sizes, 
      p.usage, 
      p.types, 
      p.intent, 
      p.lizing
      FROM images as i INNER JOIN property as p on i.propertyId = p.propertyId 
      INNER JOIN member as m on p.member = m.id WHERE p.approved = 1 AND p.is_deleted = 'N' AND special = ${special} AND  description LIKE '%${detail}%'`;
      if(intent != '') {
        query += ` AND p.intent = '${intent}'`;
      }

      if(usage != '') {
        query += ` AND p.usage = '${usage}'`;
      }

      if(city != '') {
        query += ` AND p.city = '${city}'`;
      }
      
      query += ' GROUP BY p.propertyId'
      return query;
    },
    selectAgentInfo: (email) => {
      return `SELECT id, image, name, phone, viewed from member WHERE email = '${email}' AND verified = 1`;
    },
    updateAgentViewed: (id) => {
      return `UPDATE member SET viewed = viewed + 1 WHERE id = ${id}`;
    },
    getAgentProperties: (id) => {
      return `SELECT title, description, COUNT(i.imagename) as totalImage, i.imagename, price, special, city, district, created_at, p.propertyId, types, sizes, p.usage, discount, intent, watched, lizing 
              from property as p inner join images as i on p.propertyId = i.propertyId WHERE member = ${id} AND p.approved = 1 AND p.is_deleted = 'N' GROUP BY p.propertyId ORDER BY p.created_at DESC`;
    },
    addMember: () => {
      return `INSERT INTO member SET ?`;
    },
    addFavProps: () => {
      return `INSERT INTO favourite SET ?`;
    },
    checkFavExisted: (key) => {
      if (!key.propertyId) {
        return `SELECT id from favourite WHERE userId = '${key.userId}'`;
      }
      return `SELECT id from favourite WHERE userId = '${key.userId}' AND propertyId = '${key.propertyId}'`;
    },
    checkMemberExisted: (key) => {
      return `SELECT id FROM member WHERE phone = '${key}' OR email = '${key}'`;
    },
    verifyMember: (key) => {
      return `UPDATE member SET verified = 1 WHERE phone = '${key}'`;
    },
    forgotPassword: (phone) => {
      return `SELECT id from member WHERE phone = '${phone}' LIMIT 1`
    },
    updatePassword: (phone, password) => {
      return `UPDATE member SET password = '${password}' WHERE phone = '${phone}'`
    },
    adminLogin: (username, password) => {
      return `SELECT id, name, email, phone, image from employee WHERE (email = '${username}' OR phone = '${username}') AND password = '${sha256(password + process.env.SALT)}'`;
    },
    getNotApproved: (approved = 0, report = null) => {
      if (!report) {
        return `SELECT i.imagename, COUNT(i.imagename) as totalImage, m.image, m.name, m.email, p.title, p.usage, p.description, p.price, p.special, p.city, p.district, p.created_at, p.propertyId, p.discount 
              FROM images as i INNER JOIN property as p on i.propertyId = p.propertyId 
              INNER JOIN member as m on p.member = m.id WHERE p.approved = ${approved} AND p.is_deleted = 'N' GROUP BY p.propertyId ORDER BY p.created_at DESC`;
      } else {
        return `SELECT 
        i.imagename, 
        COUNT(i.imagename) AS totalImage, 
        COUNT(r.title) as total,
        r.propertyId, 
        r.description,
        r.title, 
        p.price,
        r.resolve, 
        DATE_FORMAT(r.created_at, "%Y-%m-%d") as created_at 
        FROM reports AS r 
        LEFT JOIN property AS p 
        ON r.propertyId = p.propertyId 
        LEFT JOIN images AS i ON 
        r.propertyId = i.propertyId 
        GROUP BY r.propertyId, r.title
        ORDER BY r.created_at DESC;`;
      }
    },
    aproveProperty: (propId, empId) => {
      return `UPDATE property SET approved = 1, approvedEmp = '${empId}' WHERE propertyId = '${propId}'`;
    },
    checkAdmin: (email) => {
      return `SELECT id from employee WHERE email = '${email}'`;
    },
    updateAdminPassword: (email, password) => {
      return `UPDATE employee SET password = '${password}' WHERE email = '${email}'`;
    },
    getEmployee: (email = null) => {
      if (!email) {
        return `SELECT name, email, image, phone, superuser, id from employee`;
      }

      return `SELECT name, email, image from employee WHERE email = '${email}'`;
    },
    getMemberProperty: (id) => {
      return `SELECT * FROM images as i inner join property as p on i.propertyId = p.propertyId WHERE member = ${id} AND p.is_deleted = 'N'`;
    },
    addEmployee: (user) => {
      return `INSERT INTO employee(name, email, phone, image, password) VALUES('${user.name}', '${user.email}', '${user.phone}', 'default.png', '${sha256(user.phone + process.env.SALT)}')`
    },
    removeEmployee: (id) => {
      return `DELETE from employee WHERE id = ${id}`;
    },
    getFavProps: (userid) => {
      return `SELECT 
      p.title, 
      p.description, 
      p.price, 
      p.special, 
      p.created_at, 
      p.propertyId, 
      p.discount, 
      p.city,
      p.district,
      i.imagename, 
      f.id 
      FROM 
      favourite AS f 
      LEFT JOIN 
      property AS p 
      ON 
      f.propertyId = p.propertyId 
      LEFT JOIN images AS i 
      ON 
      p.propertyId = i.propertyId 
      WHERE f.userId = ${userid} 
      AND p.approved = 1 
      AND p.is_deleted = 'N'
      GROUP BY p.propertyId 
      ORDER BY f.id DESC;`
    },
    removeFavProps: (id = null, userId) => {
      if (!id) {
        return `DELETE FROM favourite WHERE userId = ${userId}`;
      }

      return `DELETE FROM favourite WHERE userId = ${userId} AND id = ${id}`;
    },
    removeProperty: (id) => {
      return `UPDATE property SET is_deleted = 'Y' WHERE propertyId = '${id}'`;
    },
    updateReport: (id, resovle) => {
      return `UPDATE reports SET resolve = ${resovle} WHERE propertyId = '${id}'`;
    },
    sendReport: (propertyId, title, description) => {
      return `INSERT INTO reports(propertyId, title, description) VALUES('${propertyId}', '${title}', '${description}')`;
    }
}

module.exports = query;