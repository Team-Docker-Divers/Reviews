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

const postAReview = (body, cb) => {
  var queryStringBody = `INSERT INTO reviews(product_id, rating, date, summary, body, recommend, reported, reviewer_name, reviewer_email, helpfulness) VALUES (${parseInt(body.product_id)}, ${parseInt(body.rating)}, current_timestamp, '${body.summary}', '${body.body}', ${body.recommend}, 'false', '${body.name}', '${body.email}', 0)`;
  db.query(queryStringBody, (err, results) => {
    if (err) {
      console.log(err);
      cb(err, null);
    } else {
      console.log('successfully posted review body: ', results);
      var queryStringPhoto = `INSERT INTO photos(review_id_reviews, url) VALUES `;
      for (var i = 0; i < body.photos.length; i++) {
        if (i < body.photos.length - 1) {
          queryStringPhoto = queryStringPhoto.concat(`((SELECT max(id) FROM reviews), '${body.photos[i]}'), `);
        } else {
          queryStringPhoto = queryStringPhoto.concat(`((SELECT max(id) FROM reviews), '${body.photos[i]}')`);
        }
      }
      console.log(queryStringPhoto);
      db.query(queryStringPhoto, (err, results) => {
        if (err) {
          console.log(err);
          cb(err, null);
        } else {
          console.log('successfully posted review photo: ', results);
        }
      })
      var queryStringCharacteristics = `INSERT INTO reviews_charactersitics(characteristic_id_characteristics, review_id_reviews, value) VALUES `;
      for (var key in body.characteristics) {
        queryStringCharacteristics = queryStringCharacteristics.concat(`(${parseInt(key)}, (SELECT max(id) FROM reviews), ${body.characteristics[key]}), `);
      }
      queryStringCharacteristics = queryStringCharacteristics.slice(0, -2);
      console.log(queryStringCharacteristics);
      db.query(queryStringCharacteristics, (err, results) => {
        if (err) {
          console.log(err);
          cb(err, null);
        } else {
          console.log('successfully posted review characteristic', results);
          cb(null, 'success');
        }
      })
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
