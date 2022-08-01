import { encode } from 'bech32-buffer';
import axios from 'axios';
import { NFTWalletClient } from './nft-wallet-client';
import { get_coin_name } from './get-coin-name';
import { CoinRecord } from 'chia-client/dist/src/types/FullNode/CoinRecord';
import { processNFT } from './process-found-nft';
import { nft_map, OFFER_HELPER_BASE_URL } from './app';

export async function checkSpend(
  spend: CoinRecord,
  did: string,
  walletClient: NFTWalletClient,
  collectionId: string
): Promise<boolean> {
  const coinName = get_coin_name(spend.coin.parent_coin_info, spend.coin.puzzle_hash, parseInt(spend.coin.amount));
  try {
    const nftInfo = (await walletClient.NftGetInfo('1', coinName)) as any;
    if (nftInfo.success) {
      const nftCoinId = encode('nft', Buffer.from(nftInfo.nft_info.launcher_id.substring(2), 'hex'), 'bech32m');
      if (nft_map[nftCoinId]) {
        return false;
      }
      try {
        const didInfo = await axios.post(
          '/get_minter_did_for_nft',
          { coin_id: nftCoinId },
          { baseURL: OFFER_HELPER_BASE_URL }
        );
        if (didInfo.data.did_id != did) {
          return false;
        }
      } catch (e: any) {
        // Don't log anything since offer helper will return a 500 if there is no did creator
        // console.error(`Unable to get DID creator, this may be expected ${e.message}`);
      }
      const metadataUrl = nftInfo.nft_info?.metadata_uris?.[0];
      try {
        const result = await axios.get(metadataUrl);
        const metadata = result.data;
        if (metadata?.collection?.id?.toUpperCase() !== collectionId?.toUpperCase()) {
          return false;
        }
      } catch (e: any) {
        console.error(`Error getting metadata ${e.message} for coin ${nftCoinId} metadata url: ${metadataUrl}`);
      }
      nft_map[nftCoinId] = true;
      processNFT(nftCoinId, nftInfo.nft_info);
      return true;
    }
  } catch (e: any) {
    console.error(`Error processing potential NFT spend ${e.message}`);
  }
  return false;
}
