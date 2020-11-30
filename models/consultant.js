const REGION = {
  GANGWON: '강원도',
  GYEONGGI: '경기도',
  JEOLLA: '전라도',
  GYEONGSANG: '경상도',
  CHUNGCHEONG: '충청도',
  JEJU: '제주도',
  SEOUL: '서울',
  BUSAN: '부산',
};

module.exports = (sequelize, DataTypes) => {
  const Consultant = sequelize.define('consultant', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    backgroundImage: {
      allowNull: false,
      type: DataTypes.UUID,
      unique: true,
      validate: {
        notNull: true,
      },
    },
    title: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      },
    },
    region: {
      allowNull: false,
      type: DataTypes.ENUM(Object.values(REGION)),
      validate: {
        isIn: [Object.values(REGION)],
        notNull: true,
      },
    },
    introduce: {
      allowNull: false,
      defaultValue: null,
      type: DataTypes.TEXT,
      validate: {
        notNull: true,
      },
    },
    cafe: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      },
    },
    restaurant: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      },
    },
    place: {
      allowNull: false,
      type: DataTypes.STRING,
      validate: {
        notNull: true,
      },
    },
  }, {
    timestamps: true,
  });

  Consultant.associate = (models) => {
    Consultant.hasOne(models.ConsultingData);
    Consultant.hasMany(models.FilterTag);
    Consultant.belongsTo(models.User, {
      foreignKey: {
        name: 'id',
        allowNull: true,
      },
      onDelete: 'CASCADE',
    });
  };

  Consultant.REGION = REGION;

  return Consultant;
};
