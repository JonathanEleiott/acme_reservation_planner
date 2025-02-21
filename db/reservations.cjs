const client = require('./client.cjs');

const createReservation = async(reservationDate, partyCount, restaurantId, customerId) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO reservations (date, party_count, restaurant_id, customer_id)
      VALUES('${reservationDate}', ${partyCount}, ${restaurantId}, ${customerId})
      RETURNING *;
    `);
    
    const createdReservation = rows[0];
    return createdReservation;
  } catch(err) {
    throw Error(err);
  }
}

const destroyReservation = async(reservationId, customerId) => {
  try {
    const { rows } = await client.query(`
      DELETE FROM reservations WHERE id=${reservationId} AND customer_id=${customerId}
      RETURNING *;
    `);
    
    if(rows[0]) {
      return rows[0];
    } else {
      throw Error({ message: 'reservation not found' });
    }
  } catch(err) {
    throw Error(err);
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