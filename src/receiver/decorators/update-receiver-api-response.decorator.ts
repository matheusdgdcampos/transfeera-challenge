import { applyDecorators } from '@nestjs/common';
import { ApiOkResponse, ApiUnprocessableEntityResponse } from '@nestjs/swagger';
import { UpdateReceiverDto } from '../dto/update-receiver.dto';

export const UpdateReceiverApiDocResponses = () =>
    applyDecorators(
        ApiOkResponse({
            type: UpdateReceiverDto,
        }),
        ApiUnprocessableEntityResponse({
            description: 'when not find entity to process informations',
        }),
    );
