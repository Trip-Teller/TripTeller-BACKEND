/* eslint-disable func-names */
const GENDER = {
  MAN: 'm',
  FEMALE: 'f',
  OTHER: 'o',
};
Object.freeze(GENDER);

const bcrypt = require('bcryptjs');

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('user', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: DataTypes.INTEGER,
    },
    email: {
      allowNull: true,
      type: DataTypes.STRING(128),
      unique: true,
    },
    nickname: {
      allowNull: false,
      type: DataTypes.STRING(128),
      unique: true,
      validate: {
        notNull: true,
      },
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING,
      set(value) {
        const salt = bcrypt.genSaltSync();
        this.setDataValue('password', bcrypt.hashSync(value, salt));
      },
      validate: {
        notNull: true,
      },
    },
    isConsultant: {
      allowNull: false,
      defaultValue: false,
      type: DataTypes.BOOLEAN,
      validate: {
        notNull: true,
      },
    },
    consultantAt: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.DATE,
    },
    birthDate: {
      allowNull: false,
      type: DataTypes.DATEONLY,
      validate: {
        notNull: true,
      },
    },
    gender: {
      allowNull: false,
      type: DataTypes.ENUM(Object.values(GENDER)),
      validate: {
        isIn: [Object.values(GENDER)],
        notNull: true,
      },
    },
    profileImage: {
      allowNull: true,
      defaultValue: null,
      type: DataTypes.UUID,
      unique: true,
    },
  }, {
    paranoid: true,
    timestamps: true,
  });

  User.associate = (models) => {
    User.hasOne(models.Consultant);
    User.hasMany(models.ConsultingData);
    User.hasMany(models.chatting, {
      as: 'senderChatting',
      foreignKey: {
        name: 'sender',
      },
      sourceKey: {
        name: 'id',
      },
    });
    User.hasMany(models.chatting, {
      as: 'receiverChatting',
      foreignKey: {
        name: 'receiver',
      },
      sourceKey: {
        name: 'id',
      },
    });
  };

  /**
   * @param {string} password
   * @returns {boolean}
   */
  User.prototype.validatePasswordHash = function (password) {
    return bcrypt.compareSync(password, this.password);
  };

  User.GENDER = GENDER;

  return User;
};
