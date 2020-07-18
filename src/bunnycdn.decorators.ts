import { Inject } from '@nestjs/common';
import { getBunnyCDNConnectionToken } from './bunnycdn.utils';

// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
export const InjectBunnyCDN = (connection?: string) => {
  return Inject(getBunnyCDNConnectionToken(connection));
};
