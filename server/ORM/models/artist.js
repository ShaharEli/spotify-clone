'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Artist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Song,{
        foreignKey: 'artist_id',
      })
      this.hasMany(models.Album,{
        foreignKey: 'artist_id',

      })
      this.hasMany(models.User_artist,{
        foreignKey: 'artist_id',
      })

    }
  };
  Artist.init({
    name: DataTypes.STRING,
    uploaded_at: DataTypes.DATE,
    cover_img: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Artist',
    paranoid:true
    
  });
  return Artist;
};