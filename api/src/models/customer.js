const { Model } = require('sequelize');

class Customer extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        name: { type: DataTypes.STRING, allowNull: false },
        cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
        phone: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
      },
      {
        sequelize,
        tableName: 'customer',
        name: { singular: 'customer', plural: 'customers' },
      },
    );
  }

  static associate({ Address }) {
    this.Addresses = this.hasMany(Address);
  }
}

module.exports = (sequelize, DataTypes) => {
  Customer.init(sequelize, DataTypes);
  return Customer;
};
