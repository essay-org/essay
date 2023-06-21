module.exports = function (app) {
  const {
    Bone,
    DataTypes: { STRING, DATE },
  } = app.model;
  // console.log(Realm)
  class User extends Bone {
    static table = 'user';
    static attributes = {
      id: {
        type: STRING,
        primaryKey: true,
      },
      type: {
        type: STRING,
        validate: {
          isIn: [['admin', 'user']],
          notNull: true,
          notEmpty: true,
        },
      },
      sign: {
        type: STRING,
        defaultValue: ''
      },
      email: {
        type: STRING,
        unique: true,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      nickname: {
        type: STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      password: {
        type: STRING,
        validate: {
          notNull: true,
          notEmpty: true,
        },
      },
      updatedAt: DATE,
      createdAt: DATE,
      deleteAt: DATE,
    };
  }
  return User;
};
