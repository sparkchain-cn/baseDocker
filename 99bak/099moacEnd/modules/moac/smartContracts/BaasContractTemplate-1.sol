		// 配置智能合约
		String contractTemplate = "pragma solidity ^0.4.16;\n" +
				" contract BaseToken{\n" +
				"     // token总量，默认会为public变量生成一个getter函数接口，名称为totalSupply().\n" +
				"     uint256 public totalSupply;\n" +
				"\n" +
				"     /// 获取账户_owner拥有token的数量\n" +
				"     function balanceOf(address _owner) public constant returns (uint256 balance);\n" +
				"\n" +
				"     //从消息发送者账户中往_to账户转数量为_value的token\n" +
				"     function transfer(address _to, uint256 _value) public returns (bool success);\n" +
				"\n" +
				"     //发生转账时必须要触发的事件\n" +
				"     event Transfer(address indexed _from, address indexed _to, uint256 _value);\n" +
				" }\n" +
				"\n" +
				" contract Token is BaseToken {\n" +
				"     function transfer(address _to, uint256 _value) public returns (bool success) {\n" +
				"         require(balances[msg.sender] >= _value && balances[_to] + _value > balances[_to]);\n" +
				"         require(_to != 0x0);\n" +
				"         balances[msg.sender] -= _value;//从消息发送者账户中减去token数量_value\n" +
				"         balances[_to] += _value;//往接收账户增加token数量_value\n" +
				"         Transfer(msg.sender, _to, _value);//触发转币交易事件\n" +
				"         return true;\n" +
				"     }\n" +
				"\n" +
				"     function balanceOf(address _owner) public constant returns (uint256 balance) {\n" +
				"         return balances[_owner];\n" +
				"     }\n" +
				"\n" +
				"     mapping (address => uint256) balances;\n" +
				" }\n" +
				"\n" +
				" contract %s is Token {\n" + //s1: symbol
				"     string public constant name = \"%s\";\n" +  //s2: name
				"     string public constant symbol = \"%s\";\n" +  //s3: symbol
				"     uint8 public constant decimals = 18;\n" +
				"\n" +
				"     uint256 public constant ONE_TOKEN = (10 ** uint256(decimals));\n" +
				"     uint256 public constant TOTAL_TOKENS = %s * ONE_TOKEN;\n" +   //s4: amount
				"\n" +
				"     function %s() public\n" +   //s5: symbol
				"     {\n" +
				"         balances[msg.sender] = TOTAL_TOKENS; // 初始token数量给予消息发送者\n" +
				"         totalSupply = TOTAL_TOKENS;         // 设置初始总量\n" +
				"     }\n" +
				" }";
		String contract = String.format(contractTemplate, symbol, name, symbol, amount, symbol);