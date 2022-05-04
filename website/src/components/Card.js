import '../card.scss';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid'
import { useState,useEffect } from 'react';
const NominantCard = ({name,image,activeNominant,nominantAddress}) => {
  const [borderColor, setBorderColor] = useState("")
  useEffect(() => {
    if(nominantAddress == activeNominant){
      setBorderColor("blue")
    }
    else{
      setBorderColor("")
    }
  }, [activeNominant])
  
  return(
    
    <Grid item xs={12} sm={6} md={3} >
        <h1>{name}</h1>
        <Avatar sx={{width:200,height:200,border:5,borderColor:""}}  src={image}></Avatar>
    </Grid>
      
    
  )
}
export default NominantCard