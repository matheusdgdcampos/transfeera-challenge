import { ApiResponseProperty } from '@nestjs/swagger';
import { Receiver } from '../entities/receiver.entity';

class Metadata {
    @ApiResponseProperty()
    totalCount: number;

    @ApiResponseProperty()
    totalPages: number;

    @ApiResponseProperty()
    pageSize: number;
}

export class FindAllReceiversResponse {
    @ApiResponseProperty({
        type: Metadata,
    })
    metadata: Metadata;

    @ApiResponseProperty({
        type: [Receiver],
    })
    data: Receiver[];
}
