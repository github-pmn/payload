import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { CrawlCodeService } from './crawl-code.service';
import { CreateCrawlCodeDto } from './dto/create-crawl-code.dto';
import { UpdateCrawlCodeDto } from './dto/update-crawl-code.dto';

@Controller('crawl-code')
export class CrawlCodeController {
  constructor(private readonly crawlCodeService: CrawlCodeService) {}

  @Post()
  create(@Body() createCrawlCodeDto: CreateCrawlCodeDto) {
    return this.crawlCodeService.create(createCrawlCodeDto);
  }

  @Get()
  findAll(@Query() updateCrawlCodeDto: UpdateCrawlCodeDto) {
    return this.crawlCodeService.findAll(updateCrawlCodeDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.crawlCodeService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateCrawlCodeDto: UpdateCrawlCodeDto,
  ) {
    return this.crawlCodeService.update(+id, updateCrawlCodeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.crawlCodeService.remove(+id);
  }
}
