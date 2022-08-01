import { NFTWalletClient } from './nft-wallet-client';
import { FullNode } from 'chia-client';
import { checkSpend } from './check-spend';

export async function processHeight(
  height: number,
  fullNodeClient: FullNode,
  walletClient: NFTWalletClient,
  did: string,
  collectionId: string
): Promise<number> {
  const record = await fullNodeClient.getBlockRecordByHeight(height);
  console.log(`Processing block at height ${height}`);
  const additionsAndRemovals = await fullNodeClient.getAdditionsAndRemovals(record.block_record.header_hash);
  const possibleNfts = additionsAndRemovals.additions.filter((x) => parseInt(x.coin.amount) == 1);
  const promises: Promise<any>[] = [];
  for (const spend of possibleNfts) {
    promises.push(checkSpend(spend, did, walletClient, collectionId));
  }
  const foundCount = (await Promise.all(promises)).filter((x) => x).length;
  if (foundCount > 0) {
    console.log(`Found ${foundCount} NFTs at block height ${height}`);
  }
  return foundCount;
}
