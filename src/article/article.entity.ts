import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ default: '' })
  picture: string;

  @Column()
  author: string;

  @Column()
  content: string;

  @Column({ default: '' })
  readers: string;
}
