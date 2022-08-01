import { GetFullNodeRPCInfo, GetWalletRPCInfo } from './get-rpc-info';
import { ExtendedFullNodeClient } from './extended-full-node-client';
import { NFTWalletClient } from './nft-wallet-client';
import { testOfferHelper } from './test-offer-helper';
import { processHeight } from './process-block';
import prompt = require('prompt');
require('dotenv').config();

export const nft_map: Record<string, boolean> = {};
export const OFFER_HELPER_BASE_URL = process.env.OFFER_HELPER_BASE_URL || 'http://127.0.0.1:5000';

const main = async (did: string, collectionId: string, maxHeight: number, minHeight: number) => {
  const fullNodeClient = new ExtendedFullNodeClient(GetFullNodeRPCInfo());
  const walletClient = new NFTWalletClient(GetWalletRPCInfo());
  if (!(await testOfferHelper(OFFER_HELPER_BASE_URL))) {
    return;
  }
  let height = maxHeight;
  let foundCount = 0;
  while (height >= minHeight) {
    foundCount += await processHeight(height, fullNodeClient, walletClient, did, collectionId);
    height--;
  }
  console.log(`Run Completed. Found ${foundCount} NFTs.`);
  return;
};

var promptSchema: prompt.Schema = {
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
prompt.get(promptSchema, function (err, result: any) {
  if (err) {
    console.error(err);
    return;
  }
  main(result.did, result.collectionId, result.maxHeight, result.minHeight);
});
