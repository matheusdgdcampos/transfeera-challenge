import { PROVIDERS } from '@/commons/enums/providers.enum';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Db, ObjectId } from 'mongodb';
import { Receiver } from '../entities/receiver.entity';
import { CreateReceiverDto } from '../dto/create-receiver.dto';

@Injectable()
export class ReceiverRepository implements OnModuleInit {
    protected logger = new Logger(this.constructor.name);

    constructor(
        @Inject(PROVIDERS.DATABASE_CONNECTION)
        protected connection: Db,
    ) {}

    async onModuleInit() {
        await this.createIndexes();
    }

    public async createIndexes() {
        await this.getCollection().createIndex(
            {
                name: 'text',
                status: 'text',
                'pixKey.value': 'text',
                'pixKey.type': 'text',
            },
            { name: 'search_indexes' },
        );
        this.logger.log(`ReceiverRepository initialize and create indexes`);
    }

    private getCollection() {
        const collection = this.connection.collection('receivers');
        return collection;
    }

    public async findAll(offset?: number): Promise<Receiver[]> {
        const pageSize = 10;
        const skip = offset ?? 1;
        const documents = await this.getCollection()
            .find()
            .limit(pageSize)
            .skip((skip - 1) * pageSize)
            .toArray();
        const receivers: unknown = documents.map((receiver) => {
            const { _id, ...rest } = receiver;
            return {
                ...rest,
                id: _id.toString(),
            };
        });
        return receivers as Receiver[];
    }

    public async count(): Promise<number> {
        const count = await this.getCollection().countDocuments();
        return count;
    }

    public async findByName(name: string): Promise<Receiver | null> {
        const result = await this.getCollection().findOne({
            name,
        });

        if (!result) {
            return null;
        }

        const { _id, ...rest } = result;
        const receiver: unknown = {
            ...rest,
            id: _id.toString(),
        };

        return receiver as Receiver;
    }

    public async create(
        createReceiverDto: CreateReceiverDto,
    ): Promise<Receiver> {
        await this.getCollection().insertOne(createReceiverDto);
        const receiver = await this.findByName(createReceiverDto.name);
        return receiver;
    }

    public async delete(ids: string[]) {
        const parsetIdsToObjectId = ids.map((id) => new ObjectId(id));
        await this.getCollection().deleteMany({
            _id: { $in: parsetIdsToObjectId },
        });
    }

    public async search(search: string): Promise<Receiver[]> {
        const receivers: unknown = await this.getCollection()
            .find({ $text: { $search: search } })
            .toArray();

        return receivers as Receiver[];
    }
}
