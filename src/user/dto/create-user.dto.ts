import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty, MinLength } from 'class-validator';
import { UserRole } from '.prisma/client';

export class CreateArticleDto {
  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  @MinLength(5)
  readonly username: string;

  @IsString()
  @ApiProperty()
  @IsNotEmpty()
  readonly password: string;

  @ApiProperty()
  readonly role: { connect: { name: UserRole } };
}
