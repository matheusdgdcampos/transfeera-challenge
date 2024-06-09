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
            receiverService.create(createReceiverMock()),
        ]);
        const receivers = await receiverService.findAll();
        const receiversPage2 = await receiverService.findAll(2);
        expect(receivers).toHaveProperty('metadata');
        expect(receivers).toHaveProperty('data');
        expect(Array.isArray(receivers.data)).toBeTruthy();
        expect(receivers.data.length).toBe(10);
        expect(receiversPage2).not.toContainEqual(receivers);
    });

    it('should be able to create new receiver', async () => {
        await expect(
            receiverService.create(createReceiverMock()),
        ).resolves.not.toThrow();
    });

    it('should be able to delete one or many receivers', async () => {
        const receiverOne = await receiverService.create(createReceiverMock());
        const receiverTwo = await receiverService.create(createReceiverMock());
        const receiverThree =
            await receiverService.create(createReceiverMock());

        await expect(
            receiverService.remove([receiverOne.id]),
        ).resolves.not.toThrow();
        let receivers = (await receiverService.findAll()).data;
        expect(receivers.length).toBe(2);
        await expect(
            receiverService.remove([receiverTwo.id, receiverThree.id]),
        ).resolves.not.toThrow();
        receivers = (await receiverService.findAll()).data;
        expect(receivers.length).toBe(0);
    });
});
