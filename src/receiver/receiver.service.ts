import {
    BadRequestException,
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
import { PIX_KEY_TYPE } from './entities/receiver.entity';

@Injectable()
export class ReceiverService {
    protected logger = new Logger(this.constructor.name);

    constructor(
        protected receiverRepository: ReceiverRepository,
        @Inject(CACHE_MANAGER)
        protected cacheManager: Cache,
    ) {}

    private checkIfValidePixKey(
        keyType: PIX_KEY_TYPE,
        keyValue: string,
    ): boolean {
        let matcher: RegExp;
        switch (keyType) {
            case PIX_KEY_TYPE.CNPJ:
                matcher =
                    /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/;
                return matcher.test(keyValue);

            case PIX_KEY_TYPE.CPF:
                matcher = /^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/;
                return matcher.test(keyValue);

            case PIX_KEY_TYPE.EMAIL:
                matcher = /^[a-z0-9+_.-]+@[a-z0-9.-]+$/;
                return matcher.test(keyValue);

            case PIX_KEY_TYPE.PHONE:
                matcher = /^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/;
                return matcher.test(keyValue);

            case PIX_KEY_TYPE.RANDOM:
                matcher =
                    /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;
                return matcher.test(keyValue);

            default:
                return false;
        }
    }

    public async create(createReceiverDto: CreateReceiverDto) {
        try {
            if (
                this.checkIfValidePixKey(
                    createReceiverDto.pixKey.type,
                    createReceiverDto.pixKey.value,
                )
            ) {
                this.logger.log(
                    `No possible register receiver with PIX_KEY_TYPE[${createReceiverDto.pixKey.type}] and PIX_KEY_VALUE[${createReceiverDto.pixKey.value}]`,
                );
                throw new BadRequestException({
                    statusCode: 400,
                    message: 'Pix key value must be a type PIX key type',
                });
            }

            await this.receiverRepository.create(createReceiverDto);
        } catch (error) {
            this.logger.error(error);
            throw error;
        }
    }

    async findAll(): Promise<FindAllReceiversResponse> {
        try {
            const result = await this.receiverRepository.findAll();
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

    remove(id: number) {
        return `This action removes a #${id} receiver`;
    }
}
