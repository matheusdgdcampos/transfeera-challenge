import { TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { createReceiverMock } from '@/receiver/mocks/receiver.mock';
import { TestingModuleFactory } from '@/commons/factory/testing-module-factory';
import { InMemoryDatabase } from '@/database/in-memory-database';

describe('Application (e2e)', () => {
    let app: INestApplication;
    let moduleRef: TestingModule;
    let db: InMemoryDatabase;

    beforeEach(async () => {
        [moduleRef, db] = await TestingModuleFactory();

        app = moduleRef.createNestApplication();
        await app.init();
    });

    afterEach(async () => {
        await db.clearDatabase();
    });

    afterAll(async () => {
        await db.disconnect();
        await app.close();
    });

    it('/receivers (GET)', () => {
        const receiver = createReceiverMock();

        request(app.getHttpServer())
            .post('/receiver')
            .set('Accept', 'application/json')
            .send(receiver)
            .expect(201);

        request(app.getHttpServer())
            .get('/receiver')
            .expect(({ body }) => {
                expect(body).toHaveProperty('metadata');
                expect(body).toHaveProperty('data');
            })
            .expect(200);
    });

    it('/receivers (POST)', () => {
        const receiverToCreate = createReceiverMock();
        return request(app.getHttpServer())
            .post('/receiver')
            .set('Accept', 'application/json')
            .send(receiverToCreate)
            .expect(201);
    });

    it('/receivers (PUT)', async () => {
        const receiverToCreate = createReceiverMock();
        const receiverToUpdate = {
            ...receiverToCreate,
            email: createReceiverMock().email,
        };

        request(app.getHttpServer())
            .post('/receiver')
            .set('Accept', 'application/json')
            .send(receiverToCreate)
            .expect(201);

        request(app.getHttpServer())
            .put('/receiver')
            .set('Accept', 'application/json')
            .send(receiverToUpdate)
            .expect(201);
    });
});
