import { DynamicModule, Global, Module, Provider, Type } from '@nestjs/common';
import { BunnyCDNOptions } from '@intelrug/bunnycdn';
import {
  createBunnyCDNConnection,
  getBunnyCDNConnectionToken,
  getBunnyCDNOptionsToken,
} from './bunnycdn.utils';
import { BunnyCDNAsyncOptions, BunnyCDNOptionsFactory } from './bunnycdn.interfaces';

@Global()
@Module({})
export class BunnyCDNCoreModule {
  static forRoot(options: BunnyCDNOptions, connection?: string): DynamicModule {
    const bunnyCDNOptionsProvider: Provider = {
      provide: getBunnyCDNOptionsToken(connection),
      useValue: options,
    };

    const bunnyCDNConnectionProvider: Provider = {
      provide: getBunnyCDNConnectionToken(connection),
      useValue: createBunnyCDNConnection(options),
    };

    return {
      module: BunnyCDNCoreModule,
      providers: [bunnyCDNOptionsProvider, bunnyCDNConnectionProvider],
      exports: [bunnyCDNOptionsProvider, bunnyCDNConnectionProvider],
    };
  }

  public static forRootAsync(options: BunnyCDNAsyncOptions, connection?: string): DynamicModule {
    const bunnyCDNConnectionProvider: Provider = {
      provide: getBunnyCDNConnectionToken(connection),
      useFactory(options: BunnyCDNOptions) {
        return createBunnyCDNConnection(options);
      },
      inject: [getBunnyCDNOptionsToken(connection)],
    };

    return {
      module: BunnyCDNCoreModule,
      imports: options.imports,
      providers: [...this.createAsyncProviders(options, connection), bunnyCDNConnectionProvider],
      exports: [bunnyCDNConnectionProvider],
    };
  }

  public static createAsyncProviders(options: BunnyCDNAsyncOptions, connection?: string): Provider[] {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useExisting || options.useFactory) {
      return [this.createAsyncOptionsProvider(options, connection)];
    }
    const useClass = options.useClass as Type<BunnyCDNOptionsFactory>;
    return [this.createAsyncOptionsProvider(options, connection), { provide: useClass, useClass: useClass }];
  }

  public static createAsyncOptionsProvider(options: BunnyCDNAsyncOptions, connection?: string): Provider {
    if (!(options.useExisting || options.useFactory || options.useClass)) {
      throw new Error('Invalid configuration. Must provide useFactory, useClass or useExisting');
    }

    if (options.useFactory) {
      return {
        provide: getBunnyCDNOptionsToken(connection),
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    const inject = [(options.useClass || options.useExisting) as Type<BunnyCDNOptionsFactory>];
    return {
      provide: getBunnyCDNOptionsToken(connection),
      async useFactory(optionsFactory: BunnyCDNOptionsFactory): Promise<BunnyCDNOptions> {
        return optionsFactory.createBunnyCDNModuleOptions();
      },
      inject,
    };
  }
}
