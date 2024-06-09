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

@Controller('receiver')
export class ReceiverController {
    constructor(private readonly receiverService: ReceiverService) {}

    @Post()
    async create(@Body() createReceiverDto: CreateReceiverDto) {
        await this.receiverService.create(createReceiverDto);
    }

    @Get()
    async findAll(@Query('page') page: number) {
        return await this.receiverService.findAll(page);
    }

    @Get('search')
    async search(@Query('search') search: string) {
        return await this.receiverService.search(search);
    }

    @Put(':id')
    async update(
        @Param('id') id: string,
        @Body() updateReceiverDto: UpdateReceiverDto,
    ) {
        return await this.receiverService.update(id, updateReceiverDto);
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    async remove(@Body('ids') ids: string[]) {
        return await this.receiverService.remove(ids);
    }
}
