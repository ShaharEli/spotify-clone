'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.User_album,{
        foreignKey:"user_id"
      })
      this.hasMany(models.User_playlist,{
        foreignKey:"user_id"
      })
      this.hasMany(models.User_artist,{
        foreignKey:"user_id"
      })
      this.hasMany(models.User_song,{
        foreignKey:"user_id"
      })
      this.hasMany(models.Interaction,{
        foreignKey:"user_id"
      })

    }
  };
  User.init({
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    isAdmin: DataTypes.BOOLEAN,
    prefrences: DataTypes.JSON,
    remember_token: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
    paranoid:true
  });
  return User;
};