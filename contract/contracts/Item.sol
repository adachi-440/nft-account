// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC1155/IERC1155.sol";
import "@openzeppelin/contracts/token/ERC1155/ERC1155.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import '@chainlink/contracts/src/v0.8/ChainlinkClient.sol';
import '@chainlink/contracts/src/v0.8/ConfirmedOwner.sol';
import "@openzeppelin/contracts/utils/Strings.sol";


import "hardhat/console.sol";


interface IGameItem is IERC1155 {
  struct GameResult {
    uint256 win;
    uint256 lose;
  }

  event Result(address user, uint256 tokenId, bool win);

  event RequestRandomNumber(bytes32 indexed requestId, uint256 number);

  function mint(uint256 attackPoint, uint256 hp) external payable;

  function gameResultsOfAccount(uint256[] memory _tokenIds) external view returns(GameResult[] memory result);

  function gameResultsOfTokenId(uint256 _tokenId) external view returns(GameResult memory result);

  function gameJudge(uint256 _tokenId) external payable returns(bool win);

  function requestRandomNumber(uint256 _tokenId) external returns (bytes32 requestId);

  function fulfill(
        bytes32 _requestId,
        uint256 _randomNumber,
        string calldata _tokenId
    ) external;

  function setOracle(address _oracle) external;

  function setJobId(string memory _id) external;

  function getAttackPoint(uint256 _tokenId) external view returns(uint256 point);

  function getHp(uint256 _tokenId) external view returns(uint256 point);

  function ownerOf(uint256 _tokenId) external view returns(address owner);
}

contract Item is IGameItem, ERC1155, ChainlinkClient, ConfirmedOwner {
    uint256 private _currentId;
    using Chainlink for Chainlink.Request;

    bytes32 private _jobId;
    uint256 private _fee;

    mapping(uint256 => GameResult) public gameResultOfTokenId;

    mapping(uint256 => uint256) public getAttackPointOfTokenId;

    mapping(uint256 => uint256) public getHpOfAttackTokenId;

    mapping(uint256 => address) public ownerOfTokenId;

    constructor(address _linkToken)
        ERC1155(
            "https://ipfs.io/ipfs/bafybeihjjkwdrxxjnuwevlqtqmh3iegcadc32sio4wmo7bv2gbf34qs34a/{id}.json"
        )
        ConfirmedOwner(msg.sender)
    {
        _currentId = 1;
        setChainlinkToken(_linkToken);
        _fee = (1 * LINK_DIVISIBILITY) / 10;
    }

    function mint(uint256 attackPoint, uint256 hp) external payable onlyOwner {
        _mint(msg.sender, _currentId, 1, "");

        // TODO Random number generation is desirable here too.
        getAttackPointOfTokenId[_currentId] = attackPoint;
        getHpOfAttackTokenId[_currentId] = hp;
        ownerOfTokenId[_currentId] = msg.sender;
        _currentId++;
    }

    function gameResultsOfAccount(uint256[] memory _tokenIds)
        external
        view
        returns (GameResult[] memory result)
    {
        for (uint i = 0; i < _tokenIds.length; i++) {
            result[i] = gameResultOfTokenId[_tokenIds[i]];
        }
    }

    function gameResultsOfTokenId(uint256 _tokenId)
        external
        view
        returns (GameResult memory result)
    {
        result = gameResultOfTokenId[_tokenId];
    }

    // TODO Change to use chainlink Any API
    function gameJudge(uint256 _tokenId)
        external
        payable
        override
        returns (bool win)
    {
        uint256 enemyAttackPoint = 1000;
        uint256 ownAttackPoint = getAttackPointOfTokenId[_tokenId];

        int256 damage = int256(ownAttackPoint) - int256(enemyAttackPoint);
        win = damage > 0;
        if (win) {
            gameResultOfTokenId[_tokenId].win++;
            getHpOfAttackTokenId[_tokenId] =
                getHpOfAttackTokenId[_tokenId] -
                uint256(damage);
        } else {
            gameResultOfTokenId[_tokenId].lose++;
            getHpOfAttackTokenId[_tokenId] = 0;
        }

        emit Result(msg.sender, _tokenId, win);
    }

    function requestRandomNumber(uint256 _tokenId)
        public
        returns (bytes32 requestId)
    {
        Chainlink.Request memory req = buildChainlinkRequest(
            _jobId,
            address(this),
            this.fulfill.selector
        );
        req.add(
            "get",
            "http://www.randomnumberapi.com/api/v1.0/random?min=100&max=2000&count=1"
        );
        req.add("tokenId", Strings.toString(_tokenId));
        return sendChainlinkRequest(req, _fee);
    }

    function fulfill(
        bytes32 _requestId,
        uint256 _randomNumber,
        string calldata _tokenId
    ) public recordChainlinkFulfillment(_requestId) {
        emit RequestRandomNumber(_requestId, _randomNumber);

        // TODO Damage Calculation
    }

    function setOracle(address _oracle) external onlyOwner {
        setChainlinkOracle(_oracle);
    }

    function setJobId(string memory _id) external onlyOwner {
        bytes memory tempEmptyStringTest = bytes(_id);
        require(tempEmptyStringTest.length != 0, "Item: Error");

        bytes32 result;
        assembly {
            result := mload(add(_id, 32))
        }
        _jobId = result;
    }

    function getAttackPoint(uint256 _tokenId)
        external
        view
        returns (uint256 point)
    {
        point = getAttackPointOfTokenId[_tokenId];
    }

    function getHp(uint256 _tokenId) external view returns (uint256 point) {
        point = getHpOfAttackTokenId[_tokenId];
    }

    function ownerOf(uint256 _tokenId) external view returns (address owner) {
        owner = ownerOfTokenId[_tokenId];
    }
}
