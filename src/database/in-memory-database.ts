import { MongoMemoryServer } from 'mongodb-memory-server';
import { Db, MongoClient } from 'mongodb';

export class InMemoryDatabase {
    private mongod: MongoMemoryServer;

    private mondbClient: MongoClient;

    public db: Db;

    public async connect() {
        this.mongod = await MongoMemoryServer.create();
        this.mondbClient = new MongoClient(this.mongod.getUri());
        this.db = this.mondbClient.db();
    }

    public async disconnect() {
        await this.mongod.stop();
        await this.mondbClient.close();
    }

    public async clearDatabase() {
        await this.db.dropDatabase();
    }
}
