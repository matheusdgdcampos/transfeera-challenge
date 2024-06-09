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
    create(@Body() createReceiverDto: CreateReceiverDto) {
        return this.receiverService.create(createReceiverDto);
    }

    @Get()
    findAll(@Query('page') page: number) {
        return this.receiverService.findAll(page);
    }

    @Get('search')
    search(@Query('search') search: string) {
        return this.receiverService.search(search);
    }

    @Put(':id')
    update(
        @Param('id') id: string,
        @Body() updateReceiverDto: UpdateReceiverDto,
    ) {
        return this.receiverService.update(+id, updateReceiverDto);
    }

    @Delete()
    @HttpCode(HttpStatus.NO_CONTENT)
    remove(@Body('ids') ids: string[]) {
        return this.receiverService.remove(ids);
    }
}
