import { applyDecorators } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiCreatedResponse,
    ApiInternalServerErrorResponse,
} from '@nestjs/swagger';

export const CreateReceiverApiDocResponses = () =>
    applyDecorators(
        ApiBadRequestResponse({
            description: 'invalid informations',
        }),
        ApiCreatedResponse({
            description: 'When receiver created with success',
        }),
        ApiInternalServerErrorResponse(),
    );
