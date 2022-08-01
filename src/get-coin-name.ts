import { createHash } from 'crypto';

export function get_coin_name(parent_coin_info: string, puzzle_hash: string, amount: number) {
  if (parent_coin_info.indexOf('0x') == 0) {
    parent_coin_info = parent_coin_info.substring(2);
  }
  if (puzzle_hash.indexOf('0x') == 0) {
    puzzle_hash = puzzle_hash.substring(2);
  }
  const a = Buffer.from(parent_coin_info, 'hex');
  const b = Buffer.from(puzzle_hash, 'hex');
  const fixPreLength = (num: string, len: number) => (Array(len).join('0') + num).slice(-len);
  let amountHex = amount.toString(16);
  const byte_count = (amount.toString(2).length + 8) >> 3;
  amountHex = fixPreLength(amountHex, byte_count * 2);
  if (amountHex.length % 2 == 1) {
    amountHex = '0' + amountHex;
  }
  const c = Buffer.from(amountHex, 'hex');

  const d = Buffer.concat([a, b, c], a.length + b.length + c.length);
  const hash = createHash('sha256');
  hash.update(d);
  return '0x' + hash.digest('hex');
}
