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

var Web3 = require('web3');
var utility = require('../common/utility');
var Const = require('../common/const');

//repsten
var web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/"));
// var web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:8545"));

//based on web3 v1.0.0-beta.34
var ethOperation = {
    //basic
    getWeb3Version: function () {
      return web3.version;
    },

    getBalance: function(address, callback){
        web3.eth.getBalance(address, function(err, data){
            if(err){
                callback(err);
            }else{
                var balance = {};
                balance.address = address;
                balance.currency ="ether";
                balance.amount = web3.utils.fromWei(data);
                callback(null, balance);
            }
        });
    },

    getTransaction: function(hash, callback){
        web3.eth.getTransaction(hash, function(err, data){
            if(err){
                callback(err);
            }else{
                callback(null, data);
            }
        });
    },

    getTransactionReceipt: function(hash, callback){
        web3.eth.getTransactionReceipt(hash, function(err, data){
            if(err){
                callback(err);
            }else{
                callback(null, data);
            }
        });
    },

    getTransactionCount: function(address, callback){
        web3.eth.getTransactionCount(address, function(err, data){
            if(err){
                callback(err);
            }else{
                var result = {};
                result.address = address;
                result.count = data;
                callback(null, result);
            }
        });
    },

    transfer: function(from, secret, to, amount, gasPrice, gasLimit, callback) {
        var value = web3.utils.toWei(amount, 'ether');
        ethOperation.transfer_Nonce(from, secret, to, value, Const.EMPTY_DATA, gasPrice, gasLimit, function (err, response) {
            if (err) {
                callback(err);
            }
            else{
                callback(null, response);
            }
        });
    },

    transferWithNonce: function(from, secret, to, amount, gasPrice, gasLimit, nonce, callback) {
        var value = web3.utils.toWei(amount, 'ether');
        ethOperation.transfer_BuildGas(from, secret, to, value, Const.EMPTY_DATA, gasPrice, gasLimit, nonce, function (err, response) {
            if (err) {
                callback(err);
            }
            else{
                callback(null, response);
            }
        });
    },

    transfer_Nonce: function(from, secret, to, value, data, gasPrice, gasLimit, callback){
        web3.eth.getTransactionCount(from).then(function(txCount){
            ethOperation.transfer_BuildGas(from, secret, to, value, data, gasPrice, gasLimit, txCount, function (err, response) {
                if (err) {
                    callback(err);
                }
                else{
                    callback(null, response);
                }
            });
        });
    },

    transfer_BuildGas: function(from, secret, to, value, data, gasPrice, gasLimit, nonce, callback){
        ethOperation.buildGas(gasPrice, gasLimit, to, data, function(errGas, responseGas){
            if(!errGas){
                var gas = responseGas;
                ethOperation.transfer_Full(from, secret, to, value, data, gas.price, gas.limit, nonce, function (err, response) {
                    if (err) {
                        callback(err);
                    }
                    else{
                        callback(null, response);
                    }
                });
            }
            else{
                callback(errGas);
            }
        });
    },

    transfer_Full: function(from, secret, to, value, data, gasPrice, gasLimit, nonce, callback){
        var rawTx = {
            from: from,
            to: to,
            value: web3.utils.toHex(value),
            nonce: web3.utils.toHex(nonce),
            gasPrice: web3.utils.toHex(gasPrice),
            gasLimit: web3.utils.toHex(gasLimit),
            data: data,
        };

        ethOperation.rawTransfer(secret, rawTx, function (err, response) {
            if (err) {
                callback(err);
            }
            else{
                callback(null, response);
            }
        });
    },

    rawTransfer: function(secret, rawTx, callback){
        //    "ethereumjs-tx": "^1.3.4",
        var Tx = require('ethereumjs-tx');
        var privateKey = new Buffer(secret, 'hex')

        var tx = new Tx(rawTx);
        tx.sign(privateKey);
        var serializedTx = tx.serialize();
        var signedTx = '0x' + serializedTx.toString('hex');

        web3.eth.sendSignedTransaction(signedTx, function(err, hash) {
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

    //erc20
    deployContract: function(address, secret, tokenName, contractContent, gasPrice, gasLimit, callback){
        var token = utility.parseContract(tokenName, contractContent);
        var bytecode = Const.PREFIX_ETH + token.bytecode;
        var abi = JSON.parse(token.interface);

        ethOperation.transfer_Nonce(address, secret,Const.EMPTY_ADDRESS, Const.EMPTY_VALUE, bytecode, gasPrice, gasLimit, function (err, response) {
            if (err) {
                callback(err);
            }
            else{
                response.abi = abi;
                response.bytecode = bytecode;
                callback(null, response);
            }
        });
    },

    getBalance_Erc20: function(address, contractAddress, tokenName, abi, callback){
        var abiArray = JSON.parse(abi);
        var contract = new web3.eth.Contract(abiArray, contractAddress);
        contract.methods.balanceOf(address).call(function(err, data){
            if(!err){
                var balance = {};
                balance.tokenName = tokenName;
                balance.contractAddress = contractAddress;
                // balance.amount = amount;
                balance.amount = web3.utils.fromWei(data);
                callback(null, balance);
            }
            callback(err);
        });
    },

    transfer_Erc20: function(from, secret, to, contractAddress, abi, amount, gasPrice, gasLimit,callback){
        var value = web3.utils.toWei(amount);
        var abiArray = JSON.parse(abi);
        var contract = new web3.eth.Contract(abiArray, contractAddress);
        var data = contract.methods.transfer(to, value).encodeABI();

        ethOperation.transfer_Nonce(from, secret, contractAddress, Const.EMPTY_VALUE, data, gasPrice, gasLimit, function (err, response) {
            if (err) {
                callback(err);
            }
            else{
                callback(null, response);
            }
        });
    },

    //utility
    estimateGas: function(toAddress, data, callback){
        if(!data){
            data = '';
        }

        const SafeFactor = 10;
        var gas = {};
        gas.price = Const.ETH_GAS_PRICE;
        gas.limit = Const.ETH_GAS_LIMI;

        web3.eth.estimateGas({
            to :toAddress,
            data: data
        }, function(err, estGas){
            if(!err){
                gas.limit = estGas * SafeFactor;
                web3.eth.getGasPrice(function(err1,price){
                    if(!err1){
                        gas.price = price;
                        callback(null, gas);
                    }
                })
            }
        });
    },

    buildGas: function(gasPrice, gasLimit, toAddress, data, callback){
        if(!data){
            data = '';
        }

        var gas = {};
        if(utility.isGasValid(gasPrice) &&  utility.isGasValid(gasLimit)){
            gas.price = gasPrice;
            gas.limit = gasLimit;
            callback(null, gas);
        }
        else{
            ethOperation.estimateGas(toAddress, data, function(err, estGas){
                if(!err){
                    callback(null, estGas);
                }
            });
        }
    },
}

module.exports = ethOperation;