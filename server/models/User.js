module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
    },
    {
      timestamps: false,
    },
  );
  User.associate = (models) => {
    User.hasMany(models.Entries, {
      foreignKey: 'userId',
      as: 'entries',
    });
  };
  return User;
};
