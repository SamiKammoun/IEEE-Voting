import {useState,useEffect, createContext, useContext} from 'react';
import { ethers } from "ethers";
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
        if(chainName != "Kardiachain Testnet"){
            
            window.ethereum.request({
                id: 1,
                jsonrpc: "2.0",
                method: "wallet_addEthereumChain",
                params: [{
                    chainId: "0xF2",
                    rpcUrls: ["https://dev.kardiachain.io/"],
                    chainName: "Kardiachain Testnet",
                    blockExplorerUrls: ["https://explorer-dev.kardiachain.io"],
                    nativeCurrency: {
                        name: "KAI",
                        symbol: "KAI",
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