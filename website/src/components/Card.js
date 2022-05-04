import '../card.scss';
import Avatar from '@mui/material/Avatar';
import { Grid } from '@mui/material';
import { useState,useEffect } from 'react';
import { Stack } from '@mui/material';
import { Button } from '@mui/material';
import changeActiveNominant from './Stepper'
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
      <Stack alignItems="center" >
        <h1 style={{margin:20}}>{name}</h1>
        <Avatar sx={{width:200,height:200,border:5,borderColor:{borderColor},marginTop:2}}  src={image}></Avatar>
        <Button variant='outlined' sx={{marginTop:2}} >Vote</Button>
      </Stack>
        
    </Grid>
      
    
  )
}
export default NominantCard