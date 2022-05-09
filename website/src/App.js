import HorizontalLinearStepper from "./components/Stepper";
import { useState } from "react";
import { EthereumContext } from "./EthereumContext";
import ResponsiveAppBar from "./components/NavBar";
function App() {
  return (
    <>
    <ResponsiveAppBar />
    <EthereumContext>
      <HorizontalLinearStepper />
    </EthereumContext>
    </>
    
    
  );
}

export default App;
