const { sequelize } = require('../models');

const performQueriesWithTransaction = async (queries) => {
  let transaction;
  try {
    transaction = await sequelize.transaction();
    const results = await Promise.all(
      queries.map((query) => query(transaction)),
    );
    await transaction.commit();
    return results;
  } catch (err) {
    // eslint-disable-next-line no-console
    await transaction.rollback();
    return [];
  }
};

module.exports = { performQueriesWithTransaction };
