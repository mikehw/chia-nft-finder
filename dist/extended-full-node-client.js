"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExtendedFullNodeClient = void 0;
const chia_client_1 = require("chia-client");
class ExtendedFullNodeClient extends chia_client_1.FullNode {
    constructor(options) {
        super(options);
    }
    GetCoinRecordsByParentIds(start_height, end_height, include_spent_coins, parent_ids) {
        return this.request('get_coin_records_by_parent_ids', {
            start_height,
            end_height,
            include_spent_coins,
            parent_ids,
        });
    }
}
exports.ExtendedFullNodeClient = ExtendedFullNodeClient;
