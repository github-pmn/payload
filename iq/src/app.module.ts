import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { HttpModule } from '@nestjs/axios';
import { NestLogsModule } from 'nest-logs';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CrawlCodeModule } from './crawl-code/crawl-code.module';
import { SpyIspModule } from './spy-isp/spy-isp.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: 'ls-5357137a384c0ca7be3b46aebdc432eca8974be1.cclcnr2p2fco.eu-central-1.rds.amazonaws.com',
      port: 3306,
      username: 'usertest',
      password: '126156abc',
      database: 'spy_3200',
      entities: ['entities/*.entity{.ts,.js}'],
      autoLoadEntities: true,
    }),
    HttpModule,
    NestLogsModule,
    CrawlCodeModule,
    SpyIspModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
