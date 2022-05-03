import '../card.scss';
import Avatar from '@mui/material/Avatar';
import Grid from '@mui/material/Grid'
const NominantCard = (props) => {
  return(
    <Grid item xs={12} sm={6} md={3} >
        <h1>{props.name}</h1>
        <Avatar sx={{width:200,height:200,border:5,borderColor:'green'}} src={props.img}></Avatar>
    </Grid>
      
    
  )
}
export default NominantCard