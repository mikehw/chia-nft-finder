import * as fs from 'fs';
import * as yaml from 'js-yaml';
import { join } from 'path';
import { homedir } from 'os';

export interface RPCInfo {
  certPath: string;
  keyPath: string;
  caCertPath: string;
  hostname: string;
  port: number;
}

export const GetFullNodeRPCInfo = (): RPCInfo => {
  const configFileLocation = join(homedir(), '/.chia/mainnet/config/config.yaml');
  let certPath = process.env.FULL_NODE_CERT_PATH ?? '';
  let keyPath = process.env.FULL_NODE_KEY_PATH ?? '';
  let hostname = process.env.FULL_NODE_HOSTNAME ?? '';
  let port = parseInt(process.env.FULL_NODE_PORT ?? '0');
  let caCertPath = process.env.CA_CERT_PATH ?? '';
  try {
    const fileContents = fs.readFileSync(configFileLocation, 'utf8');
    const doc = yaml.load(fileContents) as any;
    certPath = certPath || join(homedir(), '/.chia/mainnet/', doc.full_node.ssl.private_crt);
    keyPath = keyPath || join(homedir(), '/.chia/mainnet/', doc.full_node.ssl.private_key);
    hostname = hostname || 'localhost';
    port = port || doc.full_node.rpc_port;
    caCertPath = caCertPath || join(homedir(), '/.chia/mainnet/', doc.chia_ssl_ca.crt);
  } catch (err) {
    console.error(`Error loading config ${configFileLocation}`, err);
  }
  return {
    certPath,
    keyPath,
    hostname,
    port,
    caCertPath,
  };
};

export const GetWalletRPCInfo = (): RPCInfo => {
  const configFileLocation = join(homedir(), '/.chia/mainnet/config/config.yaml');
  let certPath = process.env.WALLET_CERT_PATH ?? '';
  let keyPath = process.env.WALLET_KEY_PATH ?? '';
  let hostname = process.env.WALLET_HOSTNAME ?? '';
  let port = parseInt(process.env.WALLET_PORT ?? '0');
  let caCertPath = process.env.CA_CERT_PATH ?? '';
  try {
    const fileContents = fs.readFileSync(configFileLocation, 'utf8');
    const doc = yaml.load(fileContents) as any;
    certPath = certPath || join(homedir(), '/.chia/mainnet/', doc.wallet.ssl.private_crt);
    keyPath = keyPath || join(homedir(), '/.chia/mainnet/', doc.wallet.ssl.private_key);
    hostname = hostname || 'localhost';
    port = port || doc.wallet.rpc_port;
    caCertPath = caCertPath || join(homedir(), '/.chia/mainnet/', doc.chia_ssl_ca.crt);
  } catch (err) {
    console.error(`Error loading config ${configFileLocation}`, err);
  }
  return {
    certPath,
    keyPath,
    hostname,
    port,
    caCertPath,
  };
};
