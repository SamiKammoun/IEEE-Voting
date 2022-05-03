import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const OrganizationalUnits = ['SB', 'CS', 'GRSS','WIE','RAS'];
const Positions = [
  'Chair','Vice Chair','Secretary','Treasurer',
  'Community Manager','HR Manager','Web Master',
  'Training Manager']

export default function HorizontalLinearStepper(props) {
  const [activeOU, setActiveOU] = React.useState(0);
  const [activePO, setActivePO] = React.useState(0);

  const handleBack = () => {
    if(activePO === 0){
      setActivePO(Positions.length - 1)
      setActiveOU((prevActiveOU) => prevActiveOU -1)
    }
    else{
      setActivePO((prevActivePO) => prevActivePO -1)
    }
  };

  const handleNext = () => {
    if(activeOU === OrganizationalUnits.length -1 
      && activePO === Positions.length -1){
        setActiveOU((prevActiveOU) => prevActiveOU +1)
        setActivePO((prevActivePO) => prevActivePO +1)
        return
      }
    if(activePO === Positions.length - 1){
      setActivePO(0);
      setActiveOU((prevActiveOU) => prevActiveOU +1)
    }
    else{
      setActivePO((prevActivePO) => prevActivePO +1)
    }
  };

  const submit = () => {

  }
  const reset = () => {

  }

  return (
    <Box sx={{ width: '100%' }}>
      <Stepper activeStep={activeOU}>
        {OrganizationalUnits.map((label, index) => {
          return (
            <Step key={label} >
              <StepLabel >{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      <Stepper activeStep={activePO}>
        {Positions.map((label, index) => {
          return (
            <Step key={label} >
              <StepLabel >{label}</StepLabel>
            </Step>
          );
        })}
      </Stepper>
      {activeOU === OrganizationalUnits.length ? (
        <React.Fragment>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button variant='contained' onClick={submit}>Submit</Button>
          </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button  variant='contained' onClick={reset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {props.children}
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Button
              variant='contained'
              color="inherit"
              disabled={activeOU === 0 && activePO === 0}
              onClick={handleBack}
              sx={{ mr: 1 }}
            >
              Back
            </Button>
            <Box sx={{ flex: '1 1 auto' }} />
              <Button variant='contained' color="inherit" onClick={handleNext} sx={{ mr: 1 }}>
                Next
              </Button>
          </Box>
        </React.Fragment>
      )}
    </Box>
  );
}
