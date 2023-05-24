import { 
    Body, 
    Controller, 
    Get, 
    HttpCode, 
    HttpStatus, 
    Post, 
    Request, 
    UseGuards 
} from "@nestjs/common";

import { AuthGaurd } from "./auth.guard";
import { AuthService } from "./auth.service";


@Controller("auth")
export class AuthController {
    constructor(private authService: AuthService) {}
    
    @HttpCode(HttpStatus.CREATED)
    @Post("signup")
    signup(@Body() signInDto: Record<string, any>) {
        return this.authService.signUp(signInDto.username, signInDto.password);
    }

    @HttpCode(HttpStatus.OK)
    @Post("login")
    login(@Body() signInDto: Record<string, any>){
        return this.authService.signIn(signInDto.username, signInDto.password);
    }

    @UseGuards(AuthGaurd)
    @Get("profile")
    getProfile(@Request() req) {
        return req.user;
    }
}
