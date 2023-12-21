import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SpyIsp } from './entities/spy-isp.entity';

@Injectable()
export class SpyIspService {
  constructor(
    @InjectRepository(SpyIsp)
    private readonly spyIspRepository: Repository<SpyIsp>,
  ) {}
  findAll() {
    return this.spyIspRepository.find();
  }

  findOne(id: number) {
    return this.spyIspRepository.findOneBy({ id });
  }
}
