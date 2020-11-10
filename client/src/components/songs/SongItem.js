import React from "react";
import "./SongItem.css";
import { Link } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import PlayCircleOutlineIcon from "@material-ui/icons/PlayCircleOutline";
import AuthApi from "../Aoth/AuthApi";
import axios from "axios";
import Tooltip from "@material-ui/core/Tooltip";
import { motion } from "framer-motion";
import Cookie from "js-cookie";

import Share from "./Share";
function getModalStyle() {
  return {
    top: "10vh",
    left: "22.5vw",
    width: "55vw",
    height: "50vh",
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    backgroundColor: "transparent",
  },
}));

function SongItem({ song, maxWidth, index, query, oneSongProp, background }) {
  const Auth = React.useContext(AuthApi);
  let styles = oneSongProp
    ? { minWidth: 0, width: "90%" }
    : maxWidth && { maxWidth: "40vw" };
  styles = background ? { ...styles, backgroundColor: "#00C700" } : styles;
  const title = song.title;
  const link =
    song.youtubeLink.replace("watch?v=", "embed/").split("&list")[0] +
    "?autoplay=1";
  const date = song.createdAt.slice(0, 10);
  const album = song.Album["name"];
  const artist = song.Artist ? song.Artist["name"] : "no artist";
  const length = song.length;
  const addSong = async () => {
    await axios.post(
      "/favorites/song",
      { email: Auth.email, songId: song.id },
      {
        headers: {
          token: Cookie.get("token"),
        },
      }
    );
  };
  const classes = useStyles();
  const [modalStyle] = React.useState(getModalStyle);
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div style={modalStyle} className={classes.paper}>
      <div className='playSong'>
        <iframe
          title={title}
          style={{ width: "60vw", height: "60vh", frameBorder: "0" }}
          src={link}
          allow='accelerometer; autoplay; encrypted-media'
          allowFullScreen
        />
      </div>
    </div>
  );

  return (
    <motion.div
      initial={index > -1 && { opacity: 0, x: "-100%" }}
      animate={{ opacity: 1, x: 0 }}
      transition={{
        default: { duration: 0.6 },
        delay: index < 10 ? index / 9 : 0,
      }}
      className={album ? "songs" : "albumSongs"}
      style={styles}
    >
      <Tooltip title='add to your songs'>
        <span onClick={addSong} className='addSong'>
          +
        </span>
      </Tooltip>
      <div className='songInfo'>
        {!album && (
          <span className='truckNamber'>{song.truckNumber}&nbsp;</span>
        )}
        <PlayCircleOutlineIcon
          style={{ cursor: "pointer" }}
          onClick={handleOpen}
        ></PlayCircleOutlineIcon>
      </div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='simple-modal-title'
        aria-describedby='simple-modal-description'
      >
        {body}
      </Modal>

      <Link
        to={
          query
            ? `/song/${song.id}?${query[0]}=${query[1]}`
            : `/song/${song.id}?all_songs=true`
        }
        style={{ textDecoration: "none", color: "black" }}
      >
        <div className='songInfo'>{title}</div>
      </Link>

      <div className='songInfo'>{length}</div>
      {album ? (
        <>
          <div className='songInfo'>upload date: {date}</div>
          <Link
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "black",
            }}
            to={`/album/${song.albumId}`}
          >
            <div className='songInfo'>
              album name: &nbsp;
              {album}
            </div>
          </Link>
          <Link
            style={{
              cursor: "pointer",
              textDecoration: "none",
              color: "black",
            }}
            to={`/artist/${song.artistId}`}
          >
            <div className='songInfo'>artist: {artist}</div>
          </Link>
          <Share
            link={song.youtubeLink}
            songName={song.title}
            artistName={artist}
          />
        </>
      ) : (
        <Share
          link={song.youtubeLink}
          songName={song.title}
          artistName={artist}
        />
      )}
    </motion.div>
  );
}

export default SongItem;
