module.exports = (sequelize, DataTypes) => {
  const RefreshToken = sequelize.define('refreshToken', {
    refreshToken: {
      allowNull: false,
      type: DataTypes.STRING(128),
      unique: true,
      validate: {
        notNull: true,
      },
    },
    lastIssueAt: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        isDate: true,
      },
    },
  }, {
    timestamps: true,
  });

  RefreshToken.associate = (models) => {
    RefreshToken.belongsTo(models.User, {
      foreignKey: {
        allowNull: false,
      },
      onDelete: 'CASCADE',
    });
  };

  return RefreshToken;
};
