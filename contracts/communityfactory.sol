pragma solidity ^0.4.24;

/**
 * @title CommunityFactory
 * @author rama
 */

import "../node_modules/openzeppelin-solidity/contracts/ownership/Ownable.sol";
import "../node_modules/openzeppelin-solidity/contracts/math/SafeMath.sol";
//import "openzeppelin-solidity/contract/token/ERC20/ERC20.sol";

contract CommunityFactory is Ownable {
    using SafeMath for uint256;
    uint dnaDigits = 16;
    uint dnaModulus = 10 ** dnaDigits;
    uint cooldownTime = 5 minutes; 
    
    event NewMember (uint id, string name, uint dna);
    
    /*@dev es el tiempo que tiene que esperar para convertir a un nuevo miembro. La intención es que no salgan a cazar como locos y que todos puedan hacer comunidad.*/

  struct Member {
    string name;
    uint dna;
    uint32 level;
    uint32 readyTime;
    uint16 convertCount;
    uint16 parentMember;
    bool converted;
    string location;
  }

  Member[] public members;
  mapping (uint => address) public memberAddress;
  mapping (address => uint) memberToken;  //Esto hay que reemplazarlo por un ERC20

  function _getPrice(string _type) internal pure returns (uint){
    uint prizeInstall = 5; //tokens
   // uint prizeConvertMember = 10;
    //uint prizeConvertSpecialMember = 20;
    //uint prizeConvertKeyMember = 30;
    if (uint(keccak256(_type)) == uint(keccak256("install"))){
        return prizeInstall;
    }
    return prizeInstall;

  }
  function _createMember(string _name, uint _dna) internal {
    uint id = members.push(Member(_name, _dna, 0, uint32(now + cooldownTime), 0, 0,false,"")) - 1;
    memberAddress[id] = msg.sender;
    memberToken[msg.sender] = _getPrice("install");
    emit NewMember(id, _name, _dna); //Evento
  }
  function _generateRandomDna(string _str) private view returns (uint) {
    uint rand = uint(keccak256(_str));
    return rand % dnaModulus;
  }
  function createRandomMember(string _name) public {
    require(memberToken[msg.sender] == 0);
    uint randDna = _generateRandomDna(_name);
    randDna = randDna - randDna % 100;
    _createMember(_name, randDna);
  }
}