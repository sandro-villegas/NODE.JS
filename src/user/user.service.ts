import { HttpException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateArticleDto } from '../user/dto/create-user.dto'; // should be "create-article.dto"
//import { UpdateArticleDto } from '../user/dto/update-user.dto'; // should be "update-article.dto"
import { UserRole } from '.prisma/client';
import { hash, compare } from 'bcrypt';
import { HttpAdapterHost } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
@Injectable()
export class ArticlesService {
  constructor(
    private prisma: PrismaService,
    private jwtASerivice: JwtService,
  ) {}
  /*
  async create(createArticleDto: CreateArticleDto) {
    return this.prisma.user.create({
      data: {
        ...createArticleDto,
        role: UserRole.ADMINISTRADOR,
      },
    });
  }
*/
  findAll() {
    return this.prisma.user.findMany();
  }

  findOne(id: number) {
    if (isNaN(id)) {
      throw new Error('Invalid argument: id must be a number');
    }
    return this.prisma.user.findUnique({ where: { id } });
  }

  /*
  update(id: number, updateArticleDto: UpdateArticleDto) {
    return this.prisma.user.update({
      where: { id },
      data : updateArticleDto,
    });
  }
  */
  async register(userObject: CreateArticleDto) {
    const { password } = userObject;
    const hashedPassword = await hash(password, 10);

    const data = {
      ...userObject,
      password: hashedPassword,
      role: UserRole.ADMINISTRADOR,
    };

    return this.prisma.user.create({ data });
  }

  async login(userObjectlogin: CreateArticleDto) {
    const { username, password } = userObjectlogin;
    const findUser = await this.prisma.user.findUnique({
      where: {
        username: username,
      },
    });
    const checkPassword = await compare(password, findUser.password);
    console.log(checkPassword);
    if (!checkPassword) throw new HttpException('PASSWORD_INCORECTO', 403);
    const payload = { id: findUser.id, name: findUser.username };
    const token = this.jwtASerivice.sign(payload);
    const data = {
      user: findUser,
      token,
    };
    return data;
  }

  ////
  remove(id: number) {
    return this.prisma.user.delete({ where: { id } });
  }
}
