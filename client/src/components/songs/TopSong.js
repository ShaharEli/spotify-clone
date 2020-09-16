import React,{useState} from 'react'
import "./TopSong.css"
import { Link } from 'react-router-dom'
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

function TopSong({song,query}) {
    const title = song.title
    const link =song.youtube_link.replace("watch?v=","embed/").split("&list")[0]
    const date = song.upload_at.slice(0,10)
    const album =song.album
    const artist = song.artist
    const length = song.length.slice(3,10)
    const imgSrc = song.img
    const [showImg,setShowImg]=useState(true)
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
        <div className="topSongs"  onMouseEnter={()=>setShowImg(false)} onMouseLeave={()=>setShowImg(true)} >
            <Link to={query?`/song/${song.id}?${query[0]}=${query[1]}`:`/`} style={{textDecoration:"none",color:"black"}}>
             <div >{title}</div>
            </Link>
            <div className="topSongInfo">
            { showImg?
            <img className="topSongImages" src={imgSrc} alt="" />
            :
              <PlayCircleOutlineIcon style={{cursor:"pointer"}} onClick={handleOpen}></PlayCircleOutlineIcon>
            }
            </div>
            <Modal 
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
                
            </Modal>
            <div className="mainTopSong">
            <div >{length}</div>
            <div >{date}</div>
            <Link style={{cursor:"pointer",textDecoration:"none",color:"black"}} to={`/album/${song.album_id}`}>
            album: 
            &nbsp;
            {album}
            </Link>
            <Link style={{cursor:"pointer",textDecoration:"none",color:"black"}} to={`/artist/${song.artist_id}`}>
            artist: {artist}
            </Link>
            <Share  link={song.youtube_link}  songName={song.title} artistName={song.artist} />
            </div>
        </div>
    )
}

export default TopSong
