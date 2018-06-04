/**
 * Moac end project;
 * @version 0.0.1
 * Copyright (C) 2018 by Sparkchain Inc.
 * or its affiliates. All rights reserved.
 * Licensed under the Apache License, Version 2.0 (the "License").
 * You may not use this file except in compliance with
 * the License. A copy of the License is located at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Create by Foreso @ 20180410
 *
 */

// var Async = require('async');
// var Config = require('config');
var Chain3 = require('chain3');
var Config = require('config');
var Keythereum = require("keythereum");
var utility = require('../common/utility');
var Const = require('../common/const');

var chain3 = new Chain3(new Chain3.providers.HttpProvider(process.env.moacUrl || "http://localhost:8545"));
// var chain3 = new Chain3(new Chain3.providers.HttpProvider("http://127.0.0.1:8545"));

var moacOperation = {
    getChain3Version: function () {
      return chain3.version.api;
    },

    // basic
    getBalance: function(address){
        var mc = chain3.mc;
        //获得帐户余额，以sha为单位
        var amountSha = mc.getBalance(address);
        //把sha为单位的余额转换成以moac为单位的余额
        var amountMC = chain3.fromSha(amountSha, 'mc');
        // console.log(address + ":" + amountSha);
        return amountMC;
    },

    getCount: function(fromAddress){
        return chain3.mc.getTransactionCount(fromAddress);
    },

    getTransaction: function(hash){
        var tx = chain3.mc.getTransactionReceipt(hash);
        return tx;
    },

    getKey: function(datadir, address, passphrase){
        // var keythereum = require("keythereum");
        // var datadir = "/Users/owenxu/AppData/Roaming/MoacNode/testnet";
        // // var address= "0xb792cc4fd9181182e40bfb9b9fafe18d438d7246";
        // var address= "0x36a65f44c3460bf0b8ce9e9caa8b2c21ef501a3e";
        // const password = "hello";

        var keyObject = Keythereum.importFromFile(address, datadir);
        var privateKey = Keythereum.recover(passphrase, keyObject);
        // console.log(privateKey.toString('hex'));
        var result = {};
        result.address = address;
        result.privateKey = privateKey.toString('hex');
        result.passphrase = passphrase;

        return result;
    },

    estimateGas: function(toAddress, data){
        if(!data){
            data = '';
        }

        var limit = chain3.mc.estimateGas({
            to :toAddress,
            data: data
        });
        const SafeFactor = 10;
        var gas = {};
        gas.price = Number(chain3.mc.gasPrice);
        gas.limit = limit * SafeFactor;
        // gas.price = STANDARD_GAS_PRICE;
        // gas.limit = STANDARD_GAS_LIMIT;
        return gas;
    },

    buildGas: function(gasPrice, gasLimit, toAddress, data){
        if(!data){
            data = '';
        }

        var gas = {};
        if(utility.isGasValid(gasPrice) &&  utility.isGasValid(gasLimit)){
            gas.price = gasPrice;
            gas.limit = gasLimit;
        }
        else{
            gas = moacOperation.estimateGas(toAddress, data);
        }

        return gas;
    },

    buildRawTx: function(from, to, value, nonce, gasPrice, gasLimit, data, chainId){
        var rawTx = {
            from: from,
            to: to,
            value: value,
            nonce: nonce,
            gasPrice: gasPrice,
            gasLimit: gasLimit,
            data: data,
            chainId: chainId,
        };
        return rawTx;
    },


    transfer: function(from, secret, to, amount, gasPrice, gasLimit, callback) {
        var txCount = chain3.mc.getTransactionCount(from);
        moacOperation.transferWithNonce(from, secret, to, amount, gasPrice, gasLimit, txCount, function (err, data) {
            if (err) {
                callback(err);
            }
            else{
                callback(null, data);
            }
        });
    },

    transferWithNonce: function(from, secret, to, amount, gasPrice, gasLimit, nonce, callback) {
        var value = chain3.toSha(amount, 'mc');
        var gas = moacOperation.buildGas(gasPrice, gasLimit, to);
        var rawTx = moacOperation.buildRawTx(from, to, chain3.intToHex(value), chain3.intToHex(nonce), chain3.intToHex(gas.price), chain3.intToHex(gas.limit), '0x00',chain3.version.network);
        moacOperation.rawTransfer(secret, rawTx, function (err, data) {
            if (err) {
                callback(err);
            }
            else{
                callback(null, data);
            }
        });
    },

    rawTransfer: function(secret, rawTx, callback){
        var tx = chain3.signTransaction(rawTx, secret);
        chain3.mc.sendRawTransaction(tx, function(err, hash) {
            if (!err){
                var result = {};
                result.hash = hash;
                callback(null, result);
            }else{
                console.log(err);
                callback(err);
            }
        });
    },





    //batch
    bactchTransfer: function(txList, gasPrice, gasLimit, callback){
        // var tx = {};
        // tx.fromAddress = "";
        // tx.fromSecret = "";
        // tx.toAddress = "";
        // tx.amount = -1;
        // var txList = [];

        var noncePairList = [];
        // noncePair.address = tx.fromAddress;
        // noncePair.nonce = nonce;

        var result = [];
        var count = txList.length;

        txList.forEach(function(item,index){
            var tx = item;
            var nonce;
            if(!!noncePairList[tx.fromAddress]){
                nonce = ++ noncePairList[tx.fromAddress].nonce;
            }
            else{
                nonce = chain3.mc.getTransactionCount(tx.fromAddress);
                var noncePair = {};
                noncePair.address = tx.fromAddress;
                noncePair.nonce = nonce;
                noncePairList.push(noncePair);
            }

            console.log(index+'---'+tx+'---'+nonce);
            moacOperation.transferWithNonce(tx.fromAddress, tx.fromSecret, tx.toAddress, tx.amount, gasPrice, gasLimit, nonce, function (err, data) {
                if (err) {
                    var error = {};
                    error.index = index;
                    error.toAddress = tx.fromAddress;
                    error.nonce = nonce;
                    error.message = err;
                    callback(error);
                }
                else{
                    result.push(data);
                    // console.log();
                    if(result.length == count){
                        callback(null, result);
                    }
                }
            });
        });
    },

    transfer_one2many: function(fromAddress, fromSecret, toList, gasPrice, gasLimit, callback){
        var txCount = chain3.mc.getTransactionCount(fromAddress);
        var count = toList.length;
        var result = [];

        toList.forEach(function(item,index){
            var toAddress = item.address;
            var amount = item.amount;
            console.log(index+'---'+toAddress+'---'+txCount);

            moacOperation.transferWithNonce(fromAddress, fromSecret, toAddress, amount, gasPrice, gasLimit, txCount++, function (err, data) {
                if (err) {
                    var error = {};
                    error.index = index;
                    error.toAddress = toAddress;
                    error.nonce = txCount;
                    error.message = err;
                    callback(error);
                }
                else{
                    result.push(data);
                    // console.log();
                    if(result.length == count){
                        callback(null, result);
                    }
                }
            });
        });
    },

    transfer_many2one: function(fromList, secretList, to, amountList, gasPrice, gasLimit, callback){


    },

    collectFee: function(fromList, toAddress, gasPrice, gasLimit, callback){
        // sample
        // var fromList = [];
        // var fromAccount = {};
        // fromAccount.address = "";
        // fromAccount.secret = "";

        var gas = moacOperation.buildGas(gasPrice, gasLimit, toAddress);
        var fee = gas.price * gas.limit;  // *2 for safe, ensure the transaction will be executed.
        var txList = [];

        fromList.forEach(function(item,index){
            var fromAccount = item;
            var balance = Number (chain3.mc.getBalance(fromAccount.address));
            var value = balance - fee;

            if(value > 0){
                var amount = chain3.fromSha(value);

                var tx = {};
                tx.fromAddress = fromAccount.address;
                tx.fromSecret = fromAccount.secret;
                tx.toAddress = toAddress;
                tx.amount = amount;

                txList.push(tx);
            }
        });

        moacOperation.bactchTransfer(txList, gasPrice, gasLimit, function (err, data) {
            if (err) {
                callback(err);
            }
            else{
                callback(null, data);
            }
        });
    },



    // erc20
    deployContractByKey: function(address, secret, tokenName, contractContent){
        var result = {};
        result.result = false;
        result.tokenName = "";
        result.contractAddress = "";
        result.transactionHash = "";
        result.abi = "";

        var token = utility.parseContract(tokenName, contractContent);
        var bytecode = Const.MOAC_PREFIX + token.bytecode;
        var abi = JSON.parse(token.interface);
        // console.log('bytecode', bytecode);
        // console.log('abi', abiString);

        var gasValue = chain3.mc.estimateGas({data: bytecode});
        // console.log("gas estimate on contract:", gasValue);

        // var address = account.address;
        // var secret = account.secret;

        var txCount = chain3.mc.getTransactionCount(address);
        // console.log("get tx account", txCount)

        var rawTx = {
            from: address,
            nonce: chain3.intToHex(txCount),
            gasPrice: chain3.intToHex(25000000000),
            gasLimit: chain3.intToHex(gasValue * 10), //"* 10", 具体原因可查看 https://github.com/MOACChain/moac-core/issues/6, 后续问题修复后从文档中移掉 "* 10"
            value: '0x00',
            data: bytecode
        };

        // console.log('raw tx:', rawTx);
        var tx = new chain3.transaction(rawTx);
        // console.log('version:', chain3.version.network);
        tx.setChainId(chain3.version.network);
        // console.log("tx chain id:", tx.getChainId())

        //Requires the private key
        var privateKey = new Buffer(secret, 'hex');
        // console.log(tx.toJSON());

        tx.sign(privateKey);
        // console.log("after signed:", tx.toJSON());

        var signedTx = Const.MOAC_PREFIX + tx.serialize().toString('hex');
        // console.log("send signed tx:", signedTx);
        // console.log("len", signedTx.length);

        tx.verifySignature();
        var recover = Const.MOAC_PREFIX + tx.getSenderAddress().toString('hex');
        // console.log("recovered address:", recover);

        chain3.mc.sendRawTransaction(signedTx, function(err, hash) {
            if (!err){
                // console.log("succeed: ", hash);
                result.result = true;
                result.tokenName = tokenName;
                result.contractAddress = res.address;
                result.transactionHash = hash;
                result.abi = abi;
                // result.res = res;
                callback(null, result);
            }else{
                console.log("error:", err.message);
                callback(err);
            }
        });
    },

    deployContractByCoinbase: function(tokenName, contractContent, callback){//, issuerAddress, issuerSecret){
        var result = {};
        result.result = false;
        result.tokenName = "";
        result.contractAddress = "";
        result.transactionHash = "";
        result.abi = "";

        //todo: use standard address/secret.
        var account = chain3.mc.accounts[0];
        chain3.personal.unlockAccount(account, 'hello', 0);
        // console.log("account: ", account);

        var token = utility.parseContract(tokenName, contractContent);
        var bytecode = Const.MOAC_PREFIX + token.bytecode;
        var abi = JSON.parse(token.interface);
        // console.log('bytecode: ', bytecode);
        // console.log('abi: ', ctt.interface);

        var contract = chain3.mc.contract(abi);
        var gasEstimate = chain3.mc.estimateGas({data: bytecode});
        // var gas = chain3.toSha(0.1);

        var instance = contract.new({
            data: bytecode,
            from: account,
            // gas: gas
            gas: gasEstimate * 10
        }, function(err, res){
            if(err) {
                console.log(err);
                return;
            }
            if(res.address){
                // console.log('contract address: ' + res.address);
                result.result = true;
                result.tokenName = tokenName;
                result.contractAddress = res.address;
                result.transactionHash = res.transactionHash;
                result.abi = abi;
                // result.res = res;
                callback(null, result);
            }else{
                console.log('no contract address');
                // console.log('token: ', token);
                // callback('no contract address');
            }
        });
        // console.log('deploy', instance);
    },

    deployContractBySecret: function(tokenName, contractContent, callback){//, issuerAddress, issuerSecret){
        var result = {};
        result.result = false;
        result.tokenName = "";
        result.contractAddress = "";
        result.transactionHash = "";
        result.abi = "";

        //todo: use standard address/secret.
        var account = chain3.mc.accounts[0];
        chain3.personal.unlockAccount(account, 'hello', 0);
        // console.log("account: ", account);

        var token = utility.parseContract(tokenName, contractContent);
        var bytecode = Const.MOAC_PREFIX + token.bytecode;
        var abi = JSON.parse(token.interface);
        // console.log('bytecode: ', bytecode);
        // console.log('abi: ', ctt.interface);

        var contract = chain3.mc.contract(abi);
        var gasEstimate = chain3.mc.estimateGas({data: bytecode});
        // var gas = chain3.toSha(0.1);

        var instance = contract.new({
            data: bytecode,
            from: account,
            // gas: gas
            gas: gasEstimate * 10
        }, function(err, res){
            if(err) {
                console.log(err);
                return;
            }
            if(res.address){
                // console.log('contract address: ' + res.address);
                result.result = true;
                result.tokenName = tokenName;
                result.contractAddress = res.address;
                result.transactionHash = res.transactionHash;
                result.abi = abi;
                // result.res = res;
                callback(null, result);
            }else{
                console.log('no contract address');
                // console.log('token: ', token);
                // callback('no contract address');
            }
        });
        // console.log('deploy', instance);
    },

    // createContract: function(chain3, account, abiString, bytecodeString, address, secret, tokenName, contractContent, callback){
    deployContract: function(address, secret, tokenName, contractContent, gasPrice, gasLimit, callback){
        var token = utility.parseContract(tokenName, contractContent);
        var bytecode = Const.PREFIX_MOAC + token.bytecode;
        var abi = JSON.parse(token.interface);
        var txCount = chain3.mc.getTransactionCount(address);
        // console.log("get tx account", txCount);
        var gas = moacOperation.buildGas(gasPrice, gasLimit, address, bytecode);
        var rawTx = moacOperation.buildRawTx(address, '0x', '0x', chain3.intToHex(txCount), chain3.intToHex(gas.price), chain3.intToHex(gas.limit), bytecode,chain3.version.network);

        moacOperation.rawTransfer(secret, rawTx, function (err, data) {
            if (err) {
                callback(err);
            }
            else{
                data.abi = abi;
                data.bytecode = bytecode;
                callback(null, data);
            }
        });
    },

    getBalance_Erc20ByContract: function(address, contractAddress, tokenName, contractContent){
        var token = utility.parseContract(tokenName, contractContent);
        return moacOperation.getBalance_Erc20ByAbi(address, contractAddress, tokenName, token.interface);
    },

    getBalance_Erc20ByAbi: function(address, contractAddress, tokenName, abi){
        var abiArray = JSON.parse(abi);
        var contract = chain3.mc.contract(abiArray);
        var token = contract.at(contractAddress);
        var amount = token.balanceOf(address);

        var balance = {};
        balance.tokenName = tokenName;
        balance.contractAddress = contractAddress;
        // balance.amount = amount;
        balance.amount = chain3.fromSha(amount);

        return balance;
    },

    transfer_Erc20: function(fromAddress, fromSecret, toAddress, contractAddress, abiString, value, gasPrice, gasLimit, callback){
        var abi = JSON.parse(abiString);

        moacOperation.transfer_Erc20_Standard(fromAddress, fromSecret, toAddress, contractAddress, abi, value, gasPrice, gasLimit, function (err, data) {
            if (err) {
                callback(err);
            }
            else{
                callback(null, data);
            }
        });
    },

    //starndard erc20 transfer, for yikong and other erc20
    transfer_Erc20_Standard: function(from, secret, to, contractAddress, abi, amount, gasPrice, gasLimit,callback){
        var contract = chain3.mc.contract(abi);
        var token = contract.at(contractAddress);
        var txCount = chain3.mc.getTransactionCount(from);
        var amountSha = chain3.toSha(amount);
        var gas = moacOperation.buildGas(gasPrice, gasLimit, to);
        var rawTx = moacOperation.buildRawTx(from, contractAddress, '0x', chain3.intToHex(txCount), chain3.intToHex(gas.price), chain3.intToHex(gas.limit), token.transfer.getData(to, amountSha),chain3.version.network);
        moacOperation.rawTransfer(secret, rawTx, function (err, data) {
            if (err) {
                callback(err);
            }
            else{
                callback(null, data);
            }
        });
    },

    transferFrom_Erc20_Standard: function(fromAddress, fromSecret, toAddress, contractAddress, abi, value, callback){
        var contract = chain3.mc.contract(abi);
        var token = contract.at(contractAddress);

        var txCount = chain3.mc.getTransactionCount(fromAddress);
        var amount = chain3.toSha(value);
        var rawTx = {
            nonce: chain3.intToHex(txCount),
            gasPrice: chain3.intToHex(gas.price),
            gasLimit: chain3.intToHex(gas.limit),
            to: contractAddress,
            data: token.transferFrom.getData(fromAddress, toAddress, amount),
        };

        moacOperation.rawTransfer(fromSecret, rawTx, function (err, data) {
            if (err) {
                callback(err);
            }
            else{
                callback(null, data);
            }
        });
    },



    // yikong
    getBalance_Yikong: function(address){
        var tokenName = Config.get("yikong.tokenName");
        var abi = Config.get("yikong.abi");
        var contractAddress = Config.get("yikong.contractAddress");

        // var abiArray = JSON.parse(abi);
        var contract = chain3.mc.contract(abi);
        var token = contract.at(contractAddress);
        var amount = token.balanceOf(address);

        var balance = {};
        balance.tokenName = tokenName;
        balance.contractAddress = contractAddress;
        // balance.amount = amount;
        balance.amount = chain3.fromSha(amount);

        return balance;
    },

    transfer_Yikong: function(fromAddress, fromSecret, toAddress, amount, gasPrice, gasLimit, callback){
        var abi = Config.get("yikong.abi");
        var contractAddress = Config.get("yikong.contractAddress");

        moacOperation.transfer_Erc20_Standard(fromAddress, fromSecret, toAddress, contractAddress, abi, amount, gasPrice, gasLimit,function (err, data) {
            if (err) {
                callback(err);
            }
            else{
                callback(null, data);
            }
        });
    },

}

module.exports = moacOperation;