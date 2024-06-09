import { PROVIDERS } from '@/commons/enums/providers.enum';
import { Inject, Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { Db } from 'mongodb';
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
        const [nameIndex, statusIndex, pixKeyTypeIndex, pixKeyValueIndex] =
            await Promise.all([
                this.getCollection().createIndex(
                    {
                        name: 1,
                    },
                    { name: 'name_index' },
                ),
                this.getCollection().createIndex(
                    {
                        status: 1,
                    },
                    { name: 'status_index' },
                ),
                this.getCollection().createIndex(
                    {
                        'pixKey.type': 1,
                    },
                    { name: 'pix_key_type_index' },
                ),
                this.getCollection().createIndex(
                    {
                        'pixKey.value': 1,
                    },
                    { name: 'pix_key_value_index' },
                ),
            ]);
        this.logger.log(
            `ReceiverRepository initialize and create indexes: [${nameIndex}, ${statusIndex}, ${pixKeyTypeIndex}, ${pixKeyValueIndex}]`,
        );
    }

    private getCollection() {
        const collection = this.connection.collection('receivers');
        return collection;
    }

    public async findAll(): Promise<Receiver[]> {
        const documents = await this.getCollection().find().toArray();
        const receivers: unknown = documents.map((receiver) => ({
            ...receiver,
            id: receiver._id.toString(),
        }));
        return receivers as Receiver[];
    }

    public async count(): Promise<number> {
        const count = await this.getCollection().countDocuments();
        return count;
    }

    public async create(createReceiverDto: CreateReceiverDto) {
        await this.getCollection().insertOne(createReceiverDto);
    }
}
