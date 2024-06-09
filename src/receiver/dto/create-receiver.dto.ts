import {
    IsEmail,
    IsEnum,
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

class DocumentDto {
    @IsEnum(DOCUMENT_TYPE)
    type: DOCUMENT_TYPE;

    @IsString()
    value: string;
}

class PixKeyDto {
    @IsEnum(PIX_KEY_TYPE)
    type: PIX_KEY_TYPE;

    @IsString()
    value: string;
}

export class CreateReceiverDto {
    @IsString()
    name: string;

    @IsEmail()
    @IsOptional()
    @MaxLength(255)
    email: string;

    @IsEnum(RECEIVER_STATUS)
    @IsOptional()
    status?: RECEIVER_STATUS = RECEIVER_STATUS.DRAFT;

    @ValidateNested()
    document: DocumentDto;

    @ValidateNested()
    pixKey: PixKeyDto;
}
