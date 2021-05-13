-- DROP DATABASE if exists sdc_reviews;

-- CREATE DATABASE sdc_reviews;

DROP TABLE if exists reviews cascade;

CREATE TABLE reviews (
  id SERIAL NOT NULL PRIMARY KEY,
  product_id INTEGER NOT NULL,
  rating INTEGER,
  date DATE NOT NULL,
  summary VARCHAR(200),
  body VARCHAR(1000),
  recommend BOOLEAN,
  reported VARCHAR(20),
  reviewer_name VARCHAR(60),
  reviewer_email VARCHAR(60),
  response TEXT,
  helpfulness INTEGER
);

DROP TABLE if exists reviews_charactersitics cascade;

CREATE TABLE reviews_charactersitics (
  id SERIAL NOT NULL PRIMARY KEY,
  characteristic_id_characteristics INTEGER NOT NULL,
  review_id_reviews INTEGER NOT NULL,
  value INTEGER,
  FOREIGN KEY (characteristic_id_characteristics) REFERENCES characteristics(id),
  FOREIGN KEY (review_id_reviews) REFERENCES reviews(id)
);

DROP TABLE if exists characteristics cascade;

CREATE TABLE characteristics (
  id INTEGER NOT NULL PRIMARY KEY,
  product_id INTEGER,
  name VARCHAR(60)
);

DROP TABLE if exists photos cascade;

CREATE TABLE photos (
  id SERIAL NOT NULL PRIMARY KEY,
  review_id_reviews INTEGER NOT NULL,
  url TEXT,
  FOREIGN KEY (review_id_reviews) REFERENCES reviews(id)
);


\COPY reviews FROM /Users/jennagroth/Documents/SDC_Application_Data/reviews.csv DELIMITER ',' CSV HEADER;
\COPY characteristics FROM /Users/jennagroth/Documents/SDC_Application_Data/characteristics.csv DELIMITER ',' CSV HEADER;
\COPY reviews_charactersitics FROM /Users/jennagroth/Documents/SDC_Application_Data/characteristic_reviews.csv DELIMITER ',' CSV HEADER;
\COPY photos FROM /Users/jennagroth/Documents/SDC_Application_Data/reviews_photos.csv DELIMITER ',' CSV HEADER;

SELECT setval('reviews_id_seq', (select max(id) FROM reviews));
SELECT setval('reviews_charactersitics_id_seq', (select max(id) FROM reviews_charactersitics));
SELECT setval('photos_id_seq', (select max(id) FROM photos));