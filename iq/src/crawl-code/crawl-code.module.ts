import { Module } from '@nestjs/common';
import { CrawlCodeService } from './crawl-code.service';
import { CrawlCodeController } from './crawl-code.controller';
import { SpyIspModule } from '../spy-isp/spy-isp.module';
import { HttpModule } from '@nestjs/axios';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrawlCode } from './entities/crawl-code.entity';

@Module({
  imports: [TypeOrmModule.forFeature([CrawlCode]), HttpModule, SpyIspModule],
  controllers: [CrawlCodeController],
  providers: [CrawlCodeService],
})
export class CrawlCodeModule {}
