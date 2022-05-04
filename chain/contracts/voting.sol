//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.4;


contract Ballot{
    /* Defining Organizational Units: 
        0: SB
        1: GRSS
        2: RAS
        3: CS
        4: WIE
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
    address[] public proposals;
    address[] public voters;
    mapping (address => Proposal) public proposalOf;
    mapping (address => Voter) public voter;
    mapping (address => bool) public isModerator; // determines if a person can actually add voters
    mapping (address => uint256) private voteCount;
    uint256 public voteEnd;
    struct Proposal {
        address nominantAddress;
        string name;
        string image;
        uint8 organizationalUnit;
        uint8 position;
    }
    struct Voter {
        //name is used to just verify if a person was added to detect fraud, we won't know a person's vote
        string name;
        mapping(uint8 => mapping(uint8 => bool)) voted;//voted[0][0] returns true if the voter voted the chair position
        address voterAddress;
        bool canVote;
    }
    constructor(uint256 duration) {
        isModerator[msg.sender] = true;
        voteEnd = block.timestamp + duration;
    }
    modifier voteOngoing() {
        require(
            block.timestamp < voteEnd,
            "vote has already ended"
        );
        _;
    }
    function giveRightToVote(address voterAddress, string memory _name) external voteOngoing {
        require(
            isModerator[msg.sender],
            "Only moderators can give right to voters!"
        );
        require(
            !voter[voterAddress].canVote,
            "The voter is already registered!"
        );
        voter[voterAddress].canVote = true;
        voter[voterAddress].name = _name;
        voters.push(voterAddress);
        emit voterAdded(voterAddress,_name);
    }
    function addProposal(string memory name,
        string memory image,
        uint8 organizationalUnit,
        uint8 position,
        address nominantAddress) external voteOngoing {
            require(
                isModerator[msg.sender],
                "Only moderators can add proposals"
            );
            require(
                proposalOf[nominantAddress].nominantAddress == address(0),
                "This person is already listed"
            );
            proposalOf[nominantAddress].nominantAddress = nominantAddress;
            proposalOf[nominantAddress].name = name;
            proposalOf[nominantAddress].image = image;
            proposalOf[nominantAddress].organizationalUnit = organizationalUnit;
            proposalOf[nominantAddress].position = position;
            proposals.push(nominantAddress);
    }
    function addBatchProposals(
        string[] memory name,
        string[] memory image,
        uint8[] memory organizationalUnit,
        uint8[] memory position,
        address[] memory nominantAddress) external voteOngoing {
            require(
                isModerator[msg.sender],
                "Only moderators can add proposals"
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
                proposals.push(nominantAddress[i]);
            }
        }
    function vote(address[] memory nominants) external voteOngoing {
        require(
            voter[msg.sender].canVote,
            "You are not allowed to vote"
        );
        for(uint256 i=0;i<nominants.length;i++){
            require(
                !voter[msg.sender].voted[proposalOf[nominants[i]].organizationalUnit][proposalOf[nominants[i]].position],
                "You have already voted this position"
            );
            require(
                proposalOf[nominants[i]].nominantAddress != address(0),
                "This address has no active proposal"
            );
            voteCount[nominants[i]]++;
            voter[msg.sender].voted[proposalOf[nominants[i]].organizationalUnit][proposalOf[nominants[i]].position] = true;
        }

    }
    function getResultsOf(address nominant) public view returns(uint256) {
        require(
            block.timestamp > voteEnd,
            "Vote hasn't already ended"
        );
        return voteCount[nominant];
    }
    function getVoters() public view returns(address[] memory){
        return voters;
    }
    function getProposals() public view returns(address[] memory){
        return proposals;
    }
    function voteEnded() public view returns(bool){
        return voteEnd < block.timestamp;
    }


}
