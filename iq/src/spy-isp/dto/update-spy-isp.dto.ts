import { PartialType } from '@nestjs/mapped-types';
import { CreateSpyIspDto } from './create-spy-isp.dto';

export class UpdateSpyIspDto extends PartialType(CreateSpyIspDto) {}
