import { applyDecorators } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { Receiver } from '../entities/receiver.entity';

export const FindAllReceiversApiDocResponses = () =>
    applyDecorators(
        ApiOkResponse({
            description: 'Return list of receivers in database',
            type: [Receiver],
        }),
        ApiInternalServerErrorResponse(),
    );
