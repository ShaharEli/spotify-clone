import { TextField } from "@material-ui/core";
import React from "react";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import "./search.css";
export const Search = () => {
  const [songs, setSongs] = useState([]);
  const [albums, setAlbums] = useState([]);
  const [artists, setArtists] = useState([]);
  const [playlists, setPlaylists] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const handleChange = async (e) => {
    const { value } = e.target;
    setSearchInput(value);
    await getAllData(value);
  };

  const showAll = async (field) => {
    switch (field) {
      case "songs":
        setSongs(await getData("songs", searchInput, true));
        break;
      case "albums":
        setAlbums(await getData("albums", searchInput, true));
        break;
      case "artists":
        setArtists(await getData("artists", searchInput, true));
        break;
      case "playlists":
        setPlaylists(await getData("playlists", searchInput, true));
        break;
    }
  };

  const getData = async (field, valueToSearch, all) => {
    try {
      const { data } = await axios.get(
        `/search/${field}?search=${valueToSearch}${all ? "&all=all" : ""}`
      );
      console.log(data);
      return data;
    } catch (err) {}
  };
  const getAllData = async (value) => {
    setSongs(await getData("songs", value));
    setAlbums(await getData("albums", value));
    setArtists(await getData("artists", value));
    setPlaylists(await getData("playlists", value));
  };

  return (
    <div style={{ textAlign: "center" }}>
      <TextField
        label='search'
        style={{ marginTop: 15, width: "40vw", minWidth: 250 }}
        variant='outlined'
        value={searchInput}
        onChange={handleChange}
      ></TextField>
      {searchInput.length > 0 && (
        <div className='search-modal'>
          <div className='all-searchers'>
            <span onClick={() => showAll("songs")} className='show-all'>
              songs
            </span>
            <span onClick={() => showAll("albums")} className='show-all'>
              albums
            </span>
            <span onClick={() => showAll("artists")} className='show-all'>
              artists
            </span>
            <span onClick={() => showAll("playlists")} className='show-all'>
              playlists
            </span>
          </div>
          <h3>songs</h3>
          {songs.map((song, index) => {
            return (
              <>
                <div key={index + song.id} className='searched-song'>
                  <div>{song.title}</div>
                  <div>album: {song.Album.name}</div>
                  <div>artist: {song.Artist.name}</div>
                </div>
              </>
            );
          })}
          <div className='show-more' onClick={() => showAll("songs")}>
            Show more..
          </div>

          <hr />
          <h3>albums</h3>
          {albums.map((album, index) => {
            return (
              <>
                <div key={index + album.id} className='searched-album'>
                  <div>{album.name}</div>
                  <div></div>
                  <div> artist: {album.Artist.name}</div>
                </div>
              </>
            );
          })}
          <div className='show-more' onClick={() => showAll("albums")}>
            Show more..
          </div>
          <hr />
          <h3>artists</h3>
          {artists.map((artist, index) => {
            return (
              <>
                <div key={index + artist.id} className='searched-artist'>
                  <div>{artist.name}</div>
                  <div></div>
                  <div></div>
                </div>
              </>
            );
          })}
          <div className='show-more' onClick={() => showAll("artists")}>
            Show more..
          </div>
          <hr />
          <h3>playlists</h3>
          {playlists.map((playlist, index) => {
            return (
              <>
                <div key={index + playlist.id} className='searched-playlist'>
                  <div>{playlist.name}</div>
                  <div></div>
                  <div></div>
                </div>
              </>
            );
          })}
          <div className='show-more' onClick={() => showAll("playlists")}>
            Show more..
          </div>
          <hr />
        </div>
      )}
    </div>
  );
};
