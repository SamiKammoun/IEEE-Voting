import React from 'react';
import { ethers } from "ethers";
import {useEffect} from 'react';
import Button from '@mui/material/Button';
import { Snackbar } from '@mui/material';
import Alert from '@mui/material/Alert'
import { useEthereumConnect,useEthereumAccount,useEthereumChain } from '../EthereumContext';
const Connect = () => {
    // const [openSnackBar, setOpenSnackBar] = useState(false);
    const currentAccount = useEthereumAccount()
    const onClickConnect = useEthereumConnect()
    const chainName = useEthereumChain()
    // useEffect(() => {
    //   if(chainName === 'Hardhat'){
    //       setOpenSnackBar(false)
    //   }
    //   else{
    //       setOpenSnackBar(true)
    //   }
    
    // }, [chainName])
    
    return (
        <>
        {!ethers.utils.isAddress(currentAccount) ? 
        <Button sx={{ color: 'white',}} variant="contained" onClick={() => {onClickConnect()}}>Connect Wallet</Button>
        :   
        <h4>Your address : {currentAccount}</h4>
        }
        {/* <Snackbar
        open={openSnackBar}>
            <Alert severity="warning">Please switch network!</Alert>
        </Snackbar> */}
        </>
    )
}
export default Connect;