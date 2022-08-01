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
exports.processHeight = void 0;
const check_spend_1 = require("./check-spend");
function processHeight(height, fullNodeClient, walletClient, did, collectionId) {
    return __awaiter(this, void 0, void 0, function* () {
        const record = yield fullNodeClient.getBlockRecordByHeight(height);
        console.log(`Processing block at height ${height}`);
        const additionsAndRemovals = yield fullNodeClient.getAdditionsAndRemovals(record.block_record.header_hash);
        const possibleNfts = additionsAndRemovals.additions.filter((x) => parseInt(x.coin.amount) == 1);
        const promises = [];
        for (const spend of possibleNfts) {
            promises.push((0, check_spend_1.checkSpend)(spend, did, walletClient, collectionId));
        }
        const foundCount = (yield Promise.all(promises)).filter((x) => x).length;
        if (foundCount > 0) {
            console.log(`Found ${foundCount} NFTs at block height ${height}`);
        }
        return foundCount;
    });
}
exports.processHeight = processHeight;
