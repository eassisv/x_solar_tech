const { Model } = require('sequelize');

class Address extends Model {
  static init(sequelize, DataTypes) {
    super.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          autoIncrement: true,
          allowNull: false,
        },
        cep: { type: DataTypes.STRING, allowNull: false },
        city: { type: DataTypes.STRING, allowNull: false },
        state: { type: DataTypes.STRING, allowNull: false },
        neighborhood: { type: DataTypes.STRING, allowNull: false },
        street: { type: DataTypes.STRING, allowNull: false },
        number: { type: DataTypes.INTEGER, allowNull: false },
        others: { type: DataTypes.STRING },
      },
      { sequelize, tableName: 'address' },
    );
  }

  static associate() {}
}

module.exports = (sequelize, DataTypes) => {
  Address.init(sequelize, DataTypes);
  return Address;
};
