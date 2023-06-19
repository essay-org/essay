module.exports = function (app) {
    const {
      Bone,
      DataTypes: { STRING, DATE, JSON },
    } = app.model;
    class Option extends Bone {
      static table = 'option';
      static attributes = {
        id: {
          type: STRING,
          primaryKey: true,
        },
        name: {
          type: STRING,
          unique: true,
          validate: {
            notEmpty: true,
            notNull: true
          },
        },
        value: {
          type: JSON,
        },
        updatedAt: DATE,
        createdAt: DATE,
        deletedAt: DATE,
      };
    }
    return Option;
  };
  