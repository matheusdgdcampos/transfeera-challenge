import { Test, TestingModule } from '@nestjs/testing';
import { InMemoryDatabase } from '@/database/in-memory-database';
import { AppModule } from '@/app.module';
import { Logger } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

export async function TestingModuleFactory(): Promise<
    [moduleRef: TestingModule, db: InMemoryDatabase]
> {
    const memoryDatabase = new InMemoryDatabase();
    const moduleRef = await Test.createTestingModule({ imports: [AppModule] })
        .overrideProvider(MongooseModule)
        .useFactory({
            factory: async () => {
                const logger = new Logger(TestingModuleFactory.name);
                try {
                    await memoryDatabase.connect();
                    return memoryDatabase.db;
                } catch (error) {
                    logger.error(error);
                    throw error;
                }
            },
        })
        .compile();

    return [moduleRef, memoryDatabase];
}
