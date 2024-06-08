const { faker } = require('@faker-js/faker');

const PIX_KEY_TYPE = {
    CPF: 'CPF',
    CNPJ: 'CNPJ',
    EMAIL: 'EMAIL',
    PHONE: 'PHONE',
    RANDOM: 'RANDOM',
};

const RECEIVER_STATUS = {
    VALIDATED: 'VALIDATED',
    DRAFT: 'DRAFT',
};

const DOCUMENT_TYPE = {
    CPF: 'CPF',
    CNPJ: 'CNPJ',
};

function getRandomEnum(enumObj) {
    const objectValues = Object.values(enumObj);
    const index = Math.floor(Math.random() * objectValues.length);
    return objectValues[index];
}

const createReceiverMock = () => {
    const documentType = getRandomEnum(DOCUMENT_TYPE);
    const cpf = faker.string.numeric({ length: { min: 11, max: 11 } });
    const cnpj = faker.string.numeric({ length: { min: 14, max: 14 } });
    const documentValue = documentType === DOCUMENT_TYPE.CPF ? cpf : cnpj;
    const pixKeyType = getRandomEnum(PIX_KEY_TYPE);
    let pixKeyValue;

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
            pixKeyValue = faker.phone.number();
            break;

        case PIX_KEY_TYPE.RANDOM:
            pixKeyValue = faker.string.alphanumeric(32);
            break;
        default:
            break;
    }

    return {
        id: faker.database.mongodbObjectId(),
        name: faker.person.fullName(),
        status: getRandomEnum(RECEIVER_STATUS),
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

const receivers = [
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
    createReceiverMock(),
];

module.exports = { receivers }
