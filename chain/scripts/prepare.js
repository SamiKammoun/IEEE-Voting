async function main(){
  console.log("------ deploy to a **new** localhost ====");
  Ballot = await ethers.getContractFactory("Ballot");
  contract = await Ballot.deploy();
  console.log("contract address: ",contract.address);
  [moderator,account1,account2,account3,account4] = await ethers.getSigners();
  for(let i=0;i<5;i++){
    for(let i=0;i<8;i++){
      
    }
  }
}