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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.checkSpend = void 0;
const bech32_buffer_1 = require("bech32-buffer");
const axios_1 = __importDefault(require("axios"));
const get_coin_name_1 = require("./get-coin-name");
const process_found_nft_1 = require("./process-found-nft");
const app_1 = require("./app");
function checkSpend(spend, did, walletClient, collectionId) {
    var _a, _b, _c, _d;
    return __awaiter(this, void 0, void 0, function* () {
        const coinName = (0, get_coin_name_1.get_coin_name)(spend.coin.parent_coin_info, spend.coin.puzzle_hash, parseInt(spend.coin.amount));
        try {
            const nftInfo = (yield walletClient.NftGetInfo('1', coinName));
            if (nftInfo.success) {
                const nftCoinId = (0, bech32_buffer_1.encode)('nft', Buffer.from(nftInfo.nft_info.launcher_id.substring(2), 'hex'), 'bech32m');
                if (app_1.nft_map[nftCoinId]) {
                    return false;
                }
                try {
                    const didInfo = yield axios_1.default.post('/get_minter_did_for_nft', { coin_id: nftCoinId }, { baseURL: app_1.OFFER_HELPER_BASE_URL });
                    if (didInfo.data.did_id != did) {
                        return false;
                    }
                }
                catch (e) {
                    // Don't log anything since offer helper will return a 500 if there is no did creator
                    // console.error(`Unable to get DID creator, this may be expected ${e.message}`);
                }
                const metadataUrl = (_b = (_a = nftInfo.nft_info) === null || _a === void 0 ? void 0 : _a.metadata_uris) === null || _b === void 0 ? void 0 : _b[0];
                try {
                    const result = yield axios_1.default.get(metadataUrl);
                    const metadata = result.data;
                    if (((_d = (_c = metadata === null || metadata === void 0 ? void 0 : metadata.collection) === null || _c === void 0 ? void 0 : _c.id) === null || _d === void 0 ? void 0 : _d.toUpperCase()) !== (collectionId === null || collectionId === void 0 ? void 0 : collectionId.toUpperCase())) {
                        return false;
                    }
                }
                catch (e) {
                    console.error(`Error getting metadata ${e.message} for coin ${nftCoinId} metadata url: ${metadataUrl}`);
                }
                app_1.nft_map[nftCoinId] = true;
                (0, process_found_nft_1.processNFT)(nftCoinId, nftInfo.nft_info);
                return true;
            }
        }
        catch (e) {
            console.error(`Error processing potential NFT spend ${e.message}`);
        }
        return false;
    });
}
exports.checkSpend = checkSpend;
