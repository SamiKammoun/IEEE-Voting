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
    event voterAdded(address indexed voter_address,bytes32 indexed voter_name);
    Proposal[] private proposals;
    struct Proposal {
        address nominantAddress;
        bytes32 name;
        string image;
        uint8 organizationalUnit;
        uint8 position;
        uint256 voteCount;
    }
    struct Voter {
        //name is used to just verify if a person was added to detect fraud, we won't know a person's vote
        bytes32 name;
        bool voted;
        address voterAddress;
        bool canVote;
    }
    mapping (address => Voter) public voter;
    Voter[] public voters;
    mapping (address => bool) public isModerator; // determines if a person can actually add voters
    constructor(Proposal[] memory _proposals) {
        isModerator[msg.sender] = true;
        proposals = _proposals;
    }
    function giveRightToVote(address voterAddress, bytes32 _name) external {
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
        voters.push(voter[voterAddress]);
        emit voterAdded(voterAddress,_name);
    }
    function addProposal(bytes32 name,
        string memory image,
        uint8 organizationalUnit,
        uint8 position) external {
            require(
                isModerator[msg.sender],
                "Only moderators can add proposals"
            );
            Proposal memory _proposal = Proposal(
                msg.sender,
                name,
                image,
                organizationalUnit,
                position,
                0
            );
            proposals.push(_proposal);
    }
    function vote()
}
