module.exports = (sequelize, DataTypes) => {
  const ConsultingData = sequelize.define('consultingData', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    preference: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      },
    },
    startDate: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        notNull: true,
      },
    },
    endDate: {
      allowNull: false,
      type: DataTypes.DATE,
      validate: {
        notNull: true,
      },
    },
    price: {
      allowNull: false,
      type: DataTypes.INTEGER.UNSIGNED,
      validate: {
        notNull: true,
      },
    },
    purpose: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notNull: true,
      },
    },
    want: {
      allowNull: false,
      type: DataTypes.TEXT,
      validate: {
        notNull: true,
      },
    },
  }, {
    timestamps: true,
  });

  ConsultingData.associate = (models) => {
    ConsultingData.belongsTo(models.User, {
      foreignKey: {
        name: 'sender',
      },
      onDelete: 'CASCADE',
    });
    ConsultingData.belongsTo(models.Consultant, {
      foreignKey: {
        name: 'receiver',
      },
      onDelete: 'CASCADE',
    });
  };

  return ConsultingData;
};
