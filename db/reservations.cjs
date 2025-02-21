const client = require('./client.cjs');

const createReservation = async(reservationDate, partyCount, restaurantId, customerId) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO reservations (date, party_count, restaurant_id, customer_id)
      VALUES('${reservationDate}', ${partyCount}, ${restaurantId}, ${customerId})
      RETURNING *;
    `);
    
    const retrievedReservation = rows[0];
    return retrievedReservation;
  } catch(err) {
    console.log(err);
  }
}

const destroyReservation = async(reservationId) => {
  try {
    await client.query(`
      DELETE FROM reservations WHERE id=${reservationId};
    `);
  } catch(err) {
    console.log(err);
  }
}

const fetchReservations = async() => {
  try {
    const { rows: retrievedReservations } = await client.query(`
      SELECT * FROM reservations;
    `);

    return retrievedReservations;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createReservation,
  destroyReservation,
  fetchReservations
}