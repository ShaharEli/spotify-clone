'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Playlists_song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Song, {
        foreignKey: 'song_id'
      });
      this.belongsTo(models.Playlist, {
        foreignKey: 'playlist_id'
      });

    }
  };
  Playlists_song.init({
    playlist_id: DataTypes.INTEGER,
    song_id: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Playlists_song',
  });
  return Playlists_song;
};