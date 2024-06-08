import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

enum DOCUMENT_TYPE {
    CPF = 'CPF',
    CNPJ = 'CNPJ',
}

enum PIX_KEY_TYPE {
    CPF = 'CPF',
    CNPJ = 'CNPJ',
    EMAIL = 'EMAIL',
    RANDOM = 'RANDOM',
}

class Document {
    @Prop({ index: true })
    type: DOCUMENT_TYPE;

    @Prop({ index: true })
    value: string;
}

class PixKey {
    @Prop()
    type: PIX_KEY_TYPE;

    @Prop()
    value: string;
}

@Schema()
export class Receiver {
    @Prop()
    name: string;

    @Prop()
    email: string;

    @Prop()
    document: Document;

    @Prop()
    pixKey: PixKey;
}

export type ReceiverDocument = HydratedDocument<Receiver>;

export const ReceiverSchema = SchemaFactory.createForClass(Receiver);
