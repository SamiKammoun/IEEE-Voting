import NominantCard from "./components/Card";
import HorizontalLinearStepper from "./components/Stepper";
import Grid from '@mui/material/Grid'
import Box from '@mui/material/Box';
function App() {
  return (
    <>
    <HorizontalLinearStepper>
      <Box 
        sx={{
          display: 'flex',
          '& > :not(style)': {
            m: 1,
            width: 128,
            height: 128,
          },
        }}>
        <Grid spacing={2} >
          <NominantCard/>
          <NominantCard/>
          <NominantCard/>
        </Grid>
      </Box>
    </HorizontalLinearStepper>
    </>
    
  );
}

export default App;
