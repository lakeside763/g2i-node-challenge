import { PrismaClient } from '@prisma/client';

class AppService {
  prisma: PrismaClient;

  constructor(prisma: PrismaClient) {
    this.prisma = prisma;
  }
}

export default AppService;
