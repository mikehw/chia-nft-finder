import * as fs from 'fs';

export function processNFT(nftCoinId: string, nftInfo: any) {
  var dir = './found-nfts';
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
  fs.writeFileSync(`./found-nfts/${nftCoinId}.json`, JSON.stringify(nftInfo, null, 2));
}
