const express = require('express');
const app = express();
const port = 3000;
const queries = require('./queries.js');

app.use(express.static(`${__dirname}/../client/dist`));
app.use(express.json());

// test get request
// app.get('/api/reviews', (req, res) => {
//   console.log(req.url);
//   queries.retrieveReviewsTest((err, data) => {
//     if (err) {
//       console.log('Error');
//     } else {
//       console.log('Review data: ', data.rows);
//       res.send(data.rows);
//     }
//   })
// });

// axios.get(`/api/?endpoint=reviews/?product_id=${productId}&count=100&sort=newest`);
app.get('/api/reviews', (req, res) => {
  if (req.query.sort === 'newest') {
    queries.retrieveNew(req.query.product_id, req.query.count, req.query.sort, (err, data) => {
      if (err) {
        console.log('Error: ', err);
      } else {
        console.log('Review data: ', data.rows);
        res.send(data.rows);
      }
    });
    // axios.get(`/api/?endpoint=reviews/?product_id=${productId}&count=100&sort=helpful`);
  } else if (req.query.sort === 'helpful') {
    queries.retrieveHelpful(req.query.product_id, req.query.count, req.query.sort, (err, data) => {
      if (err) {
        console.log('Error: ', err);
      } else {
        console.log('Review data: ', data.rows);
        res.send(data.rows);
      }
    });
    // axios.get(`/api/?endpoint=reviews/?product_id=${productId}&count=100&sort=relevant`);
  } else {
    queries.retrieveRelevant(req.query.product_id, req.query.count, req.query.sort, (err, data) => {
      if (err) {
        console.log('Error: ', err);
      } else {
        console.log('Review data: ', data.rows);
        res.send(data.rows);
      }
    });
  }
});



// axios.post(`/api/?endpoint=reviews`, {
//   product_id: productId,
//   rating: overallRating,
//   summary: reviewSummary,
//   body: reviewBody,
//   recommend: recc,
//   name: nickname,
//   email: email,
//   photos: [],
//   characteristics: characteristics
// })

// axios.put(`/api/?endpoint=reviews/${reviewId}/helpful`); (mark helpful)

// axios.put(`/api/?endpoint=reviews/${reviewId}/report`); (report review)

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});



