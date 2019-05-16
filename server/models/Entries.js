module.exports = (sequelize, DataTypes) => {
  const Entries = sequelize.define(
    'Entries',
    {
      title: DataTypes.STRING,
      description: DataTypes.STRING,
      userId: {
        type: DataTypes.INTEGTER,
        references: {
          model: 'User',
          key: 'id',
          as: 'userId',
        },
      },
    },
    {},
  );
  Entries.associate = (models) => {
    Entries.belongsTo(models.User, {
      foreignKey: 'userId',
      onDelete: 'CASCADE',
    });
  };
  return Entries;
};
