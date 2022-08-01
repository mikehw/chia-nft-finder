"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NFTWalletClient = void 0;
const chia_client_1 = require("chia-client");
class NFTWalletClient extends chia_client_1.Wallet {
    constructor(options) {
        super(options);
    }
    NftGetInfo(wallet_id, coin_id) {
        return this.request('nft_get_info', {
            wallet_id,
            coin_id,
        });
    }
}
exports.NFTWalletClient = NFTWalletClient;
