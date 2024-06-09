import { applyDecorators } from '@nestjs/common';
import { ApiInternalServerErrorResponse, ApiOkResponse } from '@nestjs/swagger';

export const DeleteReceiversApiDocResponses = () =>
    applyDecorators(ApiOkResponse(), ApiInternalServerErrorResponse());
