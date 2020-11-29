module.exports = (sequelize, DataTypes) => {
  const Chatting = sequelize.define('chatting', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    data: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notNull: true,
      },
    },
    isChecked: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN,
      validate: {
        notNull: true,
      },
    },
  }, {
    timestamps: true,
  });

  Chatting.associate = (models) => {
    Chatting.belongsTo(models.User, {
      foreignKey: {
        name: 'sender',
      },
      onDelete: 'CASCADE',
    });
    Chatting.belongsTo(models.User, {
      foreignKey: {
        name: 'receiver',
      },
      onDelete: 'CASCADE',
    });
  };

  return Chatting;
};
