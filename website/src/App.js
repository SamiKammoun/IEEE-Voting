import HorizontalLinearStepper from "./components/Stepper";
import Connect from "./components/Connect";
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
