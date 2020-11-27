module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable('users', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        email: {
          allowNull: true,
          type: Sequelize.STRING(128),
          unique: true,
        },
        nickname: {
          allowNull: false,
          type: Sequelize.STRING(128),
          unique: true,
        },
        password: {
          allowNull: true,
          type: Sequelize.STRING,
        },
        isConsultant: {
          allowNull: false,
          defaultValue: false,
          type: Sequelize.BOOLEAN,
        },
        consultantAt: {
          allowNull: true,
          defaultValue: null,
          type: Sequelize.DATE,
        },
        birthDate: {
          allowNull: false,
          type: Sequelize.DATEONLY,
        },
        gender: {
          allowNull: false,
          type: Sequelize.ENUM([
            'm',
            'f',
            'o',
          ]),
        },
        profileImage: {
          allowNull: true,
          defaultValue: null,
          type: Sequelize.UUID,
          unique: true,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }, { transaction });

      await queryInterface.createTable('tokens', {
        id: {
          allowNull: false,
          autoIncrement: false,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          type: Sequelize.UUID,
        },
        secret: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        action: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        userId: {
          allowNull: true,
          type: Sequelize.INTEGER,
        },
      }, { transaction });

      await queryInterface.createTable('refreshTokens', {
        id: {
          allowNull: false,
          autoIncrement: true,
          defaultValue: Sequelize.UUIDV4,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        refreshToken: {
          allowNull: false,
          type: Sequelize.STRING(128),
          unique: true,
        },
        lastIssueAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        userId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
      }, { transaction });

      await queryInterface.createTable('consultants', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        backgroundImage: {
          allowNull: false,
          defaultValue: null,
          type: Sequelize.UUID,
          unique: true,
        },
        title: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        region: {
          allowNull: false,
          type: Sequelize.ENUM([
            '강원도',
            '경기도',
            '전라도',
            '경상도',
            '충청도',
            '제주도',
            '서울',
            '부산',
          ]),
        },
        introduce: {
          allowNull: false,
          defaultValue: null,
          type: Sequelize.TEXT,
        },
        cafe: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        restaurant: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        place: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }, { transaction });

      await queryInterface.createTable('filterTags', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        consultantId: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        tag: {
          allowNull: false,
          type: Sequelize.ENUM([
            '액티비티',
            '힐링',
            '쇼핑',
            '맛집투어',
            '인생샷',
            '자연',
            '유흥',
            '예술',
            '나홀로여행',
            '커플여행',
            '효도여행',
            '가족여행',
            '우정여행',
            '가성비',
            '뚜벅이',
            '드라이브',
            '럭셔리',
          ]),
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }, { transaction });

      await queryInterface.createTable('chattings', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        sender: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        receiver: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        data: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        isChecked: {
          allowNull: false,
          defaultValue: false,
          type: Sequelize.BOOLEAN,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }, { transaction });

      await queryInterface.createTable('consultingDatas', {
        id: {
          allowNull: false,
          autoIncrement: true,
          primaryKey: true,
          type: Sequelize.INTEGER,
        },
        sender: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        receiver: {
          allowNull: false,
          type: Sequelize.INTEGER,
        },
        preference: {
          allowNull: false,
          type: Sequelize.STRING,
        },
        startDate: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        endDate: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        price: {
          allowNull: false,
          type: Sequelize.INTEGER.UNSIGNED,
        },
        purpose: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        want: {
          allowNull: false,
          type: Sequelize.TEXT,
        },
        createdAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
        updatedAt: {
          allowNull: false,
          type: Sequelize.DATE,
        },
      }, { transaction });

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },

  async down(queryInterface) {
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.dropTable('consultingDatas');
      await queryInterface.dropTable('chattings');
      await queryInterface.dropTable('filterTags');
      await queryInterface.dropTable('consultants');
      await queryInterface.dropTable('refreshTokens');
      await queryInterface.dropTable('tokens');
      await queryInterface.dropTable('users');

      await transaction.commit();
    } catch (e) {
      await transaction.rollback();
      throw e;
    }
  },
};
