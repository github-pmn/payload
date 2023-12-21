import { Injectable } from '@nestjs/common';
import { CreateCrawlCodeDto } from './dto/create-crawl-code.dto';
import { UpdateCrawlCodeDto } from './dto/update-crawl-code.dto';
import { SpyIspService } from '../spy-isp/spy-isp.service';
import { firstValueFrom } from 'rxjs';
import { HttpService } from '@nestjs/axios';
import { Repository } from 'typeorm';
import { CrawlCode } from './entities/crawl-code.entity';
import { InjectRepository } from '@nestjs/typeorm';
import dayjs from 'dayjs';

function getCurrentTime() {
  return dayjs().format('YYYY-MM-DD HH:mm:ss');
}

@Injectable()
export class CrawlCodeService {
  constructor(
    private readonly spyIspService: SpyIspService,
    private readonly httpService: HttpService,
    @InjectRepository(CrawlCode)
    private crawlCodeRepository: Repository<CrawlCode>,
  ) {}

  async create(createCrawlCodeDto: CreateCrawlCodeDto) {
    const spyList = await this.spyIspService.findAll();
    const countryList = spyList.map(({ country }) => country.toUpperCase());
    const countryIspList = spyList.map(
      ({ country, isp }) => country.toUpperCase() + isp.substring(0, 1),
    );
    const targetList = [...countryList, ...countryIspList];
    const urls = targetList.map(
      (e) =>
        `http://www.gotojob.vip:3200/javascripts/_${e}_.${createCrawlCodeDto.hash}.js`,
    );
    for (const url of [...new Set(urls)]) {
      firstValueFrom(this.httpService.get(url))
        .then((res) => {
          const code = res.data;
          firstValueFrom(
            this.httpService.post('http://celsius.icu:3000/api', {
              code: res.data,
            }),
          )
            .then((res) => {
              this.crawlCodeRepository.save({
                encode: code,
                decode: res.data,
                url,
                createTime: getCurrentTime(),
                updateTime: getCurrentTime(),
              });
              console.log('新增成功');
            })
            .catch((erroe) => {
              console.log('解码失败', erroe);
            });
        })
        .catch(() => {
          console.log('获取源码失败');
        });
      // console.log(error.response?.data);
    }
    return 'This action adds a new crawlCode';
  }

  async findAll(updateCrawlCodeDto) {
    const data = await this.crawlCodeRepository.find({
      where: updateCrawlCodeDto,
    });
    return {
      data,
      total: data.length,
      success: true,
      pageSize: data.length,
      current: 1,
    };
  }

  findOne(id: number) {
    return `This action returns a #${id} crawlCode`;
  }

  async update(id: number, updateCrawlCodeDto: UpdateCrawlCodeDto) {
    return await this.crawlCodeRepository
      .createQueryBuilder()
      .update({ id: id })
      .set({
        useful: updateCrawlCodeDto.useful,
        note: updateCrawlCodeDto.note,
      })
      .where('id = :id', { id: id })
      .execute();
  }

  remove(id: number) {
    return `This action removes a #${id} crawlCode`;
  }
}
