pragma solidity >=0.4.21 < 0.6.3;

contract BuatProject{
    uint public dataCount = 0;    
    mapping(uint => Data) public datas;
    
    struct Data{
        uint id;
        string judul;
        string deskripsi;
        string estimasi;
        uint budget;
        string kategori;
        string level;
        address owner;
    }
    
    event ProjectCreated(
        uint id,
        string judul,
        string deskripsi,
        string estimasi,
        uint budget,
        string kategori,
        string level,
        address owner
    );
    

    
    function createProject(string memory _judul, string memory _deskripsi, string memory _estimasi, uint _budget, string memory _kategori, string memory _level) public {
        //require a valid name
        require(bytes(_judul).length > 0);
        require(bytes(_deskripsi).length > 0);
        require(bytes(_estimasi).length > 0);
        //require a valid price
        require(_budget>0);
        dataCount ++;
        datas[dataCount] = Data(dataCount, _judul, _deskripsi, _estimasi, _budget, _kategori, _level, msg.sender);
        emit ProjectCreated(dataCount, _judul, _deskripsi, _estimasi, _budget, _kategori, _level, msg.sender);
    }
    
}