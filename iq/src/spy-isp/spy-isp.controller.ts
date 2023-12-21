import { Controller, Get, Param } from '@nestjs/common';
import { SpyIspService } from './spy-isp.service';

@Controller('spy-isp')
export class SpyIspController {
  constructor(private readonly spyIspService: SpyIspService) {}

  @Get()
  findAll() {
    return this.spyIspService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.spyIspService.findOne(+id);
  }
}
