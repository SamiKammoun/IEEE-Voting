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
  const image = []
  const OU = []
  const PO = []
  const addresses = []
  await contract.giveRightToVote(moderator.address,"Sami")
  await contract.giveRightToVote(account1.address,"dummy")
  console.log(await contract.voteStarted())
  for(let organizationalUnit=0;organizationalUnit<5;organizationalUnit++){
    for(let position=0;position<8;position++){
      for(let proposal=0;proposal<1;proposal++){
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
  console.log("kkk")
  const data = await contract.getProposals()
  console.log(data)
}
main().catch((error) => {
  console.error(error)
  process.exitCode = 1
})