import { PIX_KEY_TYPE } from '@/receiver/entities/receiver.entity';
import {
    registerDecorator,
    ValidationOptions,
    ValidationArguments,
} from 'class-validator';

export function IsValidPixKey(
    property: string,
    validationOptions?: ValidationOptions,
) {
    return function (object: unknown, propertyName: string) {
        registerDecorator({
            name: 'isValidPixKey',
            target: object.constructor,
            propertyName: propertyName,
            constraints: [property],
            options: validationOptions,
            validator: {
                validate(value: any, args: ValidationArguments) {
                    const [relatedPropertyName] = args.constraints;
                    const relatedValue = (args.object as any)[
                        relatedPropertyName
                    ];

                    const cpfMatcher =
                        /^[0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}$/;

                    const cnpjMatcher =
                        /^[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2}$/;

                    const emailMatcher = /^[a-z0-9+_.-]+@[a-z0-9.-]+$/;

                    const phoneMatcher =
                        /^((?:\+?55)?)([1-9][0-9])(9[0-9]{8})$/;

                    const randomMatcher =
                        /^[0-9a-f]{8}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{4}-[0-9a-f]{12}$/i;

                    if (relatedValue === PIX_KEY_TYPE.CPF) {
                        return cpfMatcher.test(value);
                    }

                    if (relatedValue === PIX_KEY_TYPE.CNPJ) {
                        return cnpjMatcher.test(value);
                    }

                    if (relatedValue === PIX_KEY_TYPE.EMAIL) {
                        return emailMatcher.test(value);
                    }

                    if (relatedValue === PIX_KEY_TYPE.PHONE) {
                        return phoneMatcher.test(value);
                    }

                    return randomMatcher.test(value);
                },
            },
        });
    };
}
