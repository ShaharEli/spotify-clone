import React from 'react'
import "./SongItem.css"
// import solenolyrics from "solenolyrics"
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import CancelIcon from '@material-ui/icons/Cancel';

  
  function getModalStyle() {  
    return {
      top:"5%",
      left:"8%",
      width: "80vw",
      height:"80vh"
    };
  }
  
  const useStyles = makeStyles((theme) => ({
    paper: {
        margin:"auto",
      position: 'absolute',
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
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
        <CancelIcon onClick={handleClose} style={{cursor:"pointer",position:"absolute",right:10}} />
        <div className ="playSong">
        <iframe title={title} style={{width:"60vw",height:"60vh", frameBorder:"0",}} src={link} allow="accelerometer; autoplay; encrypted-media" allowFullScreen />    
        </div>

        </div>
      );

    return (
        <div className="songs">
            <div><PlayArrowIcon style={{cursor:"pointer"}} onClick={handleOpen}></PlayArrowIcon></div>
            <Modal 
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
            </Modal>
            <div className="songName">{title}</div>
            <div>{length}</div>
            <div>upload date: {date}</div>
            <div>album: {album}</div>
            <div>artist: {artist}</div>
        </div>
    )
}

export default SongItem
