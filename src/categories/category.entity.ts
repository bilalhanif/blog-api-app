import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BlogPost } from 'src/blog-posts/blog-post.entity';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ default: '' })
  description: string;

  @OneToMany(() => BlogPost, (post) => post.author)
  blogPosts: BlogPost[];
}
