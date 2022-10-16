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

  function mint(OwnData memory _data) external;
  function lock(address _to, uint256 _tokenId) external;
}

contract Account is ERC721, Ownable, IAccount {
  using Counters for Counters.Counter;

  Counters.Counter private _supply;
	string public baseURI;

  mapping (uint256 => OwnData[]) associatedDataWithTokenId;

  constructor(string memory _initBaseURI) ERC721("Account", "AC") {
		_supply.increment();
		setBaseURI(_initBaseURI);
	}

  function mint(OwnData memory _data) external {
    _safeMint(msg.sender, _supply.current());
    IGameItem item = IGameItem(_data.srcContract);
    require(item.isApprovedForAll(msg.sender, address(this)), "Account: This contract has not been approved");
    uint256[] memory amounts = new uint256[](2);
    for (uint i = 0; i < _data.tokenIds.length; i++) {
      amounts[i] = 1;
    }
    item.safeBatchTransferFrom(msg.sender, address(this), _data.tokenIds, amounts, "");
    associatedDataWithTokenId[_supply.current()].push(_data);
    _supply.increment();
  }

  function lock(address _to, uint256 _tokenId) external {
    address owner =  getApproved(_tokenId);
    require(owner != address(0), "Account: Account not approved");
    require(owner != msg.sender, "Account: Owner does not match");
    safeTransferFrom(msg.sender, _to, _tokenId);
  }

  function associatedDataWith(uint256 _tokenId) external view returns (OwnData[] memory data) {
    data = associatedDataWithTokenId[_tokenId];
  }


  function setBaseURI(string memory _newBaseURI) public {
		baseURI = _newBaseURI;
	}

  function onERC1155Received(address, address, uint256, uint256, bytes memory) public virtual returns (bytes4) {
        return this.onERC1155Received.selector;
    }

    function onERC1155BatchReceived(address, address, uint256[] memory, uint256[] memory, bytes memory) public virtual returns (bytes4) {
        return this.onERC1155BatchReceived.selector;
    }

    function onERC721Received(address, address, uint256, bytes memory) public virtual returns (bytes4) {
        return this.onERC721Received.selector;
    }
}
