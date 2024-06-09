import { ApiProperty } from '@nestjs/swagger';

export class DeleteReceiverDto {
    @ApiProperty({
        type: [String],
    })
    ids: string[];
}
