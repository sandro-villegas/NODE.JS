import { Module } from '@nestjs/common';
import { ArticlesService } from '../user/user.service';
import { UserController } from '../user/user.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { MongooseModule } from '@nestjs/mongoose';
import { jwtConstants } from './jwt-constantes';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';

@Module({
  controllers: [UserController],
  providers: [ArticlesService, JwtStrategy],
  imports: [
    PrismaModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
})
export class UserModule {}
