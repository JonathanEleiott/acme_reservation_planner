const { fetchCustomers } = require('./db/customers.cjs');
const { fetchRestaurants } = require('./db/restaurants.cjs');
const { fetchReservations, createReservation, destroyReservation } = require('./db/reservations.cjs');

const client = require('./db/client.cjs');
client.connect();

const express = require('express');
const app = express();

app.use(express.json());

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

app.post('/api/customers/:id/reservations', async(req, res, next) => {
  const { id: customerId } = req.params;
  const { restaurant_id, date, party_count } = req.body;
  
  try {
    const newReservation = await createReservation(date, party_count, restaurant_id, customerId);
    res.status(201).send(newReservation);
  } catch(err) {
    next(err);
  }
});

app.delete('/api/customers/:customer_id/reservations/:id', async(req, res, next) => {
  const { customer_id, id: reservationId } = req.params;
  try {
    await destroyReservation(reservationId, customer_id);

    res.status(204).send({});
  } catch(err) {
    next(err);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`listening on PORT ${PORT}`);
});