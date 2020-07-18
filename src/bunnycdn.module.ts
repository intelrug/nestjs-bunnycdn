import { DynamicModule, Module } from '@nestjs/common';
import { BunnyCDNOptions } from '@intelrug/bunnycdn';
import { BunnyCDNCoreModule } from './bunnycdn.core-module';
import { BunnyCDNAsyncOptions } from './bunnycdn.interfaces';

@Module({})
export class BunnyCDNModule {
  public static forRoot(options: BunnyCDNOptions, connection?: string): DynamicModule {
    return {
      module: BunnyCDNModule,
      imports: [BunnyCDNCoreModule.forRoot(options, connection)],
      exports: [BunnyCDNCoreModule],
    };
  }

  public static forRootAsync(options: BunnyCDNAsyncOptions, connection?: string): DynamicModule {
    return {
      module: BunnyCDNModule,
      imports: [BunnyCDNCoreModule.forRootAsync(options, connection)],
      exports: [BunnyCDNCoreModule],
    };
  }
}
