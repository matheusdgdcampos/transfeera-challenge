import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { validate } from './environment-variables/environment-variables';
import { ReceiverModule } from './receiver/receiver.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate,
            isGlobal: true,
        }),
        ReceiverModule,
    ],
})
export class AppModule {}
