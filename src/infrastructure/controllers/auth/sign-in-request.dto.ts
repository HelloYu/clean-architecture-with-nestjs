import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsEmail } from 'class-validator';

export class SignInRequestDto {
  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  readonly username: string;

  @ApiProperty({ required: true })
  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
