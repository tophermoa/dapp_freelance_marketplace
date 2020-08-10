pragma solidity >=0.4.21 < 0.6.3;

contract Penawaran{
    uint public dataCount = 0;    
    mapping(uint => Data) public datas;
    
    struct Data{
        uint id;
        uint256 tawar;
        address owner;
    }
    
    event penawaranCreated(
        uint id,
        uint256 tawar,
        address owner
    );
    

    
    function createPenawaran(uint256 _tawar) public {
        //require a valid name
        require(_tawar>0);
        dataCount ++;
        datas[dataCount] = Data(dataCount, _tawar, msg.sender);
        emit penawaranCreated(dataCount, _tawar, msg.sender);
    }
    
    function getPenawar(uint256 _id) public {
        //fetch datanya
        Data memory _data = datas[_id];
        //fetch wallet address orangnya
        //address _seller = _product.owner;
    }
}