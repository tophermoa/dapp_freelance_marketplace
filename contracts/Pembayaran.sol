pragma solidity >=0.4.21 < 0.6.3;

contract Pembayaran{
 
    address owner;
    address pekerja;
    
    mapping(address => uint256) public deposits;
    
    modifier onlyOwner(){
        require(owner == owner);
        _;
    }
    
    constructor() public{
        //owner = msg.sender;
        //pekerja = _pekerja;
        //pekerja = tx.origin;
    }
    
    function deposit() public onlyOwner payable{
        uint256 jumlah = msg.value;
        deposits[owner] = deposits[owner] + jumlah;
        
    }
    
    function withdraw() public {
        //msg.sender = pekerja
        //employee = msg.sender;
        uint256 bayar = deposits[owner];
        deposits[owner] = 0;
        msg.sender.transfer(bayar);
    }
    
    
}