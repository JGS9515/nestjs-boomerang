import { compareSync, hashSync } from 'bcryptjs';
import { Injectable, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersDTO } from 'src/users/dto/create-user.dto';
import { validate } from 'class-validator';
import { LoggerService } from 'src/logger/logger.service';
import { UsersService } from 'src/users/users.service';
import { LogInDTO } from 'src/users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: LoggerService = new Logger(AuthService.name),
    private jwtService: JwtService,
    private userService: UsersService,
  ) { }

  async login(user: any): Promise<Record<string, any>> {
    // Validation Flag
    let isOk = false;

    // Transform body into DTO
    const userDTO = new LogInDTO();
    userDTO.email = user.email;
    userDTO.password = user.password;

    // TODO: Refactor this section with try catch block and return error message in the catch block
    // Validate DTO against validate function from class-validator
    await validate(userDTO).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`${errors}`);
      } else {
        isOk = true;
      }
    });

    if (isOk) {
      // Get user information
      const userDetails = await this.userService.findOneByEmail(user.email);

      // Check if user exists
      if (userDetails == null) {
        return { status: 401, msg: 'Invalid credentials'  };
      }

      // Check if the given password match with saved password
      const isValid = compareSync(user.password, userDetails.password);
      if (isValid) {
        // Generate JWT token
        return {
          status: 200,
          msg: {
            email: user.email,
            access_token: this.jwtService.sign({ email: user.email, role:userDetails.role }),
          },
        };
      } else {
        // Password or email does not match
        return { status: 401, msg: 'Invalid credentials' };
      }
    } else {
      return { status: 400, msg: 'Invalid fields.' };
    }
  }

  async register(body: UsersDTO): Promise<Record<string, any>> {
    // Validation Flag
    let isOk = false;

    // Transform body into DTO
    const userDTO = new UsersDTO();

    userDTO.email = body.email;
    userDTO.name = body.name;
    userDTO.role = body.role;
    userDTO.password = hashSync(body.password, 10);

    // Validate DTO against validate function from class-validator
    await validate(userDTO).then((errors) => {
      if (errors.length > 0) {
        this.logger.debug(`${errors}`);
      } else {
        isOk = true;
      }
    });
    if (isOk) {
      await this.userService.create(userDTO).catch((error) => {
        this.logger.debug(error.message);
        isOk = false;
      });
      if (isOk) {
        return { status: 201, content: { msg: 'User created with success' } };
      } else {
        return { status: 400, content: { msg: 'User already exists' } };
      }
    } else {
      return { status: 400, content: { msg: 'Invalid content' } };
    }
  }
}
