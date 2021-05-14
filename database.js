
const { Client } = require('pg');

const client = new Client({
    user: 'jennagroth',
    password: 'jenna',
    host: 'localhost',
    port: 5432,
    database: 'sdc_reviews'
});

client.connect()
.then(() => {console.log('connected to postgres');})
.catch((err) => {console.log('error: ', err);})

module.exports = client;