// src/prisma/prisma.service.ts
import { INestApplication, Injectable } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  async enableShutdownHooks(app: INestApplication) {
    process.on('beforeExit', async () => {
      setTimeout(async () => {
        await app.close();
      }, 1000);
    });
  }
}
