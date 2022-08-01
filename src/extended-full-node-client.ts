import { FullNode } from 'chia-client';
import { ChiaOptions } from 'chia-client/dist/src/RpcClient';

export class ExtendedFullNodeClient extends FullNode {
  constructor(options: ChiaOptions) {
    super(options);
  }
  public GetCoinRecordsByParentIds(
    start_height: number,
    end_height: number,
    include_spent_coins: boolean,
    parent_ids: string[]
  ) {
    return this.request('get_coin_records_by_parent_ids', {
      start_height,
      end_height,
      include_spent_coins,
      parent_ids,
    });
  }
}
