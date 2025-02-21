const client = require('./client.cjs');

const createRestaurant = async(restaurantName) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO restaurants (name)
      VALUES ('${restaurantName}')
      RETURNING *;
    `);

    const restaurant = rows[0];
    return restaurant;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createRestaurant
}