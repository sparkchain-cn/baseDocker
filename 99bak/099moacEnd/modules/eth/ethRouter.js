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
var ethOperation = require('../eth/ethOperation');
var utility = require('../common/utility');

var urlencodedParser = bodyParser.urlencoded({ extended: false })
var CURRENT_API_VERSION = Const.API_VERSION_V1;
var TOKEN_TYPE_ETH = Const.TOKEN_TYPE_ETH;
var TOKEN_TYPE_ERC20 = Const.TOKEN_TYPE_ERC20;
var PREFIX_ETH = CURRENT_API_VERSION + TOKEN_TYPE_ETH;

module.exports = function (app) {
    app.post(PREFIX_ETH + '/balance', urlencodedParser, function (req, res) {
        var address = req.body.address;

        try{
           ethOperation.getBalance(address, function(err, data){
               if(err){
                   console.log("err: " + err);
               }
               res.end(JSON.stringify(utility.buildResponse(err, data)));
           });
        }
        catch(error){
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

    app.post(PREFIX_ETH + '/getTransactionCount', urlencodedParser, function (req, res) {
        var address = req.body.address;
        try {
            var count = ethOperation.getTransactionCount(address, function(err, data){
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

    app.post(PREFIX_ETH + '/getTransaction', urlencodedParser, function (req, res) {
        var hash = req.body.hash;
        try {
            var count = ethOperation.getTransaction(hash, function(err, data){
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

    app.post(PREFIX_ETH + '/getTransactionReceipt', urlencodedParser, function (req, res) {
        var hash = req.body.hash;
        try {
            var count = ethOperation.getTransactionReceipt(hash, function(err, data){
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

    app.post(PREFIX_ETH + '/transfer', urlencodedParser, function (req, res) {
        var fromAddress = req.body.fromAddress;
        var fromSecret = req.body.fromSecret;
        var toAddress = req.body.toAddress;
        var amount = req.body.amount;
        var gasPrice = req.body.gasPrice;
        var gasLimit = req.body.gasLimit;

        try {
            ethOperation.transfer(fromAddress, fromSecret, toAddress, amount, gasPrice, gasLimit, function(err, data) {
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

    app.post(PREFIX_ETH + '/transferWithNonce', urlencodedParser, function (req, res) {
        var fromAddress = req.body.fromAddress;
        var fromSecret = req.body.fromSecret;
        var toAddress = req.body.toAddress;
        var amount = req.body.amount;
        var gasPrice = req.body.gasPrice;
        var gasLimit = req.body.gasLimit;
        var nonce = req.body.nonce;

        try {
            ethOperation.transferWithNonce(fromAddress, fromSecret, toAddress, amount, gasPrice, gasLimit, nonce, function(err, data) {
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

    app.post(PREFIX_ETH + TOKEN_TYPE_ERC20 + '/deployContract', urlencodedParser, function (req, res) {
        var address = req.body.address;
        var secret = req.body.secret;
        var tokenName = req.body.tokenName;
        var contractContent = req.body.contractContent;
        var gasPrice = req.body.gasPrice;
        var gasLimit = req.body.gasLimit;

        try {
            ethOperation.deployContract(address, secret, tokenName, contractContent, gasPrice, gasLimit, function(err, data) {
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

    app.post(PREFIX_ETH + TOKEN_TYPE_ERC20 + '/balance', urlencodedParser, function (req, res) {
        var address = req.body.address;
        var contractAddress = req.body.contractAddress;
        var tokenName = req.body.tokenName;
        var abi = req.body.abi;

        try {
            ethOperation.getBalance_Erc20(address, contractAddress, tokenName, abi, function(err, data){
                if(err){
                    console.log("err: " + err);
                }
                res.end(JSON.stringify(utility.buildResponse(err, data)));
            });
            // res.end(JSON.stringify(buildResponse(null, ethOperation.getBalance_Erc20_ByAbi(address, contractAddress, tokenName, abi))));
        }
        catch (error) {
            res.end(JSON.stringify(utility.buildResponse(error, null)));
        }
    })

    app.post(PREFIX_ETH + TOKEN_TYPE_ERC20 + '/transfer', urlencodedParser, function (req, res) {
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
            ethOperation.transfer_Erc20(from, secret, to, contractAddress, abi, amount, gasPrice, gasLimit, function(err, data) {
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
        //         res.end(JSON.stringify(buildResponse(err, data)));
        //     });
        // }
        // catch (error) {
        //     res.end(JSON.stringify(buildResponse(error, null)));
        // }
    })

}