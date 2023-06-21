module.exports = function (app) {
  const {
    Bone,
    DataTypes: { STRING,BOOLEAN, DATE, JSON },
  } = app.model;
  class Post extends Bone {
    static table = 'post';
    static attributes = {
      id: {
        type: STRING,
        primaryKey: true,
      },
      // 提取第一个h1作为标题
      title: {
        type: STRING,
        validate: {
          notEmpty: true,
          notNull: true
        },
      },
      // 提取第一张图作为缩略图
      thumbnail: {
        type: STRING
      },
      // 是否显示在菜单栏
      isShow: {
        type: BOOLEAN,
        defaultValue: false
      },
      // 是否置顶
      isTop: {
        type: BOOLEAN,
        defaultValue: false
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
