async function main(){
  console.log("------ deploy to a **new** localhost ====");
  const [moderator,account1] = await ethers.getSigners();
  console.log("account address ",moderator.address)
  console.log("Balance :",(await moderator.getBalance()).toString())
  Ballot = await ethers.getContractFactory("Ballot");
  contract = await Ballot.deploy();
  console.log("contract address: ",contract.address)
  
  const characters = '0123456789ABCDEF'
  const nameCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const names = []
  const image = "https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
  const OU = []
  const PO = []
  const addresses = []
  await contract.giveRightToVote(moderator.address,"Test")
  await contract.giveRightToVote("0x061156c8D5EDC7dE7f0e1999F703a12261322eCA","Sami")
  console.log(await contract.voteStarted())
  let j=0;
  for(let organizationalUnit=0;organizationalUnit<5;organizationalUnit++){
    for(let position=0;position<8;position++){
      let abstainAddress = "0x"
      let abstainName = "Abstain"
      for(let i=0;i<40;i++){
        abstainAddress+=characters[Math.floor(Math.random()*characters.length)]
      }
      abstainImage = "https://cdn.pixabay.com/photo/2012/04/12/13/15/red-29985_960_720.png"
      await contract.addProposal(abstainName,abstainImage,organizationalUnit,position,abstainAddress)
      for(let proposal=0;proposal<2;proposal++){
        let address = "0x"
        let name = ""
        for(let i=0;i<40;i++){
          address+=characters[Math.floor(Math.random()*characters.length)]
        }
        for(let i=0;i<7;i++){
          name+=nameCharacters[Math.floor(Math.random()*nameCharacters.length)]
        }
        await contract.addProposal(name,image,organizationalUnit,position,address)
        console.log((await contract.getProposals()).length)
      }
      

    }
  }
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})