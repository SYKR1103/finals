import { PageMetasInterface } from '../interfaces/pageMetas.interface';
import { ApiProperty } from '@nestjs/swagger';

export class PageMetaDto {
  @ApiProperty()
  readonly page: number;

  @ApiProperty()
  readonly take: number;

  @ApiProperty()
  readonly itemCount: number;

  @ApiProperty()
  readonly pageCount: number;

  @ApiProperty()
  readonly hasPrevious: boolean;

  @ApiProperty()
  readonly hasNext: boolean;

  constructor({ pageOptionDto, itemCount }: PageMetasInterface) {
    this.page = pageOptionDto.page;
    this.take = pageOptionDto.take;
    this.itemCount = itemCount;
    this.pageCount = Math.ceil(this.itemCount / this.take);
    this.hasPrevious = this.page > 1;
    this.hasNext = this.page < this.pageCount;
  }
}
