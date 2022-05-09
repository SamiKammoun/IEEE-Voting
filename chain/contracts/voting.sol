//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;


contract Ballot{
    /* Defining Organizational Units: 
        0: SB
        1: CS
        2: GRSS
        3: WIE
        4: RAS
       Defining positions:
        0: Chair
        1: Vice Chair
        2: Secretary
        3: Treasurer
        4: Community Manager
        5: HR Manager
        6: Web Master
        7: Training Manager
    */
    event voterAdded(address indexed voter_address,string indexed voter_name);
    Proposal[] public proposals;
    address[] public voters;
    mapping (address => Proposal) public proposalOf;
    mapping (address => Voter) public voter;
    mapping (address => bool) public isModerator; // determines if a person can actually add voters
    mapping (address => uint256) private voteCount;
    uint256[] private results;
    uint256 public voteEnd = 0;
    bool public voteStarted = false;
    struct Proposal {
        address nominantAddress;
        string name;
        string image;
        uint8 organizationalUnit;
        uint8 position;
        uint256 index;
    }
    struct Voter {
        //name is used to just verify if a person was added to detect fraud, we won't know a person's vote
        string name;
        mapping(uint8 => mapping(uint8 => bool)) voted;//voted[0][0] returns true if the voter voted the chair position
        address voterAddress;
        mapping(uint8 => bool) canVote;
    }
    constructor() {
        isModerator[msg.sender] = true;
        
    }
    modifier voteOngoing() {
        require(
            block.timestamp < voteEnd && voteStarted,
            "vote has already ended or didn't start yet"
        );
        _;
    }
    function startVoting(uint256 duration) public {
        require(
            isModerator[msg.sender],
            "you can't start the vote if you are not a moderator"
        );
        require(
            !voteStarted,
            "Vote has already started!"
        );
        voteEnd = block.timestamp + duration;
        voteStarted = true;
    }
    function giveRightToVote(address voterAddress, string memory _name,uint8[] memory OUs) public {
        require(
            isModerator[msg.sender],
            "Only moderators can give right to voters!"
        );
        require(
                !voteStarted,
                "vote already started"
        );
        for(uint8 i=0;i<OUs.length;i++){
            voter[voterAddress].canVote[OUs[i]] = true;
        }
        voter[voterAddress].name = _name;
        voters.push(voterAddress);
        emit voterAdded(voterAddress,_name);
    }
    function addProposal(string memory name,
        string memory image,
        uint8 organizationalUnit,
        uint8 position,
        address nominantAddress) external {
            require(
                isModerator[msg.sender],
                "Only moderators can add proposals"
            );
            require(
                proposalOf[nominantAddress].nominantAddress == address(0),
                "This person is already listed"
            );
            require(
                !voteStarted,
                "vote already started"
            );
            proposalOf[nominantAddress].nominantAddress = nominantAddress;
            proposalOf[nominantAddress].name = name;
            proposalOf[nominantAddress].image = image;
            proposalOf[nominantAddress].organizationalUnit = organizationalUnit;
            proposalOf[nominantAddress].position = position;
            proposalOf[nominantAddress].index = proposals.length;
            proposals.push(proposalOf[nominantAddress]);
            results.push(0);
    }
    function addBatchProposals(
        string[] memory name,
        string[] memory image,
        uint8[] memory organizationalUnit,
        uint8[] memory position,
        address[] memory nominantAddress) external {
            require(
                isModerator[msg.sender],
                "Only moderators can add proposals"
            );
            require(
                !voteStarted,
                "vote already started"
            );
            for(uint256 i=0;i<name.length;i++){
                require(
                proposalOf[nominantAddress[i]].nominantAddress == address(0),
                "One of these persons is already listed"
                );
                proposalOf[nominantAddress[i]].nominantAddress = nominantAddress[i];
                proposalOf[nominantAddress[i]].name = name[i];
                proposalOf[nominantAddress[i]].image = image[i];
                proposalOf[nominantAddress[i]].organizationalUnit = organizationalUnit[i];
                proposalOf[nominantAddress[i]].position = position[i];
                proposalOf[nominantAddress[i]].index = proposals.length;
                proposals.push(proposalOf[nominantAddress[i]]);
                results.push(0);
            }
        }
    function vote(address[] memory nominants) external voteOngoing {
        for(uint256 i=0;i<nominants.length;i++){
            require(
                voter[msg.sender].canVote[proposalOf[nominants[i]].organizationalUnit],
                "You are not registered in this organizational unit"
            );
            require(
                !voter[msg.sender].voted[proposalOf[nominants[i]].organizationalUnit][proposalOf[nominants[i]].position],
                "You have already voted this position"
            );
            require(
                proposalOf[nominants[i]].nominantAddress != address(0),
                "This address has no active proposal"
            );
            voteCount[nominants[i]]++;
            results[proposalOf[nominants[i]].index]++;
            voter[msg.sender].voted[proposalOf[nominants[i]].organizationalUnit][proposalOf[nominants[i]].position] = true;
        }

    }
    function addModerator(address newMod) public {
        require(
            isModerator[msg.sender],
            "you can't add mods if you aren't"
        );
        isModerator[newMod] = true;
    }

    function revokeMod() public {
        require(
            isModerator[msg.sender],
            "you can't revoke mod if you aren't"
        );
        isModerator[msg.sender] = false;
    }
    
    function getResultsOf(address nominant) public view returns(uint256) {
        return voteCount[nominant];
    }
    function getResults() public view returns(uint256[] memory){
        return results;
    }
    function getVoters() public view returns(address[] memory){
        return voters;
    }
    function getProposals() public view returns(Proposal[] memory){
        return proposals;
    }
    function voteEnded() public view returns(bool){
        return voteEnd < block.timestamp && voteStarted;
    }
    function getVoteEnd() public view returns(uint256){
        return voteEnd;
    }
    function getVoterCanVoteOU(address voterAddress,uint8 i) public view returns(bool){
        return voter[voterAddress].canVote[i];
    }
}
