const client = require('./client.cjs');

const createReservation = async(reservationDate, partyCount, restaurantId, customerId) => {
  try {
    await client.query(`
      INSERT INTO reservations (date, party_count, restaurant_id, customer_id)
      VALUES('${reservationDate}', ${partyCount}, ${restaurantId}, ${customerId});
    `);
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createReservation
}