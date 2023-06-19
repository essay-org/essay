module.exports = function (app) {
  const {
    Bone,
    DataTypes: { STRING, INTEGER, BIGINT, DATE, JSON },
  } = app.model;
  class Post extends Bone {
    static table = 'post';
    static initialize() {
      this.hasOne('user')
    }
    static attributes = {
      id: {
        type: STRING,
        primaryKey: true,
      },
      title: {
        type: STRING,
        validate: {
          notEmpty: true,
          notNull: true
        },
      },
      userId: {
        type: STRING,
        validate: {
          notEmpty: true,
          notNull: true
        },
      },
      content: {
        type: STRING,
        validate: {
          notEmpty: true,
          notNull: true
        },
      },
      status: {
        type: STRING,
        validate: {
          notEmpty: true,
          notNull: true,
          isIn: [['draft', 'pushed']],
        },
      },
      updatedAt: DATE,
      createdAt: DATE,
      deletedAt: DATE,
    };
  }
  return Post;
};
