import { applyDecorators } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';
import { Receiver } from '../entities/receiver.entity';

export const SearchReceiversApiDocResponses = () =>
    applyDecorators(
        ApiOkResponse({
            description: 'Return receiver search of database',
            type: [Receiver],
        }),
        ApiInternalServerErrorResponse(),
    );
