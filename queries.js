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

//  {product_id: productId,
//   rating: overallRating,
//   summary: reviewSummary,
//   body: reviewBody,
//   recommend: recc,
//   name: nickname,
//   email: email,
//   photos: [],
//   characteristics: characteristics}
// INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, helpfulness) VALUES (4, 9, current_timestamp, I like it., I like the way this product fits., true, false, JG, spring.time@gmail.com, 0);

const postAReview = (body, cb) => {
  var queryString = `INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, helpfulness) VALUES (${parseInt(body.product_id)}, ${parseInt(body.rating)}, current_timestamp, '${body.summary}', '${body.body}', ${body.recommend}, 'false', '${body.name}', '${body.email}', 0)`;
  console.log('query string: ', queryString);
  db.query(queryString, (err, results) => {
    if (err) {
      cb(err, null);
    } else {
      console.log(results);
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
