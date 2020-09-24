'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Playlists_song,{
        foreignKey:"song_id"
      });
      this.hasMany(models.Interaction,{
        foreignKey:"song_id"
      });
      this.hasMany(models.User_song,{
        foreignKey:"song_id"
      });
      this.belongsTo(models.Artist, {
        foreignKey: 'artist_id'
      });
      this.belongsTo(models.Album, {
        foreignKey: 'album_id'
      });
      // define association here
    }
  };
  Song.init({
    youtube_link: DataTypes.STRING,
    album_id: DataTypes.INTEGER,
    artist_id: DataTypes.INTEGER,
    title: DataTypes.STRING,
    length: DataTypes.TIME,
    track_number: DataTypes.INTEGER,
    lyrics: DataTypes.TEXT,
    upload_at: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Song',
    paranoid:true
  });
  return Song;
};