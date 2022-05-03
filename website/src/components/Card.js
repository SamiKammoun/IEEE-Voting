import '../card.scss';
import Avatar from '@mui/material/Avatar';
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
const NominantCard = (props) => {
  return(
    
      <Paper elevation={3}>
        <h1>title</h1>
        <Avatar sx={{width:200,height:200}} src={props.img}>{props.title}</Avatar>
      </Paper>
    
  )
}
export default NominantCard