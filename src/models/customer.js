const { Model } = require('sequelize');

class Customer extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: { type: DataTypes.INTEGER },
        name: { type: DataTypes.STRING, allowNull: false },
        cpf: { type: DataTypes.STRING, allowNull: false, unique: true },
        phone: { type: DataTypes.STRING, allowNull: false },
        email: { type: DataTypes.STRING, allowNull: false, unique: true },
      },
      { sequelize, tableName: 'customer' },
    );
  }

  static associate({ Address }) {
    if (Address !== undefined) this.hasMany(Address);
  }
}

module.exports = (sequelize, DataTypes) => {
  Customer.init(sequelize, DataTypes);
  return Customer;
};
