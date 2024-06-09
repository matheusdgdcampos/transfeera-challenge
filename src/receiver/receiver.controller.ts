import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    Delete,
    Query,
    HttpCode,
    HttpStatus,
    Put,
} from '@nestjs/common';
import { ReceiverService } from './receiver.service';
import { CreateReceiverDto } from './dto/create-receiver.dto';
import { UpdateReceiverDto } from './dto/update-receiver.dto';
import { CreateReceiverApiDocResponses } from './decorators/create-receiver-api-response.decorator';
import { FindAllReceiversApiDocResponses } from './decorators/find-all-receivers-api-response.decorator';
import { SearchReceiversApiDocResponses } from './decorators/search-receiver-api-response.decorator';
import { UpdateReceiverApiDocResponses } from './decorators/update-receiver-api-response.decorator';
import { ApiTags } from '@nestjs/swagger';
import { DeleteReceiversApiDocResponses } from './decorators/delete-receivers-api-responses.decorator';
import { DeleteReceiverDto } from './dto/delete-receiver.dto';

@Controller('receiver')
@ApiTags('Receivers')
export class ReceiverController {
    constructor(private readonly receiverService: ReceiverService) {}

    @Post()
    @CreateReceiverApiDocResponses()
    async create(@Body() createReceiverDto: CreateReceiverDto) {
        await this.receiverService.create(createReceiverDto);
    }

    @Get()
    @FindAllReceiversApiDocResponses()
    async findAll(@Query('page') page: number) {
        return await this.receiverService.findAll(page);
    }

    @Get('search')
    @SearchReceiversApiDocResponses()
    async search(@Query('search') search: string) {
        return await this.receiverService.search(search);
    }

    @Put(':id')
    @UpdateReceiverApiDocResponses()
    async update(
        @Param('id') id: string,
        @Body() updateReceiverDto: UpdateReceiverDto,
    ) {
        return await this.receiverService.update(id, updateReceiverDto);
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    @DeleteReceiversApiDocResponses()
    async remove(@Body() body: DeleteReceiverDto) {
        return await this.receiverService.remove(body.ids);
    }
}
