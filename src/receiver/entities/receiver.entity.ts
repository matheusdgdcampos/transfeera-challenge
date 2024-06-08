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

class Document {
    type: DOCUMENT_TYPE;
    value: string;
}

class PixKey {
    type: PIX_KEY_TYPE;
    value: string;
}

export class Receiver {
    id: string;
    name: string;
    email: string;
    document: Document;
    pixKey: PixKey;
}
