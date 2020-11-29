const TYPE = {
  ACTIVITY: '액티비티',
  HEALING: '힐링',
  SHOPPING: '쇼핑',
  FOOD_TOUR: '맛집투어',
  LIFE_SHOT: '인생샷',
  NATURE: '자연',
  PLEASURE: '유흥',
  ART: '예술',
  ALONE: '나홀로여행',
  COUPLE: '커플여행',
  PARENTS: '효도여행',
  FAMILY: '가족여행',
  FRIENDSHIP: '우정여행',
  COST: '가성비',
  WALKING: '뚜벅이',
  DRIVE: '드라이브',
  LUXURY: '럭셔리',
};
Object.freeze(TYPE);

module.exports = (sequelize, DataTypes) => {
  const FilterTag = sequelize.define('filterTag', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    tag: {
      allowNull: false,
      type: DataTypes.ENUM(Object.values(TYPE)),
      validate: {
        isIn: [Object.values(TYPE)],
        notNull: true,
      },
    },
  }, {
    timestamps: true,
  });

  FilterTag.associate = (models) => {
    FilterTag.belongsTo(models.Consultant, {
      foreignKey: {
        name: 'consultantId',
      },
      onDelete: 'CASCADE',
    });
  };

  FilterTag.TYPE = TYPE;

  return FilterTag;
};
