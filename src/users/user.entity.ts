import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { BlogPost } from 'src/blog-posts/blog-post.entity';
import { Comment } from 'src/comments/comment.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column('simple-array')
  roles: string[];

  @OneToMany(() => BlogPost, (post) => post.author)
  blogPosts: BlogPost[];


  @OneToMany(() => Comment, comment => comment.author)
  comments: Comment[];
}
