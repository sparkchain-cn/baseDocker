pragma solidity ^0.4.8;
 contract BaseToken{
     // token总量，默认会为public变量生成一个getter函数接口，名称为totalSupply().
     uint256 public totalSupply;

     /// 获取账户_owner拥有token的数量
     function balanceOf(address _owner) public constant returns (uint256 balance);

     //从消息发送者账户中往_to账户转数量为_value的token
     function transfer(address _to, uint256 _value) public returns (bool success);

     //发生转账时必须要触发的事件
     event Transfer(address indexed _from, address indexed _to, uint256 _value);
 }

 contract Token is BaseToken {
     function transfer(address _to, uint256 _value) public returns (bool success) {
         if(balances[msg.sender] < _value) return false;
         balances[msg.sender] -= _value;//从消息发送者账户中减去token数量_value
         balances[_to] += _value;//往接收账户增加token数量_value
         Transfer(msg.sender, _to, _value);//触发转币交易事件
         return true;
     }

     function balanceOf(address _owner) public constant returns (uint256 balance) {
         return balances[_owner];
     }

     mapping (address => uint256) balances;
 }

 contract YIP is Token {
     string public constant name = "易积分";
     string public constant symbol = "YIP";
     uint8 public constant decimals = 18;

     uint256 public constant ONE_TOKENS = (10 ** uint256(decimals));
     uint256 constant MILLION_TOKENS = (10**6) * ONE_TOKENS;
     uint256 constant BILLION_TOKENS = (10**3) * MILLION_TOKENS;
     uint256 public constant TOTAL_TOKENS = 4 * BILLION_TOKENS;

     function YIP () public
     {
         balances[msg.sender] = TOTAL_TOKENS; // 初始token数量给予消息发送者
         totalSupply = TOTAL_TOKENS;         // 设置初始总量
     }
 }