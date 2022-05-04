async function main(){
  console.log("------ deploy to a **new** localhost ====");
  Ballot = await ethers.getContractFactory("Ballot");
  contract = await Ballot.deploy(600);//60s before vote ends
  console.log("contract address: ",contract.address);
  [moderator,account1,account2,account3,account4] = await ethers.getSigners();
  const characters = '0123456789ABCDEF'
  const nameCharacters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
  const names = []
  const image = []
  const OU = []
  const PO = []
  const addresses = []
  for(let organizationalUnit=0;organizationalUnit<5;organizationalUnit++){
    for(let position=0;position<8;position++){
      for(let proposal=0;proposal<4;proposal++){
        let address = "0x"
        let name = ""
        for(let i=0;i<40;i++){
          address+=characters[Math.floor(Math.random()*characters.length)]
        }
        for(let i=0;i<7;i++){
          name+=nameCharacters[Math.floor(Math.random()*nameCharacters.length)]
        }
        image.push("https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500")
        await contract.addProposal(name,image[0],organizationalUnit,position,address)
      }
      

    }
  }
  const data = await contract.getProposals()
  const _proposals = []
  for(let i=0;i<data.length;i++){
    let _proposal = await contract.proposalOf(data[i])
    _proposals.push(_proposal)
  }
  console.log(_proposals)
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})