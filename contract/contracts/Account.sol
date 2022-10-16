// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.9;

import "@openzeppelin/contracts/token/ERC721/IERC721.sol";
import "@openzeppelin/contracts/token/ERC721/ERC721.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

import "./Item.sol";

interface IAccount is IERC721{
  struct OwnData {
    address srcContract;
    uint256[] tokenIds;
  }

  function mint(address _to, OwnData memory _data) external;
  function lock(address _to, uint256 _tokenId) external;
}

contract Account is ERC721, Ownable, IAccount {
  using Counters for Counters.Counter;

  Counters.Counter private _supply;
	string private baseURI;

  mapping (uint256 => OwnData[]) associatedDataWithTokenId;

  constructor(string memory _initBaseURI) ERC721("Account", "AC") {
		_supply.increment();
		setBaseURI(_initBaseURI);
	}

  function mint(address _to, OwnData memory _data) external onlyOwner {
    _safeMint(_to, _supply.current());
    IGameItem item = IGameItem(_data.srcContract);
    require(item.isApprovedForAll(_to, address(this)), "Account: This contract has not been approved");
    uint256[] memory amounts;
    for (uint i = 0; i < amounts.length; i++) {
      amounts[i] = 1;
    }
    item.safeBatchTransferFrom(msg.sender, _to, _data.tokenIds, amounts, "");
    associatedDataWithTokenId[_supply.current()].push(_data);
    _supply.increment();
  }

  function lock(address _to, uint256 _tokenId) external {
    address owner =  getApproved(_tokenId);
    require(owner != address(0), "Account: Account not approved");
    require(owner != msg.sender, "Account: Owner does not match");
    safeTransferFrom(msg.sender, _to, _tokenId);
  }


  function setBaseURI(string memory _newBaseURI) public {
		baseURI = _newBaseURI;
	}
}
