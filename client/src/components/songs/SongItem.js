import React, { useState } from 'react'
import "./SongItem.css"
import { Link } from 'react-router-dom'
import ShareIcon from '@material-ui/icons/Share';
// import solenolyrics from "solenolyrics"
import { WhatsappShareButton,FacebookMessengerIcon, EmailShareButton,FacebookMessengerShareButton,
  WhatsappIcon,EmailIcon
} from "react-share"

import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
import Share from './Share';
  function getModalStyle() {  
    return {
      top:"10vh",
      left:"22.5vw",
      width: "55vw",
      height:"50vh"
    };
  }

  
  const useStyles = makeStyles((theme) => ({
    paper: {
        // margin:"auto",
      position: 'absolute',
      backgroundColor: "transparent",
  
    },
  }));

function SongItem({song,maxWidth}) {

    const title = song.title
    const link =song.youtube_link.replace("watch?v=","embed/")
    const date = song.upload_at.slice(0,10)
    const album =song.album
    const artist = song.artist
    const length = song.length
        
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
        <div  style={modalStyle} className={classes.paper}>
        <div className ="playSong">
        <iframe title={title} style={{width:"60vw",height:"60vh", frameBorder:"0",}} src={link} allow="accelerometer; autoplay; encrypted-media" allowFullScreen />    
        
        </div>
        </div>
      );
      
      return (
        <div className={album?"songs":"albumSongs"} style={maxWidth&&{maxWidth:"40vw"}} >
            <div className="songInfo">
              {!album && <span className="truckNamber">{song.truck_number}&nbsp;</span>}
              <PlayCircleOutlineIcon style={{cursor:"pointer"}} onClick={handleOpen}></PlayCircleOutlineIcon></div>
            <Modal 
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
                
            </Modal>
             <div className="songInfo">{title}</div>
            <div className="songInfo">{length}</div>
            {album?
            <>
            <div className="songInfo">upload date: {date}</div>
            <Link style={{cursor:"pointer",textDecoration:"none",color:"black"}} to={`/album/${song.album_id}`}>
            <div className="songInfo">album name: 
            &nbsp;
            {album}
            </div>
            </Link>
            <Link  style={{cursor:"pointer",textDecoration:"none",color:"black"}} to={`/artist/${song.artist_id}`}>
            <div className="songInfo">artist: {artist}</div>
            </Link> 
            <Share link={song.youtube_link} songName={song.title} artistName={song.artist}/>
            </>
            :
            <Share link={song.youtube_link} songName={song.title} artistName={song.artist} />
            }
        </div>
    )
}




export default SongItem
