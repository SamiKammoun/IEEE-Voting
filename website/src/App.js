import NominantCard from "./components/Card";
import HorizontalLinearStepper from "./components/Stepper";
import Grid from '@mui/material/Grid'
import { Container } from "@mui/material";
import Connect from "./Connect";
function App() {
  return (
    <>
    <Connect />
    <HorizontalLinearStepper>
      <Container>
        <Grid container spacing={{xs:2, md:3}} >
          <NominantCard/>
          <NominantCard/>
          <NominantCard/>
        </Grid>
      </Container>
    </HorizontalLinearStepper>
    </>
    
  );
}

export default App;
