# @intelrug/nestjs-bunnycdn
> Integrates BunnyCDN with Nest

<a href="https://www.npmjs.com/package/@intelrug/nestjs-bunnycdn"><img src="https://img.shields.io/npm/v/@intelrug/nestjs-bunnycdn" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/package/@intelrug/nestjs-bunnycdn"><img src="https://img.shields.io/npm/l/@intelrug/nestjs-bunnycdn" alt="Package License" /></a>
<a href="https://www.npmjs.com/package/@intelrug/nestjs-bunnycdn"><img src="https://img.shields.io/npm/dm/@intelrug/nestjs-bunnycdn" alt="NPM Downloads" /></a>

### Install

```bash
$ yarn add @intelrug/nestjs-bunnycdn
```

### Usage

### BunnyCDNModule.forRoot(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { BunnyCDNModule } from '@intelrug/nestjs-bunnycdn';
import { AppController } from './app.controller';

@Module({
  imports: [
    BunnyCDNModule.forRoot({
      apiAccessKey: 'your-key',
      storageZones: [{
        name: 'your-storage-zone-name',
        accessKey: 'your-storage-zone-access-key'
      }],
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### BunnyCDNModule.forRootAsync(options, connection?)

```ts
import { Module } from '@nestjs/common';
import { BunnyCDNModule } from '@intelrug/nestjs-bunnycdn';
import { AppController } from './app.controller';

@Module({
  imports: [
    BunnyCDNModule.forRootAsync({
      useFactory: () => ({
        apiAccessKey: 'your-key',
        storageZones: [{
          name: 'your-storage-zone-name',
          accessKey: 'your-storage-zone-access-key'
        }],
      }),
    }),
  ],
  controllers: [AppController],
})
export class AppModule {}
```

### InjectBunnyCDN(connection?)

```ts
import { Controller, Get, } from '@nestjs/common';
import { InjectBunnyCDN } from '@intelrug/nestjs-bunnycdn';
import { BunnyCDN, PullZone } from '@intelrug/bunnycdn';

@Controller()
export class AppController {
  constructor(
    @InjectBunnyCDN() private readonly bunny: BunnyCDN,
  ) {}

  @Get()
  async getHello(): Promise<PullZone[]> {
    try {
      await this.bunny.pullZone.create({
        Name: 'my-pull-zone',
        OriginUrl: 'http://my-site.com',
        Type: 0
      });
      return this.bunny.pullZone.get();
    } catch (e) {
      console.log(e);
    }
  }
}
```
