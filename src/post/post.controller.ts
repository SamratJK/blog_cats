import { Controller, Get, Post, HttpCode, HttpStatus, UseGuards, Request, Body, Param, ParseIntPipe, Put, Req, Delete} from "@nestjs/common";
import { AuthGaurd } from "src/auth/auth.guard";
import { PostDto } from "./dto/post.dto";
import { PostService } from "./post.service";


@Controller("posts")
export class PostController {
    constructor(private postService: PostService) {}

    @UseGuards(AuthGaurd)
    @HttpCode(HttpStatus.CREATED)
    @Post("create")
    createPost(@Body() postDTO: Record<string, any>, @Request() req) {
        return this.postService.createPost(postDTO.text, req.user.username);
    }

    @Get()
    findAll() {
        return this.postService.findAllPosts();
    }
    
    @UseGuards(AuthGaurd)
    @Get(":id")
    async findOne(@Param('id', ParseIntPipe) id: number) {
        return this.postService.findOnePost(id);
    }

    @UseGuards(AuthGaurd)
    @Put(":id")
    async updatePost(
            @Param('id', ParseIntPipe) id: number,
            @Body() postDto: Record<string, any>, 
            @Request() req) {
        return this.postService.updatePost(id, postDto.text, req.user.sub);
    }


    @UseGuards(AuthGaurd)
    @HttpCode(HttpStatus.ACCEPTED)
    @Delete(":id")
    async deletePost(@Param('id', ParseIntPipe) id: number, @Request() req) {
        return this.postService.deletePost(id, req.user.sub);
    }

}
