const express = require('express');
const app = express();
const port = 3000;
const queries = require('./queries.js');
var cors = require('cors');

// app.use(express.static(`${__dirname}/../client/dist`));
app.use(express.json());
app.use(cors());

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
  let reviews = {
    product_id: req.query.product_id,
    results: []
  };
  if (req.query.sort === 'newest') {
    queries.retrieveNew(req.query.product_id, req.query.count, (err, data) => {
      if (err) {
        console.log('Error: ', err);
      } else {
        let photoPromises = queries.generatePhotoPromises(data.rows);
        reviews.results.push(data.rows);
        Promise.all(photoPromises)
        .then((photos) => {
          photos.forEach((photo, index) => {
            reviews.results[0][index].photos = photo;
          })
        })
        .then(() => {
          reviews.results = reviews.results.flat();
          console.log(reviews);
          res.send(reviews);
        })
      }
    });
    // axios.get(`/api/?endpoint=reviews/?product_id=${productId}&count=100&sort=helpful`);
  } else if (req.query.sort === 'helpful') {
    queries.retrieveHelpful(req.query.product_id, req.query.count, (err, data) => {
      if (err) {
        console.log('Error: ', err);
      } else {
        let photoPromises = queries.generatePhotoPromises(data.rows);
        reviews.results.push(data.rows);
        Promise.all(photoPromises)
        .then((photos) => {
          photos.forEach((photo, index) => {
            reviews.results[0][index].photos = photo;
          })
        })
        .then(() => {
          reviews.results = reviews.results.flat();
          console.log(reviews);
          res.send(reviews);
        })
      }
    });
    // axios.get(`/api/?endpoint=reviews/?product_id=${productId}&count=100&sort=relevant`);
  } else {
    queries.retrieveRelevant(req.query.product_id, req.query.count, (err, data) => {
      if (err) {
        console.log('Error: ', err);
      } else {
        let photoPromises = queries.generatePhotoPromises(data.rows);
        reviews.results.push(data.rows);
        Promise.all(photoPromises)
        .then((photos) => {
          photos.forEach((photo, index) => {
            reviews.results[0][index].photos = photo;
          })
        })
        .then(() => {
          reviews.results = reviews.results.flat();
          console.log(reviews);
          res.send(reviews);
        })
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
app.post('/api/reviews', (req, res) => {
  // console.log(req.body);
  queries.postAReview(req.body, (err, message) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      console.log('Post response successful: ', message);
      res.send(message);
    }
  });
});


// axios.put(`/api/?endpoint=reviews/${reviewId}/helpful`); (mark helpful)
app.put('/api/reviews/:reviewId/helpful', (req, res) => {
  queries.markHelpful(req.params.reviewId, (err, data) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      console.log('Put response: ', data);
      res.send(data);
    }
  });
});


// axios.put(`/api/?endpoint=reviews/${reviewId}/report`); (report review)
app.put('/api/reviews/:reviewId/report', (req, res) => {
  queries.markReported(req.params.reviewId, (err, data) => {
    if (err) {
      console.log('Error: ', err);
    } else {
      console.log('Put response: ', data);
      res.send(data);
    }
  });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});



