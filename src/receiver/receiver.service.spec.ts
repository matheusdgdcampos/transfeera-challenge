import { TestingModule } from '@nestjs/testing';
import { ReceiverService } from './receiver.service';
import { InMemoryDatabase } from '@/database/in-memory-database';
import { TestingModuleFactory } from '@/commons/factory/testing-module-factory';
import { ReceiverRepository } from './repository/receiver.repository';
import { createReceiverMock } from './mocks/receiver.mock';
import { RECEIVER_STATUS, Receiver } from './entities/receiver.entity';
import { faker } from '@faker-js/faker';
import { UnprocessableEntityException } from '@nestjs/common';

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

    describe('findAll', () => {
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
    });

    describe('create', () => {
        it('should be able to create new receiver', async () => {
            await expect(
                receiverService.create(createReceiverMock()),
            ).resolves.not.toThrow();
        });
    });

    describe('remove', () => {
        it('should be able to delete one or many receivers', async () => {
            const receiverOne =
                await receiverService.create(createReceiverMock());
            const receiverTwo =
                await receiverService.create(createReceiverMock());
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

    describe('search', () => {
        it('should be able to search receiver', async () => {
            await receiverRepository.createIndexes();
            const createdReceiver =
                await receiverService.create(createReceiverMock());
            await receiverService.create(createReceiverMock());
            const receiversSearchName = await receiverService.search(
                createdReceiver.name,
            );

            expect(receiversSearchName.length).toBe(1);
            expect(receiversSearchName[0].name).toBe(createdReceiver.name);
        });
    });

    describe('update', () => {
        it('should be able to update receiver with status draft', async () => {
            const receiver = await receiverService.create(createReceiverMock());

            const receiverDraft: Receiver = {
                ...receiver,
                status: RECEIVER_STATUS.DRAFT,
            };

            const receiverToUpdate = createReceiverMock();

            const receiverDraftUpdated = await receiverService.update(
                receiverDraft.id,
                receiverToUpdate,
            );

            expect(receiverDraftUpdated.name).not.toEqual(receiverDraft.name);
            expect(receiverDraftUpdated.email).not.toEqual(receiverDraft.email);
            expect(receiverDraftUpdated.document.value).not.toEqual(
                receiverDraft.document.value,
            );
        });

        it('should be able to update receiver with status validated', async () => {
            const receiver = await receiverService.create(createReceiverMock());

            const receiverDraft: Receiver = {
                ...receiver,
                status: RECEIVER_STATUS.VALIDATED,
            };

            const receiverToUpdate = {
                ...receiverDraft,
                email: createReceiverMock().email,
            };

            const receiverDraftUpdated = await receiverService.update(
                receiverDraft.id,
                receiverToUpdate,
            );

            expect(receiverDraftUpdated.name).toEqual(receiverDraft.name);
            expect(receiverDraftUpdated.email).not.toEqual(receiverDraft.email);
            expect(receiverDraftUpdated.document.value).toEqual(
                receiverDraft.document.value,
            );
        });

        it('should not be able to update receiver', async () => {
            const id = faker.database.mongodbObjectId();
            const receiverToUpdate = createReceiverMock();
            await expect(
                receiverService.update(id, receiverToUpdate),
            ).rejects.toThrow(UnprocessableEntityException);
        });
    });
});
