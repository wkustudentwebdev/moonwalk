module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isEmail: true,
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    county: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    birthDate: {
      type: DataTypes.DATE,
      allowNull: false,
      validate: {
        isDate: true,
        isAfter: '1900-08-04'
      }
    },
    gender: {
      type: DataTypes.ENUM('M', 'F', 'O'),
      allowNull: false,
    },
    preferredMeasure: {
      type: DataTypes.ENUM('MI', 'KM'),
      defaultValue: 'MI', 
    },
  }, {
    getterMethods: {
      age() {
        let year = 1000*60*60*24*365;
        let difference = Date.now() - Date.parse(this.birthDate);
        return Math.floor(difference / year);
      }
    },
    indexes: [
      {
        unique: true,
        fields: ['email'],
      }
    ],
  });
  User.associate = (models) => {
    User.hasMany(models.Exercise, {
      as: 'userID',
      foreignKey: 'userID',
    })
  };
  return User;
};
