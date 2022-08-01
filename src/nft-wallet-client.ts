import { Wallet } from 'chia-client';
import { ChiaOptions } from 'chia-client/dist/src/RpcClient';

export class NFTWalletClient extends Wallet {
  constructor(options: ChiaOptions) {
    super(options);
  }

  public NftGetInfo(wallet_id: string, coin_id: string) {
    return this.request('nft_get_info', {
      wallet_id,
      coin_id,
    });
  }
}
