import { Test, TestingModule } from '@nestjs/testing';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { LoggerService } from '../logger/logger.service';
import { Role } from '../users/enums/role.enum';
import { UsersDTO } from 'src/users/dto/create-user.dto';

describe('AuthService', () => {
  let authService: AuthService;

  const mockJwtService = {
    sign: jest.fn().mockReturnValue('mockToken'),
  };
  const mockUsersService = {
    findOneByEmail: jest.fn(),
    create: jest.fn(),
  };
  const mockLoggerService = {
    debug: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: JwtService,
          useValue: mockJwtService,
        },
        {
          provide: UsersService,
          useValue: mockUsersService,
        },
        {
          provide: LoggerService,
          useValue: mockLoggerService,
        },
      ],
    }).compile();

    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authService).toBeDefined();
  });

  describe('login', () => {
    it('should return 401 if user is not found', async () => {
      const user = { email: 'test@test.com', password: 'password' };
      mockUsersService.findOneByEmail.mockResolvedValue(null);

      const result = await authService.login(user);

      expect(result).toEqual({ status: 401, msg: 'Invalid credentials' });
      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith('test@test.com');
    });

    it('should return 401 if password is incorrect', async () => {
      const user = { email: 'test@test.com', password: 'password' };
      const userDetails = { password: 'differentPassword' };
      mockUsersService.findOneByEmail.mockResolvedValue(userDetails);

      const result = await authService.login(user);

      expect(result).toEqual({ status: 401, msg: 'Invalid credentials' });
      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith('test@test.com');
    });

    it('should return 200 if login is successful', async () => {
      const user = { email: 'test@test.com', password: 'test1234' };
      const userDetails = { email: 'test@test.com', password: '$2a$10$yOEzt.3J8j.nps4gWU2nOO70tGQVqHHTcSPMvotGSEpidEsX9vtZu' };
      
      mockUsersService.findOneByEmail.mockResolvedValue(userDetails);

      const result = await authService.login(user);

      expect(result).toEqual({
        status: 200,
        msg: {
          email: 'test@test.com',
          access_token: 'mockToken',
        },
      });
      expect(mockUsersService.findOneByEmail).toHaveBeenCalledWith('test@test.com');
    });

    it('should return 400 if DTO validation fails', async () => {
      const user = { email: '', password: '' };

      const result = await authService.login(user);

      expect(result).toEqual({ status: 400, msg: 'Invalid fields.' });
    });
  });

  describe('register', () => {

    it('should return 201 and create a new user', async () => {
      // jest.spyOn(usersService, 'create').mockResolvedValueOnce(undefined);
      const userDTO: UsersDTO = {
        email: 'test@example.com',
        name: 'User',
        password: 'password',
        role: Role.customer,
      };
      mockUsersService.create.mockResolvedValue('');
      const result = await authService.register(userDTO);
      expect(result).toEqual({ status: 201, content: { msg: 'User created with success' } });
    });


    it('should return 400 if user DTO is invalid', async () => {
      const userDTO: UsersDTO = {
        email: '',
        name: '',
        password: '',
        role:  Role.customer
      };
      const result = await authService.register(userDTO);
      expect(result).toEqual({ status: 400, content: { msg: 'Invalid content' } });
    });

  })

})