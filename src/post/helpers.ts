import { Repository } from "typeorm";
import { Post } from "./post.entity";


const authenticate = async function (repository: Repository<Post>, 
                                    postId: number, 
                                    authorId: number) {

    const post = await repository.createQueryBuilder("post")
        .where("post.id= :id", {"id": postId})
        .leftJoinAndSelect("post.author", "author")
        .getOne();
    
    return post.author.id === authorId;
}

const unAuthenticateMessage = () => ({"error": {"message": "Unauthorized user"}} )

export { authenticate, unAuthenticateMessage };
