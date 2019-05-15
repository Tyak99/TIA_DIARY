module.exports = (sequelize, DataTypes) => {
  const Entries = sequelize.define('Entries', {
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    userId: DataTypes.INTEGER,
  }, {});
  Entries.associate = (models) => {
    Entries.belongsTo(models.User);
  };
  return Entries;
};
