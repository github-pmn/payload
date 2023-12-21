import { Module } from '@nestjs/common';
import { SpyIspService } from './spy-isp.service';
import { SpyIspController } from './spy-isp.controller';
import { SpyIsp } from './entities/spy-isp.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([SpyIsp])],
  controllers: [SpyIspController],
  providers: [SpyIspService],
  exports: [SpyIspService],
})
export class SpyIspModule {}
