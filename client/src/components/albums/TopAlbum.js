import React, { useContext } from "react";
import "./AlbumItem.css";
import { Link } from "react-router-dom";
import AuthApi from "../Aoth/AuthApi";
import axios from "axios";
import { Tooltip } from "@material-ui/core";
import Cookie from "js-cookie";

function TopAlbum({ album, noAdd, views }) {
  const Auth = useContext(AuthApi);
  const name = album.name;
  const image = album.coverImg;
  const date = album.createdAt.slice(0, 10);
  const artist = album.artist;
  const addAlbum = async () => {
    await axios.post(
      "/favorites/album",
      { email: Auth.email, albumId: album.id },
      {
        headers: {
          token: Cookie.get("token"),
        },
      }
    );
  };
  return (
    <div className='topAlbum'>
      {!noAdd && (
        <Tooltip title='add to your albums'>
          <span onClick={addAlbum} className='addSong'>
            +
          </span>
        </Tooltip>
      )}
      <Link
        style={{ cursor: "pointer", textDecoration: "none", color: "black" }}
        to={`/album/${album.id}`}
      >
        <div className='albumsName'>{name}</div>
        <div>
          <img className='topImages' src={image} alt='' />
        </div>
      </Link>
      <Link
        style={{ cursor: "pointer", textDecoration: "none", color: "black" }}
        to={`/artist/${album.artistId}`}
      >
        <div>{artist}</div>
      </Link>
      <div>{views && "total views: " + album.views}</div>
      <div className='albumsDate'>{date}</div>
    </div>
  );
}

export default TopAlbum;
