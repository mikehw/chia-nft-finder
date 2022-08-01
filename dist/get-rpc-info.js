"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetWalletRPCInfo = exports.GetFullNodeRPCInfo = void 0;
const fs = __importStar(require("fs"));
const yaml = __importStar(require("js-yaml"));
const path_1 = require("path");
const os_1 = require("os");
const GetFullNodeRPCInfo = () => {
    var _a, _b, _c, _d, _e;
    const configFileLocation = (0, path_1.join)((0, os_1.homedir)(), '/.chia/mainnet/config/config.yaml');
    let certPath = (_a = process.env.FULL_NODE_CERT_PATH) !== null && _a !== void 0 ? _a : '';
    let keyPath = (_b = process.env.FULL_NODE_KEY_PATH) !== null && _b !== void 0 ? _b : '';
    let hostname = (_c = process.env.FULL_NODE_HOSTNAME) !== null && _c !== void 0 ? _c : '';
    let port = parseInt((_d = process.env.FULL_NODE_PORT) !== null && _d !== void 0 ? _d : '0');
    let caCertPath = (_e = process.env.CA_CERT_PATH) !== null && _e !== void 0 ? _e : '';
    try {
        const fileContents = fs.readFileSync(configFileLocation, 'utf8');
        const doc = yaml.load(fileContents);
        certPath = certPath || (0, path_1.join)((0, os_1.homedir)(), '/.chia/mainnet/', doc.full_node.ssl.private_crt);
        keyPath = keyPath || (0, path_1.join)((0, os_1.homedir)(), '/.chia/mainnet/', doc.full_node.ssl.private_key);
        hostname = hostname || 'localhost';
        port = port || doc.full_node.rpc_port;
        caCertPath = caCertPath || (0, path_1.join)((0, os_1.homedir)(), '/.chia/mainnet/', doc.chia_ssl_ca.crt);
    }
    catch (err) {
        console.error(`Error loading config ${configFileLocation}`, err);
    }
    return {
        certPath,
        keyPath,
        hostname,
        port,
        caCertPath,
    };
};
exports.GetFullNodeRPCInfo = GetFullNodeRPCInfo;
const GetWalletRPCInfo = () => {
    var _a, _b, _c, _d, _e;
    const configFileLocation = (0, path_1.join)((0, os_1.homedir)(), '/.chia/mainnet/config/config.yaml');
    let certPath = (_a = process.env.WALLET_CERT_PATH) !== null && _a !== void 0 ? _a : '';
    let keyPath = (_b = process.env.WALLET_KEY_PATH) !== null && _b !== void 0 ? _b : '';
    let hostname = (_c = process.env.WALLET_HOSTNAME) !== null && _c !== void 0 ? _c : '';
    let port = parseInt((_d = process.env.WALLET_PORT) !== null && _d !== void 0 ? _d : '0');
    let caCertPath = (_e = process.env.CA_CERT_PATH) !== null && _e !== void 0 ? _e : '';
    try {
        const fileContents = fs.readFileSync(configFileLocation, 'utf8');
        const doc = yaml.load(fileContents);
        certPath = certPath || (0, path_1.join)((0, os_1.homedir)(), '/.chia/mainnet/', doc.wallet.ssl.private_crt);
        keyPath = keyPath || (0, path_1.join)((0, os_1.homedir)(), '/.chia/mainnet/', doc.wallet.ssl.private_key);
        hostname = hostname || 'localhost';
        port = port || doc.wallet.rpc_port;
        caCertPath = caCertPath || (0, path_1.join)((0, os_1.homedir)(), '/.chia/mainnet/', doc.chia_ssl_ca.crt);
    }
    catch (err) {
        console.error(`Error loading config ${configFileLocation}`, err);
    }
    return {
        certPath,
        keyPath,
        hostname,
        port,
        caCertPath,
    };
};
exports.GetWalletRPCInfo = GetWalletRPCInfo;
