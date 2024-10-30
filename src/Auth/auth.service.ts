import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService // Inject the UsersService to fetch user details
  ) {}

  async validateToken(token: string): Promise<any> {
    try {
      const tokenPayload = await this.jwtService.verifyAsync(token);
      console.log("dddd");
      console.log(tokenPayload);
      return tokenPayload;
    } catch (error) {
      return null;
    }
  }

  async login(user: any): Promise<{ accessToken: string }> {
    // Use validateUser to find and validate user credentials
    const userFromDb = await this.usersService.validateUser(user.email, user.password);

    if (!userFromDb) {
        throw new UnauthorizedException('Invalid email or password');
    }

    const payload = {
        username: userFromDb.email,
        sub: userFromDb.id,
        roles: userFromDb.roles.map(role => role.name),
    };

    return {
        accessToken: this.jwtService.sign(payload),
    };
}

  
}
