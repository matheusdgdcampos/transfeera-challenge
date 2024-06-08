import { PROVIDERS } from '@/commons/enums/providers.enum';
import { EnvironmentVariables } from '@/environment-variables/environment-variables';
import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongoClient } from 'mongodb';

@Module({
    providers: [
        {
            provide: PROVIDERS.DATABASE_CONNECTION,
            useFactory: async (
                configService: ConfigService<EnvironmentVariables>,
            ) => {
                const client = await MongoClient.connect(
                    configService.getOrThrow('DATABASE_URL', { infer: true }),
                    {
                        connectTimeoutMS: 8000, // 8 seconds
                    },
                );

                return client.db(
                    configService.getOrThrow('DATABASE_URL', { infer: true }),
                );
            },
            inject: [ConfigService],
        },
    ],
    exports: [PROVIDERS.DATABASE_CONNECTION],
})
export class DatabaseModule {}
