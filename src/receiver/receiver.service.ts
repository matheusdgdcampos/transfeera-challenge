import {
    Inject,
    Injectable,
    Logger,
    UnprocessableEntityException,
} from '@nestjs/common';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';
import { ReceiverRepository } from './repository/receiver.repository';
import { FindAllReceiversResponse } from './dto/find-all-receivers-response.dto';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { CACHE } from '@/commons/enums/cache.enum';

@Injectable()
export class ReceiverService {
    protected logger = new Logger(this.constructor.name);

    constructor(
        protected receiverRepository: ReceiverRepository,
        @Inject(CACHE_MANAGER)
        protected cacheManager: Cache,
    ) {}

    public async create(createReceiverDto: CreateReceiverDto) {
        try {
            const receiver =
                await this.receiverRepository.create(createReceiverDto);
            return receiver;
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async findAll(page?: number): Promise<FindAllReceiversResponse> {
        try {
            const result = await this.receiverRepository.findAll(page);
            let totalCount = await this.cacheManager.get<number>(
                CACHE.RECEIVERS_TOTAL_COUNT,
            );

            if (totalCount) {
                return {
                    metadata: {
                        totalCount,
                        pageSize: result.length === 0 ? 0 : 10,
                        totalPages: Math.floor(totalCount / 10),
                    },
                    data: result,
                };
            }

            totalCount = await this.receiverRepository.count();
            const fifteenSecondsTtl = 15000;
            await this.cacheManager.set(
                CACHE.RECEIVERS_TOTAL_COUNT,
                totalCount,
                fifteenSecondsTtl,
            );

            return {
                metadata: {
                    totalCount,
                    pageSize: result.length === 0 ? 0 : 10,
                    totalPages: Math.floor(totalCount / 10),
                },
                data: result,
            };
        } catch (error) {
            this.logger.error(error);
            throw new UnprocessableEntityException();
        }
    }

    findOne(id: number) {
        return `This action returns a #${id} receiver`;
    }

    update(id: number, updateReceiverDto: UpdateReceiverDto) {
        return `This action updates a #${id} receiver`;
    }

    async remove(ids: string[]) {
        try {
            await this.receiverRepository.delete(ids);
        } catch (error) {
            this.logger.error(error);
            throw new UnprocessableEntityException();
        }
    }
}
