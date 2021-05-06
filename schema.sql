CREATE DATABASE sdc_reviews;

CREATE TABLE reviews (
  id INTEGER NOT NULL PRIMARY KEY
  rating INTEGER
  summary VARCHAR(60)
  recommend BOOLEAN
  response TEXT
  body VARCHAR(1000)
  date DATE
  reviewer_name VARCHAR(60)
  helpfulness INTEGER
  product_id INTEGER
  reported BOOLEAN
);

CREATE TABLE reviews_charactersitics (
  FOREIGN KEY (review_id_reviews) REFERENCES reviews(id)
  FOREIGN KEY (characteristic_id_characteristics) REFERENCES characteristics(id)
);

CREATE TABLE characteristics (
  id INTEGER NOT NULL PRIMARY KEY
  name VARCHAR(60)
  value INTEGER
);

CREATE TABLE photos (
  id INTEGER NOT NULL PRIMARY KEY
  url TEXT
  FOREIGN KEY (review_id_reviews) REFERENCES reviews(id)
);


