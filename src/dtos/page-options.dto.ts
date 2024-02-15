import { OrderConstraint } from '../constraint/order.constraint';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsEnum, IsInt, IsNumber, IsOptional } from 'class-validator';

export class PageOptionsDto {
  @ApiPropertyOptional({ enum: OrderConstraint, default: OrderConstraint.ASC })
  @IsOptional()
  @IsEnum(OrderConstraint)
  readonly order: OrderConstraint = OrderConstraint.ASC;

  @ApiPropertyOptional({
    minimum: 1,
    default: 1,
  })
  @IsOptional()
  readonly page?: number = 1;

  @ApiPropertyOptional({
    minimum: 1,
    default: 10,
    maximum: 20,
  })
  @IsOptional()
  readonly take?: number = 10;

  get skip(): number {
    return (this.page - 1) * this.take;
  }
}
