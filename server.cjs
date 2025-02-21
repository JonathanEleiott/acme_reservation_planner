const { fetchCustomers } = require('./db/customers.cjs');
const { fetchRestaurants } = require('./db/restaurants.cjs');
const { fetchReservations } = require('./db/reservations.cjs');

const client = require('./db/client.cjs');
client.connect();

const express = require('express');
const app = express();

app.get('/', (req, res, next) => {
  res.send('WELCOME');
});

app.get('/api/customers', async(req, res, next) => {
    try {
      const allCustomers = await fetchCustomers();

      res.send(allCustomers);
    } catch(err) {
      next(err);
    }
});

app.get('/api/restaurants', async(req, res, next) => {
  try {
    const allRestaurants = await fetchRestaurants();

    res.send(allRestaurants);
  } catch(err) {
    next(err);
  }
});

app.get('/api/reservations', async(req, res, next) => {
  try {
    const allReservations = await fetchReservations();
    res.send(allReservations);
  } catch(err) {
    next(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});