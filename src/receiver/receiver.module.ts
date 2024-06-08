import { Module } from '@nestjs/common';
import { ReceiverService } from './receiver.service';
import { ReceiverController } from './receiver.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Receiver, ReceiverSchema } from './entities/receiver.entity';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: Receiver.name, schema: ReceiverSchema },
        ]),
    ],
    controllers: [ReceiverController],
    providers: [ReceiverService],
})
export class ReceiverModule {}
