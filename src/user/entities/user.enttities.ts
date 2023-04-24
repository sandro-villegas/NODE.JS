import { User } from '@prisma/client';
import { ApiProperty } from '@nestjs/swagger';
enum UserRole {
  ADMIN = 'admin',
  USER = 'user',
}
export class UserEntity {
  @ApiProperty()
  id: number;
  @ApiProperty()
  username: string;
  @ApiProperty()
  password: string;
  @ApiProperty()
  role: UserRole;
}
