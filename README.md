# Chia NFT Finder

Scan the Chia Blockchain to find NFTs from a collection

## Usage

Install Node v12+

Requires [offer-helper](https://github.com/offerpool/offer-helper) to be running. If you have to change the port or hostname for offer-helper you can override the hostname used via the `OFFER_HELPER_BASE_URL` environment variable.

NFT Info will be saved into the `./found-nfts` directory where the name of the file is the NFT ID, and the content is the nft info as json.

Execute `npx chia-nft-finder` and follow the prompts for minter did, collection id, max block height, and min block height.

If your chia config is not in the default location `~/.chia/mainnet/config/config.yaml` you can specify the following environment variables.

```env
FULL_NODE_CERT_PATH
FULL_NODE_KEY_PATH
FULL_NODE_HOSTNAME
FULL_NODE_PORT
CA_CERT_PATH
```