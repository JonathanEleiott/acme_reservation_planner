const { Client } = require('pg');
const client = new Client(process.env.DATABASEURL || 'postgres://localhost:5432/acme_reservation_planner');

module.exports = client;