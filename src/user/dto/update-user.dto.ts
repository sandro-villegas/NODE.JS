import { PartialType } from '@nestjs/swagger';
import { CreateArticleDto } from './create-user.dto';
import { UserRole } from '.prisma/client';

export class UpdateArticleDto extends PartialType(CreateArticleDto) {
  role?: { connect: { name: UserRole } };
}
