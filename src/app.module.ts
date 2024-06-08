import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './environment-variables/environment-variables';
import { ReceiverModule } from './receiver/receiver.module';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate,
            isGlobal: true,
        }),
        CacheModule.register({
            isGlobal: true,
        }),
        ReceiverModule,
    ],
})
export class AppModule {}
