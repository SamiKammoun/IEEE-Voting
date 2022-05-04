import HorizontalLinearStepper from "./components/Stepper";
import Connect from "./components/Connect";
import { useState } from "react";
import { EthereumContext } from "./EthereumContext";
import { ProposalsContext } from "./ContractContext";
function App() {
  const OrganizationalUnits = ['SB', 'CS', 'GRSS','WIE','RAS'];
  const Positions = [
    'Chair','Vice Chair','Secretary','Treasurer',
    'Community Manager','HR Manager','Web Master',
    'Training Manager']
  const [nominantAddresses, setnominantAddresses] = useState([])
  return (
    <EthereumContext>
      <Connect />
        <HorizontalLinearStepper />
    </EthereumContext>
    
  );
}

export default App;
