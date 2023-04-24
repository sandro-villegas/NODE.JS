import {
  Module,
  NestModule,
  MiddlewareConsumer,
  RequestMethod,
} from '@nestjs/common';
//
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from './prisma/prisma.module';
//
import { ArticlesModule } from './articles/articles.module';
import { UserModule } from './user/user.module';
import { LoggerMiddleware } from './mi-middleware/mi-middleware.middleware';

@Module({
  imports: [PrismaModule, ArticlesModule, UserModule],
  controllers: [AppController],
  providers: [AppService],
})

//export class AppModule {}
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(() => new LoggerMiddleware())
      .forRoutes({ path: 'Login', method: RequestMethod.POST });
  }
}
/*
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
*/
