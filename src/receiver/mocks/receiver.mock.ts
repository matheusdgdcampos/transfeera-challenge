import { faker } from '@faker-js/faker';
import { DOCUMENT_TYPE, PIX_KEY_TYPE } from '../entities/receiver.entity';
import { CreateReceiverDto } from '../dto/create-receiver.dto';

function getRandomEnum<T = any>(enumObj: T): T[keyof T] {
    const objectValues = Object.values(enumObj);
    const index = Math.floor(Math.random() * objectValues.length);
    return objectValues[index];
}

export const createReceiverMock = (): CreateReceiverDto => {
    const documentType = getRandomEnum(DOCUMENT_TYPE);
    const cpf = faker.helpers.fromRegExp(
        /^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/,
    );
    const cnpj = faker.helpers.fromRegExp(
        /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/,
    );
    const documentValue = documentType === DOCUMENT_TYPE.CPF ? cpf : cnpj;
    const pixKeyType = getRandomEnum(PIX_KEY_TYPE);
    let pixKeyValue: string;

    switch (pixKeyType) {
        case PIX_KEY_TYPE.CNPJ:
            pixKeyValue = cnpj;
            break;

        case PIX_KEY_TYPE.CPF:
            pixKeyValue = cpf;
            break;

        case PIX_KEY_TYPE.EMAIL:
            pixKeyValue = faker.internet.email();
            break;

        case PIX_KEY_TYPE.PHONE:
            pixKeyValue = faker.helpers.fromRegExp(
                /^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/,
            );
            break;

        case PIX_KEY_TYPE.RANDOM:
            pixKeyValue = faker.helpers.fromRegExp(
                /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i,
            );
            break;
        default:
            break;
    }

    return {
        name: faker.person.fullName(),
        email: faker.internet.email(),
        document: {
            type: getRandomEnum(DOCUMENT_TYPE),
            value: documentValue,
        },
        pixKey: {
            type: pixKeyType,
            value: pixKeyValue,
        },
    };
};
