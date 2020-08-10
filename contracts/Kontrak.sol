pragma solidity >=0.4.21 < 0.6.3;


contract Kontrak {
    address payable public owner;
    address payable public employee;
    uint256 public timeframe;
    uint256 public trialPeriod;
    uint256 public startTime;
    uint256 public endTimestamp;
    uint256 public endTrialTimestamp;
    bool public cancelled = false;
    bool public markCompleted = false;
    string ipfsHash;

    event _deposit(uint amount);
    event _handshake(address employee);
    event _completed();
    event _cancelled();
    event _pay(uint amount);

    //ini constructor kalo dideploy paramny juga kudu keisi
    function createContract(uint256 _endTimestamp) public {
      owner = msg.sender;
      endTimestamp = _endTimestamp;
      // endTrialTimestamp = _trialEndTimestamp;
      startTime = getTimestamp();
      timeframe = _endTimestamp - getTimestamp();
      //trialPeriod = _trialEndTimestamp - getTimestamp();
    }

    function getCreateContract() public view returns (uint256){
        return endTimestamp;
    } 

    function setIpfs(string memory x) onlyEmployee public{
      ipfsHash=x;
    }

    function getIpfs() public view returns (string memory){
      return ipfsHash;
    }

    modifier onlyStarted() {
      require(startTime > 0);
      _;
    }

    modifier onlyOwner() {
      require(owner == msg.sender);
      _;
    }

    modifier onlyEmployee() {
      require(employee == msg.sender);
      _;
    }

    modifier notOwner() {
      require(owner != msg.sender);
      _;
    }

    modifier notTrialPeriod() {
      require(getTimestamp() >= startTime + trialPeriod);
      _;
    }


    function handShake () notOwner public {
      employee = msg.sender;
      // startTime = now;
      emit _handshake(msg.sender);
    }

    function deposit() onlyOwner payable public {
      emit _deposit(msg.value);
    }

    function getBalance() view public returns (uint) {
      return address(this).balance;
    }

    function getTimestamp() view internal returns (uint256) {
      return now;
    }

    function isCompleted() view public returns (bool) {
      if (markCompleted || passedTimeFrame()) {
        return true;
      }

      return false;
    }

    function passedTimeFrame() view public returns (bool) {
      return getTimestamp() - startTime > timeframe;
    }

    function pay() onlyEmployee notTrialPeriod public payable {
      uint balance = address(this).balance;
      if (passedTimeFrame()) {
        employee.transfer(balance);
        emit _pay(balance);
      } else {
        uint amount = balance * (getTimestamp() - startTime) / timeframe;
        employee.transfer(amount);
        emit _pay(amount);
      }
    }

    function cancel() onlyOwner public {
      owner.transfer(address(this).balance);
      cancelled = true;
      emit _cancelled();
    }

    function complete() onlyOwner onlyStarted public payable {
      employee.transfer(address(this).balance);
      markCompleted = true;
      emit _completed();
    }

}
