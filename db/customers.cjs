const client = require('./client.cjs');

const createCustomer = async(customerName) => {
  try {
    const { rows } = await client.query(`
      INSERT INTO customers (name)
      VALUES ('${customerName}')
      RETURNING *;
    `);

    const customer = rows[0];
    return customer;
  } catch(err) {
    console.log(err);
  }
}

module.exports = {
  createCustomer
}