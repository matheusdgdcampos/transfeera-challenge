import { Module } from '@nestjs/common';
import { ReceiverService } from './receiver.service';
import { ReceiverController } from './receiver.controller';
import { DatabaseModule } from '@/database/database.module';
import { ReceiverRepository } from './repository/receiver.repository';

@Module({
    imports: [DatabaseModule],
    controllers: [ReceiverController],
    providers: [ReceiverService, ReceiverRepository],
})
export class ReceiverModule {}
