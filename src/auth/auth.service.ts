import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService
    ) {}

    async signIn(username: string, pass: string) {
        let user = await this.userService.findOne(username);

            if (user?.password !== pass) {
                throw new UnauthorizedException();
            }

        const payload = {username: user.username, sub: user.id}

        return {access_token: await this.jwtService.signAsync(payload)};
    }

    async signUp(username: string, pass: string) {
        this.userService.saveUser(username, pass);

        return "success";
    }
}
