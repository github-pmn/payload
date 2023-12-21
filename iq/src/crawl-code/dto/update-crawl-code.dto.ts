import { Transform } from 'class-transformer';

export class UpdateCrawlCodeDto {
  @Transform(({ value }) => JSON.parse(value))
  useful?: boolean;

  note?: string;
}
