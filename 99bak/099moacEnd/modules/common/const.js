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

var Const = require('./const');
var globalConfig = require('config');

module.exports = Object.freeze({
    API_VERSION_V1: '/v1',
    TOKEN_TYPE_MOAC: '/moac',
    TOKEN_TYPE_ETH: '/eth',
    TOKEN_TYPE_ERC20: '/erc20',
    TOKEN_TYPE_YIKONG: '/yikong',
    CURRENT_API_VERSION: Const.API_VERSION_V1,

    CURRENCY_GAS: "SWT",
    ISSUER_GAS: "",

    MOAC_GAS_PRICE: 25000000000, //25 gsha
//  MOAC_GAS_PRICE = 25000000;  //25 msha
    MOAC_GAS_LIMI: 400000,

    ETH_GAS_PRICE: 21000000000, //21 gwei
    ETH_GAS_LIMI: 400000,

    PREFIX_ETH: "0x",
    PREFIX_MOAC: "0x",
    UNIT_ETH_ETHER: 'ether',
    UNIT_MOAC_MC: 'mc',

    EMPTY_DATA: '0x00',
    EMPTY_VALUE:'0x',
    EMPTY_ADDRESS:'0x',
});


