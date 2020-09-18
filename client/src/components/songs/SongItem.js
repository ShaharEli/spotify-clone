import React from 'react'
import "./SongItem.css"
import { Link } from 'react-router-dom'
import {motion} from 'framer-motion'
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
      position: 'absolute',
      backgroundColor: "transparent",
  
    },
  }));
  function generateTime() {
    let today = new Date();
    const dd = String(today.getDate()).padStart(2, '0');
    const mm = String(today.getMonth() + 1).padStart(2, '0');
    const yyyy = today.getFullYear();
    today = `${yyyy}-${mm}-${dd}`;
    return `${today}`;
  }

function SongItem({song,maxWidth,index,query,oneSongProp,background}) {
  
   let styles=oneSongProp?{minWidth:0,width:"90%"}:
    maxWidth&&{maxWidth:"40vw"} 
    styles=background? {...styles,backgroundColor:"blue"}:styles
    const title = song.title
    const link =song.youtube_link.replace("watch?v=","embed/").split("&list")[0]+"?autoplay=1"
    const date = song.upload_at?song.upload_at.slice(0,10) : generateTime()
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
        <motion.div 
        initial={{opacity:0,x:"-100%"}}
        animate={{opacity:1,x:0}}
        exit={{opacity:0,x:"-100%"}}
        transition={{
            default: { duration: 0.6 },
            delay:index<10?index/9:0
        }}
        className={album?"songs":"albumSongs"} style={styles} >
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
            
            <Link to={query?`/song/${song.id}?${query[0]}=${query[1]}`:`/song/${song.id}?all_songs=true`} style={{textDecoration:"none",color:"black"}}>
             <div className="songInfo">{title}</div>
            </Link>

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
        </motion.div>
    )
}




export default SongItem



