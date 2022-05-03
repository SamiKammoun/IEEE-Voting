const { expect } = require("chai");

describe("Ballot", function () {
  before(async function(){
    [account0,account1,account2,account3] = await ethers.getSigners();
    Ballot = await ethers.getContractFactory("Ballot");
    Ballot = await Ballot.deploy(20);//60s = 1minute
  })
  it("Contract deployer should be a moderator", async () => {
    const isMod = await Ballot.isModerator(account0.address);
    expect(isMod);
  })
  it("Should be able to add accounts 1 and 2 as voters", async () => {
    await Ballot.giveRightToVote(account1.address,"Sami");
    await Ballot.giveRightToVote(account2.address,"Imen");
    const voters = await Ballot.getVoters();
    expect(voters.length).to.equal(2);
  })
  it("Should add account0 and account1 nominants", async() => {
    await Ballot.addProposal(
      "Sami",
      "",
      0,
      0,
      account0.address
    )
    await Ballot.addProposal(
      "Imen",
      "",
      0,
      0,
      account1.address
    )
    const proposals = await Ballot.getProposals();
    expect(proposals[0]).to.equal(account0.address)
    expect(proposals[1]).to.equal(account1.address)
  })
  it("Account0 shouldn't be able to vote since he isn't assigned as a voter", async () => {
    expect(Ballot.vote([account1.address])).to.be.revertedWith("You are not allowed to vote")
  })
  it("cannot vote 0 and 1 for same position",async () => {
    expect(Ballot.vote([account0.address,account1.address])).to.be.revertedWith("You have already voted this position")
  })
  it("Cannot vote account 3 since he isn't listed", async () => {
    expect(Ballot.connect(account1).vote([account3.address])).to.be.revertedWith("This address has no active proposal")
  })
  it("Account 1 and 2 will vote for account 0 as chair",async() => {
    await Ballot.connect(account1).vote([account0.address]);
    await Ballot.connect(account2).vote([account0.address]);
    expect(Ballot.connect(account2).vote([account0.address])).to.be.revertedWith("You have already voted this position")
    expect(Ballot.getResultsOf(account0.address)).to.be.revertedWith("Vote hasn't already ended")
    setTimeout(async () => {
      const votecount = await Ballot.getResultsOf(account0.address)
      expect(votecount).to.be.equal(2)
    },20000)
  })
  it("can no more add proposals or vote",() => {
    expect(Ballot.connect(account3).vote([account0.address])).to.be.revertedWith("vote has already ended")
  })
});
