import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from 'src/users/users.module';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';

@Module({
    imports: [
        UsersModule,
        ConfigModule.forRoot(),
        JwtModule.register({
            global: true,
            secret:process.env.JWTSECRET, 
            signOptions: {expiresIn: '30m'}
        })
    ],
    controllers: [AuthController],
    providers: [AuthService]
})
export class AuthModule {}

