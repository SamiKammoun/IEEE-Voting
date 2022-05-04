import NominantCard from "./components/Card";
import HorizontalLinearStepper from "./components/Stepper";
import Grid from '@mui/material/Grid'
import { Container, Stepper } from "@mui/material";
import Connect from "./components/Connect";
import { useState } from "react";
function App() {
  const OrganizationalUnits = ['SB', 'CS', 'GRSS','WIE','RAS'];
  const Positions = [
    'Chair','Vice Chair','Secretary','Treasurer',
    'Community Manager','HR Manager','Web Master',
    'Training Manager']
  const [nominantAddresses, setnominantAddresses] = useState([])
  return (
    <>
    <Connect />
    <HorizontalLinearStepper >
      <Container>
        <Grid container spacing={{xs:2, md:3}} >
          <NominantCard />
          <NominantCard/>
          <NominantCard/>
        </Grid>
      </Container>
    </HorizontalLinearStepper>
    </>
    
  );
}

export default App;
