/* eslint-disable @typescript-eslint/no-unsafe-call */
import { ApiProperty } from '@nestjs/swagger';
import { IsNumber, IsString } from 'class-validator';

export class HttpResponseDto {
  @IsNumber()
  @ApiProperty({ example: 200 })
  status: number;

  @IsString()
  @ApiProperty({ example: 'Success' })
  message: string;

  data?: any;
}
