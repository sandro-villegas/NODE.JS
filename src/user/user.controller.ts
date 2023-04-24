import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  NotFoundException,
  UseGuards,
} from '@nestjs/common';
import { ArticlesService } from '../user/user.service';
import { CreateArticleDto } from '../user/dto/create-user.dto';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from './jwt-auth.guard';
import { ApiBearerAuth } from '@nestjs/swagger';
@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly articlesService: ArticlesService) {}

  @Post('register')
  create(@Body() userObject: CreateArticleDto) {
    return this.articlesService.register(userObject);
  }
  @Post('Login')
  login(@Body() userObjectlogin: CreateArticleDto) {
    return this.articlesService.login(userObjectlogin);
  }
  @UseGuards(JwtAuthGuard)
  @Get('extraer')
  findAll() {
    return this.articlesService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const article = await this.articlesService.findOne(+id);
    if (!article) {
      throw new NotFoundException(`Article with ${id} does not exist.`);
    }
    return article;
  }
  /*
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateArticleDto: UpdateArticleDto) {
    return this.articlesService.update(+id, updateArticleDto);
  }*/
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.articlesService.remove(+id);
  }
}
