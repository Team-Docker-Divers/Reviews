
const { Client } = require('pg');

const client = new Client({
    user: 'jenna',
    password: '',
    host: 'localhost',
    port: 3001,
    database: 'sdc_reviews'
});