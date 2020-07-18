import { ModuleMetadata, Type } from '@nestjs/common/interfaces';
import { BunnyCDNOptions } from '@intelrug/bunnycdn';

export interface BunnyCDNOptionsFactory {
  createBunnyCDNModuleOptions(): Promise<BunnyCDNOptions> | BunnyCDNOptions;
}

export interface BunnyCDNAsyncOptions extends Pick<ModuleMetadata, 'imports'> {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  inject?: any[];
  useClass?: Type<BunnyCDNOptionsFactory>;
  useExisting?: Type<BunnyCDNOptionsFactory>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  useFactory?: (...args: any[]) => Promise<BunnyCDNOptions> | BunnyCDNOptions;
}
