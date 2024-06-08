import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
    validate,
    EnvironmentVariables,
} from './environment-variables/environment-variables';
import { ReceiverModule } from './receiver/receiver.module';

@Module({
    imports: [
        ConfigModule.forRoot({
            validate,
            isGlobal: true,
        }),
        MongooseModule.forRootAsync({
            useFactory: (
                configService: ConfigService<EnvironmentVariables>,
            ) => ({
                uri: configService.getOrThrow('DATABASE_URL'),
            }),
            inject: [ConfigService],
        }),
        ReceiverModule,
    ],
})
export class AppModule {}
