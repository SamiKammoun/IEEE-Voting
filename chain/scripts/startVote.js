async function main(){
    const [moderator] = await ethers.getSigners()
    const Ballot = await ethers.getContractFactory("Ballot")
    const contract = await Ballot.attach("0xa7eC94D32d071F2C6B6555960Ae942DAf0282484")//contract address
    await contract.startVoting(600)
}
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })