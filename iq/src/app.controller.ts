import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  async sendMsg(@Query('d') d, @Query('msisdn') msisdn): Promise<void> {
    return await this.appService.sendMsg(d, msisdn);
  }

  @Post('/encode')
  async obfuscator(@Body() body): Promise<string> {
    return await this.appService.clObfuscator(body.code);
  }
}
