import { Injectable } from '@nestjs/common';
import { Repository, UpdateResult, DeleteResult } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Article } from './article.entity';

@Injectable()
export class ArticleService {
  constructor(
    @InjectRepository(Article)
    private articleRepository: Repository<Article>,
  ) {}

  async findAll(): Promise<Article[]> {
    return await this.articleRepository.find();
  }

  async create(article: Article): Promise<Article> {
    return await this.articleRepository.save(article);
  }

  async update(article: Article): Promise<UpdateResult> {
    return await this.articleRepository.update(article.id, article);
  }

  async delete(id): Promise<DeleteResult> {
    return await this.articleRepository.delete(id);
  }

  async findOne(id): Promise<Article> {
    return await this.articleRepository.findOne(id);
  }
}
