import React from 'react'
import "./SongItem.css"
// import solenolyrics from "solenolyrics"
// import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
// import CancelIcon from '@material-ui/icons/Cancel';
import PlayCircleOutlineIcon from '@material-ui/icons/PlayCircleOutline';
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

function SongItem({song}) {
    const title = song.title
    const link =song.youtube_link.replace("watch?v=","embed/")
    const date = song.upload_at.slice(0,10)
    const album =song.album
    const artist = song.artist
    const length = song.length
    // const [lyrics,setLyrics] = useState("")
    // useEffect(() => {
    //     const getLyrics=async ()=>{
    //         try{
    //             const data =await solenolyrics.requestLyricsFor(title);
    //             setLyrics(data)
    //         }
    //         catch(e){
    //             setLyrics("")
    //         }
    //     }
    //     getLyrics()
    // }, [])
        
    

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
        <div className="songs">
            <div className="songInfo"><PlayCircleOutlineIcon style={{cursor:"pointer"}} onClick={handleOpen}></PlayCircleOutlineIcon></div>
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
            <div className="songInfo">upload date: {date}</div>
            <div className="songInfo">album: {album}</div>
            <div className="songInfo">artist: {artist }</div>
            
        </div>
    )
}

export default SongItem
