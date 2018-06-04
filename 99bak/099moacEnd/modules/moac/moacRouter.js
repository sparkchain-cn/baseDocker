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

var bodyParser = require('body-parser');
var Const = require('../common/const');
var uuid = require('node-uuid');

var moacOperation = require('./moacOperation');
var ethOperation = require('../eth/ethOperation');
var utility = require('../common/utility');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var CURRENT_API_VERSION = Const.API_VERSION_V1;
var TOKEN_TYPE_MOAC = Const.TOKEN_TYPE_MOAC;
var TOKEN_TYPE_ERC20 = Const.TOKEN_TYPE_ERC20;
var TOKEN_TYPE_YIKONG = Const.TOKEN_TYPE_YIKONG;
var PREFIX_MOAC = CURRENT_API_VERSION + TOKEN_TYPE_MOAC;

module.exports = function (app) {
    // create a new account
    app.post(CURRENT_API_VERSION + '/login', urlencodedParser, function (req, res) {
        var userName =  req.body.userName;
        var password =  req.body.password;
        var loginResult = {};
        loginResult.success = false;
        loginResult.token = "";

        const USER = "Yikong";
        const PSW = "de9856c3-f971-42ca-af3c-5077473e574f";

        if(userName === USER && password === PSW){
            loginResult.success = true;
            loginResult.token = uuid.v4();

            //todo: store the token in redis.
        }

        console.log("loginResult: ", loginResult);
        res.end(JSON.stringify(loginResult));
    })

    //  create a new account
    app.post(CURRENT_API_VERSION + '/new', urlencodedParser, function (req, res) {
        // var account = moacOperation.createAccount();
        // res.end(JSON.stringify(account));

        try {
            var account = utility.createAccount();
            res.end(JSON.stringify(utility.buildResponse(null, account)));
        }
        catch (error) {
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

    // balance
    app.post(PREFIX_MOAC + '/balance', urlencodedParser, function (req, res) {
        var address = req.body.address;
        var currency = req.body.currency;

        try{
            var balance = {};
            balance.address = address;
            balance.currency = currency == "" ? "Moac" : currency;
            balance.amount = moacOperation.getBalance(address);
            res.end(JSON.stringify(utility.buildResponse(null, balance)));
        }
        catch(error){
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

    //  moac transfer
    app.post(PREFIX_MOAC + '/transfer', urlencodedParser, function (req, res) {
        var fromAddress = req.body.fromAddress;
        var fromSecret = req.body.fromSecret;
        var toAddress = req.body.toAddress;
        var amount = req.body.amount;
        var gasPrice = req.body.gasPrice;
        var gasLimit = req.body.gasLimit;

        try {
            moacOperation.transfer(fromAddress, fromSecret, toAddress, amount, gasPrice, gasLimit, function(err, data) {
                if(err){
                    console.log("err: " + err);
                }
                res.end(JSON.stringify(utility.buildResponse(err, data)));
            });
        }
        catch (error) {
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

    // transfer with nonce
    app.post(PREFIX_MOAC + '/transferWithNonce', urlencodedParser, function (req, res) {
        var fromAddress = req.body.fromAddress;
        var fromSecret = req.body.fromSecret;
        var toAddress = req.body.toAddress;
        var amount = req.body.amount;
        var gasPrice = req.body.gasPrice;
        var gasLimit = req.body.gasLimit;
        var nonce = req.body.nonce;

        try {
            moacOperation.transferWithNonce(fromAddress, fromSecret, toAddress, amount, gasPrice, gasLimit, nonce, function(err, data) {
                if(err){
                    console.log("err: " + err);
                }
                res.end(JSON.stringify(utility.buildResponse(err, data)));
            });
        }
        catch (error) {
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

    // get transation info
    app.post(PREFIX_MOAC + '/getCount', urlencodedParser, function (req, res) {
        var address = req.body.address;
        try {
            var count = moacOperation.getCount(address);
            res.end(JSON.stringify(utility.buildResponse(null, count)));
        }
        catch (error) {
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

    // get transation info
    app.post(PREFIX_MOAC + '/getTransaction', urlencodedParser, function (req, res) {
        var hash = req.body.hash;
        try {
            var tx = moacOperation.getTransaction(hash);
            res.end(JSON.stringify(utility.buildResponse(null, tx)));
        }
        catch (error) {
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

    // get local key
    app.post(PREFIX_MOAC + '/getKey', urlencodedParser, function (req, res) {
        var datadir = req.body.datadir;
        var address = req.body.address;
        var passphrase = req.body.passphrase;
        // var key = moacOperation.getKey(datadir, address, passphrase);
        // res.end(JSON.stringify(key));
        try {
            var key = moacOperation.getKey(datadir, address, passphrase);
            res.end(JSON.stringify(utility.buildResponse(null, key)));
        }
        catch (error) {
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

    //  erc20 create
    app.post(PREFIX_MOAC + TOKEN_TYPE_ERC20 + '/deployContractByCoinbase', urlencodedParser, function (req, res) {
        var tokenName = req.body.tokenName;
        var contractContent = req.body.contractContent;
        // moacOperation.deployContractByCoinbase(tokenName, contractContent, function(err, data) {
        //     // 输出 JSON 格式
        //     if (err) {
        //         console.log("err: " + err);
        //         return;
        //     }
        //     res.end(JSON.stringify(data));
        // });

        try {
            moacOperation.deployContractByCoinbase(tokenName, contractContent, function(err, data) {
                console.log("err: " + err);
                res.end(JSON.stringify(utility.buildResponse(err, data)));
            });
        }
        catch (error) {
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

    app.post(PREFIX_MOAC + TOKEN_TYPE_ERC20 + '/deployContract', urlencodedParser, function (req, res) {
        var address = req.body.address;
        var secret = req.body.secret;
        var tokenName = req.body.tokenName;
        var contractContent = req.body.contractContent;
        var gasPrice = req.body.gasPrice;
        var gasLimit = req.body.gasLimit;

        try {
            moacOperation.deployContract(address, secret, tokenName, contractContent, gasPrice, gasLimit, function(err, data) {
                if(err){
                    console.log("err: " + err);
                }
                res.end(JSON.stringify(utility.buildResponse(err, data)));
            });
        }
        catch (error) {
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

    //  erc20 balance
    app.post(PREFIX_MOAC + TOKEN_TYPE_ERC20 + '/balance', urlencodedParser, function (req, res) {
        var address = req.body.address;
        var contractAddress = req.body.contractAddress;
        var tokenName = req.body.tokenName;
        var abi = req.body.abi;

        try {
            res.end(JSON.stringify(utility.buildResponse(null, moacOperation.getBalance_Erc20ByAbi(address, contractAddress, tokenName, abi))));
        }
        catch (error) {
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

    app.post(PREFIX_MOAC + TOKEN_TYPE_ERC20 + '/balance2', urlencodedParser, function (req, res) {
        var address = req.body.address;
        var contractAddress = req.body.contractAddress;
        var tokenName = req.body.tokenName;
        var contractContent = req.body.contractContent;

        try {
            res.end(JSON.stringify(utility.buildResponse(null, moacOperation.getBalance_Erc20ByContract(address, contractAddress, tokenName, contractContent))));
        }
        catch (error) {
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

    //  erc20 transfer
    app.post(PREFIX_MOAC + TOKEN_TYPE_ERC20 + '/transfer', urlencodedParser, function (req, res) {
        //from, secret, to, contractAddress, tokenName, abi, value
        var from = req.body.from;
        var secret = req.body.secret;
        var to = req.body.to;
        var contractAddress = req.body.contractAddress;
        // var tokenName = req.body.tokenName;
        var abi = req.body.abi;
        var amount = req.body.amount;
        var gasPrice = req.body.gasPrice;
        var gasLimit = req.body.gasLimit;

        try {
            moacOperation.transfer_Erc20(from, secret, to, contractAddress, abi, amount, gasPrice, gasLimit, function(err, data) {
                if(err){
                    console.log("err: " + err);
                }
                res.end(JSON.stringify(utility.buildResponse(err, data)));
            });
        }
        catch (error) {
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

    app.post(PREFIX_MOAC + TOKEN_TYPE_ERC20 + '/transferFrom', urlencodedParser, function (req, res) {
        //from, secret, to, contractAddress, tokenName, abi, value
        var from = req.body.from;
        var secret = req.body.secret;
        var to = req.body.to;
        var contractAddress = req.body.contractAddress;
        // var tokenName = req.body.tokenName;
        var abiString = req.body.abi;
        var value = req.body.value;

        var abi = JSON.parse(abiString);

        moacOperation.transferFrom_Erc20_Standard(from, secret, to, contractAddress, abi, value, function(err, data) {
            if (err) {
                console.log("err: " + err);
                res.end(JSON.stringify(err));
                return;
            }
            res.end(JSON.stringify(data));
        });
    })

    app.post(PREFIX_MOAC + TOKEN_TYPE_ERC20 + '/abi', urlencodedParser, function (req, res) {
        var tokenName = req.body.tokenName;
        var contractContent = req.body.contractContent;

        try {
            res.end(JSON.stringify(utility.buildResponse(null, utility.getAbi(tokenName, contractContent))));
        }
        catch (error) {
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

    //  yikong balance
    app.post(PREFIX_MOAC + TOKEN_TYPE_YIKONG + '/balance', urlencodedParser, function (req, res) {
        var address = req.body.address;
        try {
            res.end(JSON.stringify(utility.buildResponse(null, moacOperation.getBalance_Yikong(address))));
        }
        catch (error) {
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

    //  yikong transfer
    app.post(PREFIX_MOAC + TOKEN_TYPE_YIKONG + '/transfer', urlencodedParser, function (req, res) {
        //from, secret, to, contractAddress, tokenName, abi, value
        var from = req.body.from;
        var secret = req.body.secret;
        var to = req.body.to;
        var amount = req.body.amount;
        var gasPrice = req.body.gasPrice;
        var gasLimit = req.body.gasLimit;

        try {
            moacOperation.transfer_Yikong(from, secret, to, amount, gasPrice, gasLimit, function(err, data) {
                if(err){
                    console.log("err: " + err);
                }
                res.end(JSON.stringify(utility.buildResponse(err, data)));
            });
        }
        catch (error) {
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })





    // test
    app.post(CURRENT_API_VERSION + '/test', urlencodedParser, function (req, res) {
        var fromAddress = req.body.fromAddress;
        var fromSecret = req.body.fromSecret;
        var toAddress = req.body.toAddress;
        var amount = req.body.amount;
        var gasPrice = req.body.gasPrice;
        var gasLimit = req.body.gasLimit;

        // res.end(JSON.stringify(moacOperation.getChain3Version()));
        res.end(JSON.stringify(ethOperation.getWeb3Version()));

        //0x2814A7f5CC45174A05917D18aB6bd801adb713A9

        // var list = JSON.parse(gasPrice);
        //
        // var toList = [];
        // var amountList = [];
        // toList.push("0x126c6bf6185cf4ba6c46a4764c7042ad0013399d");
        // amountList.push(amount);
        // toList.push("0xca10ca46c36eb845d405be42fa738c8d41452009");
        // amountList.push(amount);
        // toList.push("0x80e86d2555f56fda971f32b5f81ba791c8a952ef");
        // amountList.push(amount);
        //
        // try {
        //     moacOperation.transfer_one2many(fromAddress, fromSecret, toList, amountList, gasPrice, gasLimit, function(err, data) {
        //         if(err){
        //             console.log("err: " + err);
        //         }
        //         res.end(JSON.stringify(utility.buildResponse(err, data)));
        //     });
        // }
        // catch (error) {
        //     res.end(JSON.stringify(utility.buildResponse(error, null)));
        // }
    })

    app.post(PREFIX_MOAC + '/collect', urlencodedParser, function (req, res) {
        var list = req.body.fromList;
        var toAddress = req.body.toAddress;
        var gasPrice = req.body.gasPrice;
        var gasLimit = req.body.gasLimit;
        var fromList = JSON.parse(list);

        try {
            moacOperation.collectFee(fromList, toAddress, gasPrice, gasLimit, function(err, data) {
                if(err){
                    console.log("err: " + err);
                }
                res.end(JSON.stringify(utility.buildResponse(err, data)));
            });
        }
        catch (error) {
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

    app.post(PREFIX_MOAC + '/one2many', urlencodedParser, function (req, res) {
        var fromAddress = req.body.fromAddress;
        var fromSecret = req.body.fromSecret;
        var list = req.body.toList;
        var gasPrice = req.body.gasPrice;
        var gasLimit = req.body.gasLimit;
        var toList = JSON.parse(list);

        try {
            moacOperation.transfer_one2many(fromAddress, fromSecret, toList, gasPrice, gasLimit, function(err, data) {
                if(err){
                    console.log("err: " + err);
                }
                res.end(JSON.stringify(utility.buildResponse(err, data)));
            });
        }
        catch (error) {
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

}