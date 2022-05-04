// import {useState,useEffect} from 'react';
// import { useEthereumProvider } from './EthereumContext';
// import { ethers } from 'ethers';
// import { createContext,useContext } from 'react';
// const BallotAddress = "0x5FbDB2315678afecb367f032d93F642f64180aa3"
// const BallotABI = [
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "duration",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "nonpayable",
//       "type": "constructor"
//     },
//     {
//       "anonymous": false,
//       "inputs": [
//         {
//           "indexed": true,
//           "internalType": "address",
//           "name": "voter_address",
//           "type": "address"
//         },
//         {
//           "indexed": true,
//           "internalType": "string",
//           "name": "voter_name",
//           "type": "string"
//         }
//       ],
//       "name": "voterAdded",
//       "type": "event"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string[]",
//           "name": "name",
//           "type": "string[]"
//         },
//         {
//           "internalType": "string[]",
//           "name": "image",
//           "type": "string[]"
//         },
//         {
//           "internalType": "uint8[]",
//           "name": "organizationalUnit",
//           "type": "uint8[]"
//         },
//         {
//           "internalType": "uint8[]",
//           "name": "position",
//           "type": "uint8[]"
//         },
//         {
//           "internalType": "address[]",
//           "name": "nominantAddress",
//           "type": "address[]"
//         }
//       ],
//       "name": "addBatchProposals",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "string",
//           "name": "name",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "image",
//           "type": "string"
//         },
//         {
//           "internalType": "uint8",
//           "name": "organizationalUnit",
//           "type": "uint8"
//         },
//         {
//           "internalType": "uint8",
//           "name": "position",
//           "type": "uint8"
//         },
//         {
//           "internalType": "address",
//           "name": "nominantAddress",
//           "type": "address"
//         }
//       ],
//       "name": "addProposal",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "getProposals",
//       "outputs": [
//         {
//           "internalType": "address[]",
//           "name": "",
//           "type": "address[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "nominant",
//           "type": "address"
//         }
//       ],
//       "name": "getResultsOf",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "getVoters",
//       "outputs": [
//         {
//           "internalType": "address[]",
//           "name": "",
//           "type": "address[]"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "voterAddress",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "_name",
//           "type": "string"
//         }
//       ],
//       "name": "giveRightToVote",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "name": "isModerator",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "name": "proposalOf",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "nominantAddress",
//           "type": "address"
//         },
//         {
//           "internalType": "string",
//           "name": "name",
//           "type": "string"
//         },
//         {
//           "internalType": "string",
//           "name": "image",
//           "type": "string"
//         },
//         {
//           "internalType": "uint8",
//           "name": "organizationalUnit",
//           "type": "uint8"
//         },
//         {
//           "internalType": "uint8",
//           "name": "position",
//           "type": "uint8"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "proposals",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address[]",
//           "name": "nominants",
//           "type": "address[]"
//         }
//       ],
//       "name": "vote",
//       "outputs": [],
//       "stateMutability": "nonpayable",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "voteEnd",
//       "outputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [],
//       "name": "voteEnded",
//       "outputs": [
//         {
//           "internalType": "bool",
//           "name": "",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "name": "voter",
//       "outputs": [
//         {
//           "internalType": "string",
//           "name": "name",
//           "type": "string"
//         },
//         {
//           "internalType": "address",
//           "name": "voterAddress",
//           "type": "address"
//         },
//         {
//           "internalType": "bool",
//           "name": "canVote",
//           "type": "bool"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     },
//     {
//       "inputs": [
//         {
//           "internalType": "uint256",
//           "name": "",
//           "type": "uint256"
//         }
//       ],
//       "name": "voters",
//       "outputs": [
//         {
//           "internalType": "address",
//           "name": "",
//           "type": "address"
//         }
//       ],
//       "stateMutability": "view",
//       "type": "function"
//     }
//   ]
// const BallotProposalsContext = createContext()
// const BallotVoteEndedContext = createContext()
// const BallotVoteContext = createContext()
// export function useBallotProposals(){
//     return useContext(BallotProposalsContext)
// }
// export function useVoteEnded(){
//     return useContext(BallotVoteEndedContext)
// }
// export function useVote(){
//     return useContext(BallotVoteContext)
// }
// export function ProposalsContext({children}){
//     const provider = useEthereumProvider()
//     const [signer,setSigner] = useState()
//     const [contract,setContract] = useState()
//     useEffect(()=>{
//         const signer = provider.getSigner()
//         const contract = new ethers.Contract(BallotAddress,BallotABI,signer)
//     },[provider])
//     const voteEnded = async ()=> {
//         const b = await contract.voteEnded()
//         return b
//     }
//     const getProposals = async (OU,PO) => {
//         const data = await contract.getProposals()
//         data.filter((proposal) => proposal.organizationalUnit == OU && proposal.position == PO)
//         return data
//     }
//     const vote = async (nominants) => {
//         await contract.vote(nominants)
//     }
//     return (
//         <BallotProposalsContext.Provider value={getProposals}>
//             {children}
//         </BallotProposalsContext.Provider>
//     )
// }