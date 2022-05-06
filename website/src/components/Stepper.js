import * as React from 'react';
import Box from '@mui/material/Box';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Container } from '@mui/material';
import { Grid } from '@mui/material';
import { Avatar } from '@mui/material';
import { Stack } from '@mui/material';
import { useState,useEffect } from 'react';
import { useEthereumProvider,useEthereumChain } from '../EthereumContext';
import { ethers } from 'ethers';
import CircularProgress from '@mui/material/CircularProgress';
import Countdown from 'react-countdown';
const BallotAddress = "0xFaA568A8261B2E9E9Ada038D08aC299b1bF0E833"
const BallotABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "voter_address",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "string",
        "name": "voter_name",
        "type": "string"
      }
    ],
    "name": "voterAdded",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "string[]",
        "name": "name",
        "type": "string[]"
      },
      {
        "internalType": "string[]",
        "name": "image",
        "type": "string[]"
      },
      {
        "internalType": "uint8[]",
        "name": "organizationalUnit",
        "type": "uint8[]"
      },
      {
        "internalType": "uint8[]",
        "name": "position",
        "type": "uint8[]"
      },
      {
        "internalType": "address[]",
        "name": "nominantAddress",
        "type": "address[]"
      }
    ],
    "name": "addBatchProposals",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "image",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "organizationalUnit",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "position",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "nominantAddress",
        "type": "address"
      }
    ],
    "name": "addProposal",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getProposals",
    "outputs": [
      {
        "components": [
          {
            "internalType": "address",
            "name": "nominantAddress",
            "type": "address"
          },
          {
            "internalType": "string",
            "name": "name",
            "type": "string"
          },
          {
            "internalType": "string",
            "name": "image",
            "type": "string"
          },
          {
            "internalType": "uint8",
            "name": "organizationalUnit",
            "type": "uint8"
          },
          {
            "internalType": "uint8",
            "name": "position",
            "type": "uint8"
          },
          {
            "internalType": "uint256",
            "name": "index",
            "type": "uint256"
          }
        ],
        "internalType": "struct Ballot.Proposal[]",
        "name": "",
        "type": "tuple[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getResults",
    "outputs": [
      {
        "internalType": "uint256[]",
        "name": "",
        "type": "uint256[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "nominant",
        "type": "address"
      }
    ],
    "name": "getResultsOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getVoteEnd",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "getVoters",
    "outputs": [
      {
        "internalType": "address[]",
        "name": "",
        "type": "address[]"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "voterAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "_name",
        "type": "string"
      }
    ],
    "name": "giveRightToVote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "isModerator",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "proposalOf",
    "outputs": [
      {
        "internalType": "address",
        "name": "nominantAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "image",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "organizationalUnit",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "position",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "proposals",
    "outputs": [
      {
        "internalType": "address",
        "name": "nominantAddress",
        "type": "address"
      },
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "string",
        "name": "image",
        "type": "string"
      },
      {
        "internalType": "uint8",
        "name": "organizationalUnit",
        "type": "uint8"
      },
      {
        "internalType": "uint8",
        "name": "position",
        "type": "uint8"
      },
      {
        "internalType": "uint256",
        "name": "index",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "duration",
        "type": "uint256"
      }
    ],
    "name": "startVoting",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address[]",
        "name": "nominants",
        "type": "address[]"
      }
    ],
    "name": "vote",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "voteEnd",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "voteEnded",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "voteStarted",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "voter",
    "outputs": [
      {
        "internalType": "string",
        "name": "name",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "voterAddress",
        "type": "address"
      },
      {
        "internalType": "bool",
        "name": "canVote",
        "type": "bool"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "name": "voters",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
]

export default function HorizontalLinearStepper(props) {
  const OrganizationalUnits = ['SB', 'CS', 'GRSS','WIE','RAS'];
  const Positions = [
    'Chair','Vice Chair','Secretary','Treasurer',
    'Community Manager','HR Manager','Web Master',
    'Training Manager']
  const [activeNominant,setActiveNominant] = useState("")
  const [activeOU, setActiveOU] = useState(0);
  const [activePO, setActivePO] = useState(0);
  const [allProposals,setAllProposals] = useState([])
  const [proposals,setProposals] = useState([]);
  const [skipped,setSkipped] = useState(true)
  const [chosenNominants,setChosenNominants] = useState([])
  const [signer,setSigner] = useState()
  const [contract,setContract] = useState()
  const [voteEnded,setVoteEnded] = useState(false)
  const [results,setResults] = useState([])
  const [voteEnd,setVoteEnd] = useState(0)
  const provider = useEthereumProvider()
  const chainName = useEthereumChain()
  useEffect(()=>{
      let provider = new ethers.providers.Web3Provider(window.ethereum)
      if(provider != null){
        const signer = provider.getSigner()
        setSigner(signer)
        const contract = new ethers.Contract(BallotAddress,BallotABI,signer)
        setContract(contract)
      }
  },[provider])
  useEffect(()=> {
    if(!voteEnded) return
    fetchResults()
    
  },[allProposals])
  const addNominant= (nominantAddress)=> {
    const _chosenNominants = chosenNominants;
    _chosenNominants.push(nominantAddress)
  }
  const fetchProposals = async () => {
    const data = await contract.getProposals()
    setAllProposals(data)
  }
  const getProposals = async (OU,PO) => {
    let tempProposals = allProposals.filter((proposal) => proposal.organizationalUnit == OU && proposal.position == PO)
    setProposals(tempProposals)
  }
  const getVoteEnded = async () => {
    const tempEnded = await contract.voteEnded()
    setVoteEnded(tempEnded)
  }
  const fetchResults = async () => {
    const tempresults = await contract.getResults()
    let _results = []
    for(let i=0;i<tempresults.length;i++){
      _results.push(tempresults[i].toNumber())
    }
    setResults(_results)
  }
  const getVoteEnd = async  () => {
    let _voteEnd = await contract.getVoteEnd();
    _voteEnd = _voteEnd.toNumber()
    setVoteEnd(_voteEnd*1000)
  }
  useEffect(()=> {
    fetchProposals()
    getVoteEnded()
    getVoteEnd()
  },[contract,chainName])
  useEffect(() => {
    getProposals(activeOU,activePO)
  }, [activeOU,activePO,allProposals])
  
  const handleBack = () => {
    setActiveNominant("")
    if(!skipped){
      chosenNominants.pop()
    }
    if(activePO === 0){
      setActivePO(Positions.length - 1)
      setActiveOU((prevActiveOU) => prevActiveOU -1)
    }
    else{
      setActivePO((prevActivePO) => prevActivePO -1)
    }
  };
  const handleNext = () => {
    if(activeNominant!=""){
      setSkipped(false)
    }
    else{
      setSkipped(true)
    }
    if(activeNominant!=""){
      addNominant(activeNominant)
      setActiveNominant("")
    }
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
  const submit = async () => {
    await contract.vote(chosenNominants)
  }
  const reset = () => {
    setActivePO(0)
    setActiveOU(0)
    setChosenNominants([])
  }
  return (
    
    <Box sx={{ width: '100%' }}>
      <Countdown date={voteEnd} />
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
            Thank you, dear IEEE member :D
          </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
              <Box sx={{ flex: '1 1 auto' }} />
              <Button disabled={chosenNominants.length == 0} variant='contained' onClick={submit}>Submit</Button>
            </Box>
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 2 }}>
            <Box sx={{ flex: '1 1 auto' }} />
            <Button  variant='contained' onClick={reset}>Reset</Button>
          </Box>
        </React.Fragment>
      ) : (
        <React.Fragment>
          {
            proposals.length == 0 ? (
              <Box sx={{ display: 'flex' }}>
                <CircularProgress />
              </Box>
            ) :
            (<Container>
            <Grid container spacing={{xs:2, md:3}} >
                {proposals.map((proposal) => {
                    return(
                      <Grid item xs={12} sm={6} md={3} >
                        <Stack alignItems="center" >
                          <h1 style={{margin:20}}>{proposal.name}</h1>
                          {
                            proposal.nominantAddress == activeNominant  ? 
                            <Avatar sx={{width:200,height:200,border:5,marginTop:2,borderColor:"green"}}  src={proposal.image}></Avatar>
                            :<Avatar sx={{width:200,height:200,border:5,marginTop:2}}  src={proposal.image}></Avatar>
                          }
                          {
                            voteEnded ? (
                              results.length == 0 ? (
                                <Box sx={{ display: 'flex' }}>
                                  <CircularProgress />
                                </Box>
                              ):
                              (
                                <h1>{results[proposal.index]}</h1>
                              )
                                
                              
                            ):
                            (
                              (voteEnd != 0 && (
                                <Button variant='outlined' sx={{marginTop:2}} onClick={()=> {setActiveNominant(proposal.nominantAddress)}} >Vote</Button>
                              )
                                
                              )
                            )
                          }
                            
                          
                          
                        </Stack> 
                      </Grid>
                    )
                
                })}
            </Grid>  
            </Container>)
          }
          <Box sx={{ display: 'flex', flexDirection: 'row', pt: 3 }}>
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
