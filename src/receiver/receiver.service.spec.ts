import { TestingModule } from '@nestjs/testing';
import { ReceiverService } from './receiver.service';
import { InMemoryDatabase } from '@/database/in-memory-database';
import { TestingModuleFactory } from '@/commons/factory/testing-module-factory';
import { ReceiverRepository } from './repository/receiver.repository';
import { createReceiverMock } from './mocks/receiver.mock';

describe('ReceiverService', () => {
    let moduleRef: TestingModule;
    let db: InMemoryDatabase;
    let receiverService: ReceiverService;
    let receiverRepository: ReceiverRepository;

    beforeAll(async () => {
        [moduleRef, db] = await TestingModuleFactory();

        receiverService = moduleRef.get(ReceiverService);
        receiverRepository = moduleRef.get(ReceiverRepository);

        await receiverRepository.createIndexes();
    });

    afterEach(async () => {
        await db.clearDatabase();
    });

    afterAll(async () => {
        await db.disconnect();
        await moduleRef.close();
    });

    it('should be able to find all receivers', async () => {
        // TODO teste falhando
        await Promise.all([
            receiverService.create(createReceiverMock()),
            receiverService.create(createReceiverMock()),
            receiverService.create(createReceiverMock()),
            receiverService.create(createReceiverMock()),
            receiverService.create(createReceiverMock()),
            receiverService.create(createReceiverMock()),
            receiverService.create(createReceiverMock()),
            receiverService.create(createReceiverMock()),
            receiverService.create(createReceiverMock()),
            receiverService.create(createReceiverMock()),
        ]);
        const receivers = await receiverService.findAll();
        expect(receivers).toHaveProperty('metadata');
        expect(receivers).toHaveProperty('data');
        expect(Array.isArray(receivers.data)).toBeTruthy();
        expect(receivers.data.length).toBe(10);
    });
});
