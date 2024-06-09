import {
    IsEmail,
    IsEnum,
    IsNumberString,
    IsOptional,
    IsString,
    MaxLength,
    ValidateNested,
} from 'class-validator';
import {
    DOCUMENT_TYPE,
    PIX_KEY_TYPE,
    RECEIVER_STATUS,
} from '../entities/receiver.entity';
import { IsValidPixKey } from '@/commons/decorators/is-valid-pix-key.decorator';
import { Type } from 'class-transformer';

class DocumentDto {
    @IsEnum(DOCUMENT_TYPE)
    type: DOCUMENT_TYPE;

    @IsNumberString()
    value: string;
}

class PixKeyDto {
    @IsEnum(PIX_KEY_TYPE)
    type: PIX_KEY_TYPE;

    @IsString()
    @IsValidPixKey('type', {
        message:
            'The PIX key is invalid, the key must follow the key type pattern',
    })
    value: string;
}

export class CreateReceiverDto {
    @IsString()
    name: string;

    @IsEmail()
    @IsOptional()
    @MaxLength(255)
    email: string;

    @ValidateNested()
    @Type(() => DocumentDto)
    document: DocumentDto;

    @ValidateNested()
    @Type(() => PixKeyDto)
    pixKey: PixKeyDto;
}
