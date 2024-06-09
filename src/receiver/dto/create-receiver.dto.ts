import {
    IsEmail,
    IsEnum,
    IsNumberString,
    IsOptional,
    IsString,
    MaxLength,
    ValidateNested,
} from 'class-validator';
import { DOCUMENT_TYPE, PIX_KEY_TYPE } from '../entities/receiver.entity';
import { IsValidPixKey } from '@/commons/decorators/is-valid-pix-key.decorator';
import { Type } from 'class-transformer';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

class DocumentDto {
    @IsEnum(DOCUMENT_TYPE)
    @ApiProperty({
        enum: DOCUMENT_TYPE,
    })
    type: DOCUMENT_TYPE;

    @IsNumberString()
    @ApiProperty()
    value: string;
}

class PixKeyDto {
    @IsEnum(PIX_KEY_TYPE)
    @ApiProperty({
        enum: PIX_KEY_TYPE,
    })
    type: PIX_KEY_TYPE;

    @IsString()
    @IsValidPixKey('type', {
        message:
            'The PIX key is invalid, the key must follow the key type pattern',
    })
    @ApiProperty()
    value: string;
}

export class CreateReceiverDto {
    @IsString()
    @ApiProperty()
    name: string;

    @IsEmail()
    @IsOptional()
    @MaxLength(255)
    @ApiPropertyOptional()
    email?: string;

    @ValidateNested()
    @Type(() => DocumentDto)
    @ApiProperty({
        type: DocumentDto,
    })
    document: DocumentDto;

    @ValidateNested()
    @Type(() => PixKeyDto)
    @ApiProperty({
        type: PixKeyDto,
    })
    pixKey: PixKeyDto;
}
