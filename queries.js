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

const retrieveNew = (product_id, count, cb) => {
  db.query(`SELECT * FROM reviews WHERE product_id = ${product_id} AND reported != 'true' ORDER BY date DESC LIMIT ${count};`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
}

const retrieveHelpful = (product_id, count, cb) => {
  db.query(`SELECT * FROM reviews WHERE product_id = ${product_id} AND reported != 'true' ORDER BY helpfulness DESC LIMIT ${count};`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
}

const retrieveRelevant = (product_id, count, cb) => {
  db.query(`SELECT * FROM reviews WHERE product_id = ${product_id} AND reported != 'true' ORDER BY helpfulness DESC, date DESC LIMIT ${count};`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
}

const postAReview = (body, cb) => {
  db.query(`SELECT * FROM reviews WHERE product_id = ${product_id} AND reported != true ORDER BY date DESC LIMIT ${count};`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
}

const markHelpful = (reviewId, cb) => {
  db.query(`UPDATE reviews SET helpfulness = helpfulness + 1 WHERE id = ${reviewId}`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
}

const markReported = (reviewId, cb) => {
  db.query(`UPDATE reviews SET reported = true WHERE id = ${reviewId}`, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      cb(null, results);
    }
  });
}

module.exports = {retrieveReviewsTest, retrieveNew, retrieveHelpful, retrieveRelevant, postAReview, markHelpful, markReported};
