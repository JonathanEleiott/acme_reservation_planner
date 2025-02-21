const client = require('./client.cjs');
const { createCustomer, fetchCustomers } = require('./customers.cjs');
const { createRestaurant, fetchRestaurants } = require('./restaurants.cjs');
const { createReservation, destroyReservation } = require('./reservations.cjs');

const dropTables = async() => {
  try {
    await client.query(`
      DROP TABLE IF EXISTS reservations;
      DROP TABLE IF EXISTS restaurants;
      DROP TABLE IF EXISTS customers;
    `);
  } catch(err) {
    console.log(err)
  }
}

const createTables = async() => {
  try {
    await client.query(`
      CREATE TABLE customers (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL
      );

      CREATE TABLE restaurants (
        id SERIAL PRIMARY KEY,
        name VARCHAR(30) NOT NULL
      );

      CREATE TABLE reservations (
        id SERIAL PRIMARY KEY,
        date DATE NOT NULL,
        party_count INTEGER NOT NULL,
        restaurant_id INTEGER REFERENCES restaurants(id) NOT NULL,
        customer_id INTEGER REFERENCES customers(id) NOT NULL
      );
    `);
  } catch(err) {
    console.log(err);
  }
}

const syncAndSeed = async() => {
  await client.connect();
  console.log('CONNECTED TO THE DB');

  console.log('DROPPING TABLES');
  await dropTables();
  console.log('TABLES DROPPED');

  console.log('CREATING TABLES');
  await createTables();
  console.log('TABLES CREATED');

  console.log('CREATING CUSTOMERS');
  const freddy = await createCustomer('Freddy');
  const adamZapple = await createCustomer('Adam Zapple');
  const dora = await createCustomer('Dora');
  await createCustomer('Robert');
  console.log('CUSTOMERS CREATED');

  console.log('CREATING RESTAURANTS');
  const oliveGarden = await createRestaurant('Olive Garden');
  const redLobster = await createRestaurant('Red Lobster');
  const outback = await createRestaurant('Outback');
  const cityWok = await createRestaurant('City Wok');
  await createRestaurant('Texas Roadhouse');
  console.log('RESTAURANTS CREATED');

  console.log('CREATING RESERVATIONS');
  await createReservation('2025-02-22', 4, oliveGarden.id, freddy.id);
  await createReservation('2025-03-01', 2, redLobster.id, freddy.id);
  await createReservation('2025-02-25', 3, oliveGarden.id, adamZapple.id);
  await createReservation('2025-02-25', 5, outback.id, dora.id);
  await createReservation('2025-03-03', 3, cityWok.id, dora.id);
  await createReservation('2025-03-05', 5, cityWok.id, dora.id);
  const doraCityWokApril09 = await createReservation('2025-04-09', 10, cityWok.id, dora.id);
  const doraCityWokApril01 = await createReservation('2025-04-01', 8, cityWok.id, dora.id);
  console.log('RESERVATIONS CREATED');

  console.log('GETTING ALL CUSTOMERS');
  const allCustomers = await fetchCustomers();
  console.log(allCustomers);

  console.log('FETCHING RESTAURANTS');
  const allResataurants = await fetchRestaurants();
  console.log(allResataurants);

  console.log('DELETING RESERVATIONS');
  await destroyReservation(doraCityWokApril01.id);
  await destroyReservation(doraCityWokApril09.id);

  await client.end();
  console.log('DISCONNECTED FROM THE DB');
}

syncAndSeed();