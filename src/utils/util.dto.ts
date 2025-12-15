import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsOptional, IsString } from 'class-validator';

export class HttpResponseDto<T = unknown> {
  @IsNumber()
  @ApiProperty({ example: 200 })
  status: number;

  @IsString()
  @ApiProperty({ example: 'Success' })
  message: string;

  data?: T;
}

export class SearchDto {
  @IsOptional()
  @IsString()
  @ApiProperty({ required: false })
  search?: string = '';
}
