import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { UserService } from '../../services/user.service';

describe('UserResolver', () => {
  let resolver: UserResolver;
  let userService: UserService;

  const mockUserService = {
    findAll: jest.fn(),
    findOne: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserResolver,
        {
          provide: UserService,
          useValue: mockUserService,
        },
      ],
    }).compile();

    resolver = module.get<UserResolver>(UserResolver);
    userService = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });

  describe('findAll', () => {
    it('should return an array of users', async () => {
      const mockUsers = [
        {
          id: '1',
          email: 'test@example.com',
          firstName: 'John',
          lastName: 'Doe',
          role: 'patient',
        },
      ];

      mockUserService.findAll.mockResolvedValue(mockUsers);

      const result = await resolver.findAll();
      expect(result).toEqual(mockUsers);
      expect(userService.findAll).toHaveBeenCalled();
    });
  });

  describe('findOne', () => {
    it('should return a single user by id', async () => {
      const mockUser = {
        id: '1',
        email: 'test@example.com',
        firstName: 'John',
        lastName: 'Doe',
        role: 'patient',
      };

      mockUserService.findOne.mockResolvedValue(mockUser);

      const result = await resolver.findOne('1');
      expect(result).toEqual(mockUser);
      expect(userService.findOne).toHaveBeenCalledWith('1');
    });
  });

  describe('createUser', () => {
    it('should create a new user', async () => {
      const createUserInput = {
        email: 'new@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'patient' as const,
      };

      const mockUser = { id: '2', ...createUserInput };

      mockUserService.create.mockResolvedValue(mockUser);

      const result = await resolver.createUser(createUserInput);
      expect(result).toEqual(mockUser);
      expect(userService.create).toHaveBeenCalledWith(createUserInput);
    });
  });

  describe('updateUser', () => {
    it('should update an existing user', async () => {
      const updateUserInput = {
        firstName: 'Updated',
        lastName: 'Name',
      };

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        ...updateUserInput,
        role: 'patient',
      };

      mockUserService.update.mockResolvedValue(mockUser);

      const result = await resolver.updateUser('1', updateUserInput);
      expect(result).toEqual(mockUser);
      expect(userService.update).toHaveBeenCalledWith('1', updateUserInput);
    });
  });

  describe('removeUser', () => {
    it('should remove a user', async () => {
      mockUserService.remove.mockResolvedValue(true);

      const result = await resolver.removeUser('1');
      expect(result).toBe(true);
      expect(userService.remove).toHaveBeenCalledWith('1');
    });
  });
});
