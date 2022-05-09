async function main(){
    console.log("------ deploy to polygon ====");
    const [moderator] = await ethers.getSigners();
    console.log("moderator :",moderator.address)
    console.log("Balance :",(await moderator.getBalance()).toString())
    Ballot = await ethers.getContractFactory("Ballot");
    contract = await Ballot.deploy();
    console.log("contract address: ",contract.address)
    
    const characters = '0123456789ABCDEF'
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
        console.log(organizationalUnit, "  " ,position)
        }
    }
    // while(true){
    //     setTimeout(()=>{},5000)
    //     let proposals = await contract.getProposals()
    //     let filled = []
    //     proposals.map((proposal) => {
    //         filled.push([(proposal.organizationalUnit),(proposal.position)])
    //     })
    //     if(filled.length == 40) break
    //     console.log("retrying")
    //     for(let organizationalUnit=0;organizationalUnit<5;organizationalUnit++){
    //         for(let position=0;position<8;position++){
    //           if(filled.includes([organizationalUnit,position])) continue
    //           console.log([organizationalUnit,position])
    //           let abstainAddress = "0x"
    //           let abstainName = "Abstain"
    //           for(let i=0;i<40;i++){
    //             abstainAddress+=characters[Math.floor(Math.random()*characters.length)]
    //           }
    //           abstainImage = "https://cdn.pixabay.com/photo/2012/04/12/13/15/red-29985_960_720.png"
    //             await contract.addProposal(abstainName,abstainImage,organizationalUnit,position,abstainAddress)
    //             console.log(organizationalUnit,position)
    //           }
    //       }
    // }
    console.log("adding ","0x061156c8D5EDC7dE7f0e1999F703a12261322eCA"," As moderator")
    await contract.addModerator("0x061156c8D5EDC7dE7f0e1999F703a12261322eCA")
    console.log("revoking Mod")
    await contract.revokeMod()
    console.log("All set")
  }
  main().catch((error) => {
    console.error(error)
    process.exitCode = 1
  })