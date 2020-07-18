import {
  BUNNYCDN_MODULE_CONNECTION,
  BUNNYCDN_MODULE_CONNECTION_TOKEN,
  BUNNYCDN_MODULE_OPTIONS_TOKEN,
} from './bunnycdn.constants';
import { BunnyCDN, BunnyCDNOptions } from '@intelrug/bunnycdn';

export function getBunnyCDNOptionsToken(connection?: string): string {
  return `${connection || BUNNYCDN_MODULE_CONNECTION}_${BUNNYCDN_MODULE_OPTIONS_TOKEN}`;
}

export function getBunnyCDNConnectionToken(connection?: string): string {
  return `${connection || BUNNYCDN_MODULE_CONNECTION}_${BUNNYCDN_MODULE_CONNECTION_TOKEN}`;
}

export function createBunnyCDNConnection(options: BunnyCDNOptions): BunnyCDN {
  return new BunnyCDN(options);
}
