import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { UsersModule } from "src/users/users.module";
import { PostController } from "./post.controller";
import { Comment, Post } from "./post.entity"  
import { PostService } from "./post.service"

@Module({
    imports: [TypeOrmModule.forFeature([Post, Comment]), UsersModule],
    controllers: [PostController],
    providers: [PostService]
})
export class PostModule {}

