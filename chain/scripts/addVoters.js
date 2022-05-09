var responses = require('./Responses.json')
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
async function main(){
    const [moderator] = await ethers.getSigners()
    const Ballot = await ethers.getContractFactory("Ballot")
    const contract = await Ballot.attach("0xa7eC94D32d071F2C6B6555960Ae942DAf0282484")//contract address
    let i=0;
    while(i<responses.length){
        let voter = responses[i]
        if(voter.Timestamp == null){
            i++
            continue
        }
        const canVote = []
        if(voter.Student_Branch == "yes") canVote.push("0")
        if(voter.CS == "yes") canVote.push("1")
        if(voter.GRSS == "yes") canVote.push("2")
        if(voter.WIE == "yes") canVote.push("3")
        if(voter.RAS == "yes") canVote.push("4")
        let b=true
        for(let j=0;j<canVote.length;j++){
            let can = await contract.getVoterCanVoteOU(voter.Ethereum_Address,canVote[j])
            b=b&&can
            if(!b) break
        }
        if(b){
            i++
            continue
        }
        console.log("adding",i)
        await contract.giveRightToVote(voter.Ethereum_Address,voter.Name,canVote)
        sleep(30000)
    }
}
main().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })