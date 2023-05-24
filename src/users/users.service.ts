import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { User } from "./users.entity";


@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private usersRepository: Repository<User>,
    ){}
    
    saveUser(username: string, password: string) {
        const user = new User()
        user.username = username;
        user.password = password;
        console.log(`User with name ${user} saved`);
        this.usersRepository.save(user);
    }

    async findOne(username: string) :Promise<User| undefined> {
        return this.usersRepository.findOneBy({ username });
    }
}
