const db = require('./database.js');


const retrieveReviewsTest = cb => {
  db.query('SELECT * FROM reviews LIMIT 10;', (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
}

const retrieveNew = (product_id, count, sort, cb) => {
  db.query(`SELECT * FROM reviews WHERE product_id = ${product_id} ORDER BY date DESC LIMIT ${count};`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
}

const retrieveHelpful = (product_id, count, sort, cb) => {
  db.query(`SELECT * FROM reviews WHERE product_id = ${product_id} ORDER BY helpfulness DESC LIMIT ${count};`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
}

const retrieveRelevant = (product_id, count, sort, cb) => {
  db.query(`SELECT * FROM reviews WHERE product_id = ${product_id} ORDER BY date DESC LIMIT ${count};`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
}

module.exports = {retrieveReviewsTest, retrieveNew, retrieveHelpful, retrieveRelevant};
