import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import {
    validate,
    EnvironmentVariables,
} from './environment-variables/environment-variables';

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
    ],
})
export class AppModule {}
