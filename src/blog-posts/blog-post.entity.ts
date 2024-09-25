import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, OneToMany } from 'typeorm';
import { User } from 'src/users/user.entity'; // Assuming you have a User entity
import { Comment } from 'src/comments/comment.entity';
import { Category } from 'src/categories/category.entity';

@Entity()
export class BlogPost {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.blogPosts, { onDelete: 'CASCADE' })
  author: User;

  @OneToMany(() => Comment, comment => comment.blogPosts)
  comments: Comment[];

  @ManyToOne(() => Category, category => category.blogPosts)
  category: Category[];
}
