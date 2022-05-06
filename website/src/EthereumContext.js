import {useState,useEffect, createContext, useContext} from 'react';
import { ethers } from "ethers";
import { ThemeProvider } from '@mui/system';
const EthereumProviderContext = createContext()
const EthereumAccountContext = createContext()
const EthereumChainContext = createContext()
const EthereumConnectContext = createContext()
export function useEthereumAccount() {
    return useContext(EthereumAccountContext)
}
export function useEthereumProvider(){
    return useContext(EthereumProviderContext)
}
export function useEthereumChain(){
    return useContext(EthereumChainContext)
}
export function useEthereumConnect(){
    return useContext(EthereumConnectContext)
}
export function EthereumContext({children}){
    const [currentAccount, setCurrentAccount] = useState("")
    const [chainName,setChainName] = useState("")
    const [provider,setProvider] = useState(null)
    useEffect(()=>{
        if(!window.ethereum) return
        const tempprovider = new ethers.providers.Web3Provider(window.ethereum);
        setProvider(tempprovider)
        if(provider == null) return
        provider.send("eth_requestAccounts", [])
        .then((accounts)=>{
            if(accounts.length>0) setCurrentAccount(accounts[0])
        })
        .catch((e)=>console.log(e))
        if(!currentAccount || !ethers.utils.isAddress(currentAccount)) return
        window.ethereum.on('accountsChanged', (accounts) => {
            setCurrentAccount(accounts[0])
          });
        window.ethereum.on("chainChanged", (network) => {
            setChainName(network.name)
          });
        
        provider.getNetwork().then((result)=>{
            setChainName(result.name)
        })
        if(chainName != "Polygon Testnet"){
            window.ethereum.request({
                method: "wallet_addEthereumChain",
                params: [{
                    chainId: "0x13881",
                    rpcUrls: ["https://rpc-mumbai.maticvigil.com/"],
                    chainName: "Polygon Testnet",
                    blockExplorerUrls: ["https://mumbai.polygonscan.com/"],
                    nativeCurrency: {
                        name: "MATIC",
                        symbol: "MATIC",
                        decimals: 18
                    }
                }]
            })
        }
    },[currentAccount,chainName])
    const onClickConnect = ()=> {
        if(!window.ethereum){
            console.log("please install MetaMask!")
            return
        }
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        window.ethereum.request({ method: 'eth_requestAccounts' });
        provider.send("eth_requestAccounts", [])
        .then((accounts)=>{
            if(accounts.length>0) setCurrentAccount(accounts[0])
        })
        .catch((e)=>console.log(e))
    }
    return (
        <EthereumAccountContext.Provider value={currentAccount}>
            <EthereumProviderContext.Provider value={provider}>
                <EthereumChainContext.Provider value={chainName}>
                    <EthereumConnectContext.Provider value={onClickConnect}>
                        {children}
                    </EthereumConnectContext.Provider>
                </EthereumChainContext.Provider>
            </EthereumProviderContext.Provider>
        </EthereumAccountContext.Provider>
    )
}