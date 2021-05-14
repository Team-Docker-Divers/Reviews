
const { Client } = require('pg');

const client = new Client({
    user: 'jennagroth',
    password: 'jenna',
    host: 'localhost',
    port: 5432,
    database: 'sdc_reviews'
});

client.connect();

module.exports = client;