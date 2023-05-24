import { Injectable, UnauthorizedException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/users.entity";
import { UserService } from "src/users/users.service";
import { Repository } from "typeorm";
import { Post as PostEntity } from "./post.entity";
import { authenticate, unAuthenticateMessage } from './helpers';


@Injectable()
export class PostService {
    constructor(
        @InjectRepository(PostEntity) private postRepository: Repository<PostEntity>,
        private userService: UserService
    ) {}

    async createPost(text: string, userName: string) {
        const post = new PostEntity();
        post.post = text;

        let user: User = await this.userService.findOne(userName)
        post.author = user;
        post.createdTime = new Date();
        post.updatedTime = new Date();
        this.postRepository.save(post);

    }

    async findAllPosts() {
        return this.postRepository.find() ?? [];
    }

    async findOnePost(id: number) {
        return this.postRepository.findOneBy({id})
    }

    async updatePost(postId: number, text: string, userId: number) {
        if (!authenticate(this.postRepository, postId, userId)) {
            return unAuthenticateMessage();
    }
        
        const post = await this.postRepository.findOneBy( {id: postId})
        post.post = text;
        post.updatedTime = new Date();
        
        this.postRepository.save(post);

        return {"data": {"message": `post with id:${postId} is successfully change`}};
    }

    async deletePost(postId: number, userId:number) {
        if (! await authenticate(this.postRepository, postId, userId)) {
            return unAuthenticateMessage();
        }

       await this.postRepository
           .createQueryBuilder('post')
           .delete().from(PostEntity)
           .where("id=:postId", {postId})
           .execute();
    }

}
