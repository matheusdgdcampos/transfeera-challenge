import { ApiResponseProperty } from '@nestjs/swagger';

export enum DOCUMENT_TYPE {
    CPF = 'CPF',
    CNPJ = 'CNPJ',
}

export enum PIX_KEY_TYPE {
    CPF = 'CPF',
    CNPJ = 'CNPJ',
    EMAIL = 'EMAIL',
    PHONE = 'PHONE',
    RANDOM = 'RANDOM',
}

export enum RECEIVER_STATUS {
    VALIDATED = 'VALIDATED',
    DRAFT = 'DRAFT',
}

class Document {
    @ApiResponseProperty({
        enum: DOCUMENT_TYPE,
    })
    type: DOCUMENT_TYPE;

    @ApiResponseProperty()
    value: string;
}

class PixKey {
    @ApiResponseProperty({
        enum: PIX_KEY_TYPE,
    })
    type: PIX_KEY_TYPE;

    @ApiResponseProperty()
    value: string;
}

export class Receiver {
    @ApiResponseProperty()
    id: string;

    @ApiResponseProperty()
    name: string;

    @ApiResponseProperty()
    email: string;

    @ApiResponseProperty({
        enum: RECEIVER_STATUS,
    })
    status: RECEIVER_STATUS;

    @ApiResponseProperty({
        type: Document,
    })
    document: Document;

    @ApiResponseProperty({
        type: PixKey,
    })
    pixKey: PixKey;
}
