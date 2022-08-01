"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OFFER_HELPER_BASE_URL = exports.nft_map = void 0;
const get_rpc_info_1 = require("./get-rpc-info");
const extended_full_node_client_1 = require("./extended-full-node-client");
const nft_wallet_client_1 = require("./nft-wallet-client");
const test_offer_helper_1 = require("./test-offer-helper");
const process_block_1 = require("./process-block");
const prompt = require("prompt");
require('dotenv').config();
exports.nft_map = {};
exports.OFFER_HELPER_BASE_URL = process.env.OFFER_HELPER_BASE_URL || 'http://127.0.0.1:5000';
const main = (did, collectionId, maxHeight, minHeight) => __awaiter(void 0, void 0, void 0, function* () {
    const fullNodeClient = new extended_full_node_client_1.ExtendedFullNodeClient((0, get_rpc_info_1.GetFullNodeRPCInfo)());
    const walletClient = new nft_wallet_client_1.NFTWalletClient((0, get_rpc_info_1.GetWalletRPCInfo)());
    if (!(yield (0, test_offer_helper_1.testOfferHelper)(exports.OFFER_HELPER_BASE_URL))) {
        return;
    }
    let height = maxHeight;
    let foundCount = 0;
    while (height >= minHeight) {
        foundCount += yield (0, process_block_1.processHeight)(height, fullNodeClient, walletClient, did, collectionId);
        height--;
    }
    console.log(`Run Completed. Found ${foundCount} NFTs.`);
    return;
});
var promptSchema = {
    properties: {
        did: {
            description: 'Minter DID ID',
            pattern: /^did:chia.*$/,
            message: 'DID must start with did:chia',
            required: true,
        },
        collectionId: {
            description: 'Collection ID',
            required: true,
        },
        maxHeight: {
            type: 'integer',
            description: 'Maximum Block Height to Check',
            required: true,
        },
        minHeight: {
            type: 'integer',
            description: 'Minimum Block Height to Check',
            required: true,
            default: 2181001,
        },
    },
};
prompt.message = '';
prompt.get(promptSchema, function (err, result) {
    if (err) {
        console.error(err);
        return;
    }
    main(result.did, result.collectionId, result.maxHeight, result.minHeight);
});
