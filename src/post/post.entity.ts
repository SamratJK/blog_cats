import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from '../users/users.entity';


@Entity()
export class Post {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    post: string;

    @Column()
    createdTime: Date;

    @Column()
    updatedTime: Date;

    @ManyToOne(()=> User, (user) => user.posts )
    author: User;

    @OneToMany(() => Comment, (comment) => comment.post)
    comments: Comment[];
}


@Entity()
export class Comment {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    comment: string;

    @ManyToOne(()=> Post, (post) => post.comments)
    post: Post;

    @ManyToOne(() => User, (user) => user.comments)
    author: User;
}
