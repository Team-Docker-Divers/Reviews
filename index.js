const express = require('express');
const app = express();
const port = 3000;
const db = require('./database.js');

app.use(express.static(`${__dirname}/../client/dist`));
app.use(express.json());


app.get('/reviews', (req, res) => {
    db.query('SELECT * FROM reviews LIMIT 10;', (err, data) => {
        if (err) {
          console.log('Error');
        } else {
          console.log('Review data: ', data.rows);
          res.send(data.rows);
        }
      });
});

app.listen(3000, () => {
    console.log('Server listening on port 3000');
});



