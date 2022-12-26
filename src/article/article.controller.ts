import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Request,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { Article } from './article.entity';
import { ArticleService } from './article.service';

@Controller('article')
export class ArticleController {
  constructor(private articleServive: ArticleService) {}

  @UseGuards(JwtAuthGuard)
  @Get()
  index(): Promise<Article[]> {
    return this.articleServive.findAll();
  }

  @UseGuards(JwtAuthGuard)
  @Post('create')
  async create(@Body() articleData: Article): Promise<any> {
    return this.articleServive.create(articleData);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id/update')
  async update(@Param('id') id, @Body() articleData: Article): Promise<any> {
    articleData.id = Number(id);
    return this.articleServive.update(articleData);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id/delete')
  async delete(@Param('id') id): Promise<any> {
    return this.articleServive.delete(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':id')
  async read(
    @Param('id') id,
    @Body() articleData: Article,
    @Request() req,
  ): Promise<any> {
    articleData.id = Number(id);
    const art = this.articleServive.findOne(id);
    console.log(art);
    articleData.readers = req.user.username;
    return this.articleServive.update(articleData);
  }
}
