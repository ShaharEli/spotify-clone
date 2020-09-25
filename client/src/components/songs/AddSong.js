import React,{useEffect,useState} from 'react'
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Button from "@material-ui/core/Button"
import axios from 'axios';
import Select from 'react-select'
import { useHistory } from "react-router-dom";
import TextArea from "@material-ui/core/TextField"
import Cookie from "js-cookie"
  const useStyles = makeStyles((theme) => ({
    paper: {
      position: 'absolute',
      backgroundColor: "transparent",  
    },
  }));
function AddSong() {
    const [open, setOpen] = React.useState(true);
    const [artists, setArtists] = useState([]);
    const [albums, setAlbums] = useState([]);
    const [unfilterdAlbums, setUnfilteredAlbums] = useState([]);
    const [chosenAlbum,setChosenAlbum]=useState("")
    const [chosenArtist,setChosenArtist]=useState("")
    const [songName,setSongName]=useState("")
    const [lyrics,setLyrics]=useState("")
    const [link,setLink]=useState("")
    const [length,setLength]=useState("")
    const [track,setTrack]=useState(1)
    const history = useHistory();




    useEffect(()=>{
        (async()=>{
           const {data} =await axios.get("/artists",{headers:{
            token:Cookie.get("token")
        }})
           const artistsData = data
            const artistsOptions = []
            for (let artist of artistsData){
                artistsOptions.push({value:artist.id,label:artist.name})
            }
            setArtists(artistsOptions)
            const albumsList =await axios.get("/albums",{headers:{
              token:Cookie.get("token")
          }})
            const albumsData = albumsList.data
            const albumsOptions = []
            for (let album of albumsData){
                albumsOptions.push({value:album.id,label:album.name})
            }
            setAlbums(albumsOptions)
            setUnfilteredAlbums(albumsData)
        })()
    },[])

    const classes = useStyles();
    
    
      const handleClose = () => {
        setOpen(false);
        history.push("/songs");

      };
      const handleChangeArtists = (e) => {
          setChosenArtist(e)
          const albumsData=unfilterdAlbums.filter(album=>{
           return album.artistId===e.value
        })
          const albumsOptions = []
          for (let album of albumsData){
              albumsOptions.push({value:album.id,label:album.name})
          }
          setAlbums(albumsOptions)
          setChosenAlbum("")

      };

      const setChosenValue =(e)=>{
          setChosenAlbum(e)
      }
      function generateTime() {
        let today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();
        today = `${yyyy}-${mm}-${dd}`;
        return `${today}`;
      }
      const handleSubmit =e=>{
          e.preventDefault()
          if(!chosenArtist.value){
          alert('You forgot the artist!')
          }
          else if(!chosenAlbum.value){
          alert('You forgot the album!')
          }
          else{
          const song={title:songName,length:`00:${length}`,artistId:chosenArtist.value,albumId:chosenAlbum.value,
         youtubeLink:link,lyrics:lyrics,uploadAt:generateTime(),trackNumber:track}
          axios.post("/songs",song,{headers:{
            token:Cookie.get("token")
        }})
          .then(handleClose)
        }

        
      }
      const defaultWidth={width:"80%"}
      const body = (
        <div style={{left:"11vw",top:"5vh",width:"78vw",height:"90vh",backgroundColor:"white"}}  className={classes.paper}>
            <form style={{width:"99%",paddingLeft:8}} onSubmit={e=>handleSubmit(e)}>
                <h2 >Add song:</h2>
                <TextArea value={songName} onChange={e=>setSongName(e.target.value)} required={true} style={{width:"61%"}} label="Enter song name"></TextArea><br/><br/>
                <div style={defaultWidth}>
                <Select  placeholder="choose artist..."            
                options={artists}  
                onChange={handleChangeArtists}
                value={chosenArtist}
                />
                </div><br/>
                <div style={defaultWidth}>
                <Select placeholder="choose album..."            
                options={albums}
                value={chosenAlbum} 
                onChange={setChosenValue}
                 />
                </div><br/>
                <TextArea value={link} onChange={e=>setLink(e.target.value)} required={true}  style={{width:"61%"}} label="Enter youtube link"></TextArea><br/><br/>
                <label >songs length:&nbsp;  </label>
                <input value={length} onChange={e=>setLength(e.target.value)}  type="time" required={true}  placeholder="enter the song's length ..."></input><br/><br/>
                <label >track number: &nbsp;&nbsp;</label>
                <input value={track} onChange={e=>setTrack(e.target.value)} type="number" style={{width:60,textAlign:"center"}} placeholder="enter track number..." required={true} ></input><br/><br/>
                <label >lyrics:&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; </label>
                <textarea value={lyrics} onChange={(e=>setLyrics(e.target.value))}  placeholder="enter lyrics..." style={{width:"62%"}}></textarea><br/><br/>
                <Button style={{marginLeft:"18vw"}} type="submit" color="primary" variant="contained" >Add</Button>
            </form>
        </div>
      );


    return (
            <Modal 
                open={open}
                onClose={handleClose}
                aria-labelledby="simple-modal-title"
                aria-describedby="simple-modal-description"
            >
                {body}
                
            </Modal>
    )
}

export default AddSong
