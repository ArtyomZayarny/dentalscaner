import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserService } from './user.service';
import { User } from '../entities/user.entity';

describe('UserService', () => {
  let service: UserService;
  let repository: Repository<User>;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
    delete: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UserService,
        {
          provide: getRepositoryToken(User),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
    repository = module.get<Repository<User>>(getRepositoryToken(User));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
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

      mockRepository.find.mockResolvedValue(mockUsers);

      const result = await service.findAll();
      expect(result).toEqual(mockUsers);
      expect(repository.find).toHaveBeenCalled();
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

      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.findOne('1');
      expect(result).toEqual(mockUser);
      expect(repository.findOne).toHaveBeenCalledWith({ where: { id: '1' } });
    });

    it('should return null if user not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne('999');
      expect(result).toBeNull();
    });
  });

  describe('create', () => {
    it('should create a new user', async () => {
      const createUserDto = {
        email: 'new@example.com',
        firstName: 'Jane',
        lastName: 'Smith',
        role: 'patient' as const,
      };

      const mockUser = { id: '2', ...createUserDto };

      mockRepository.create.mockReturnValue(mockUser);
      mockRepository.save.mockResolvedValue(mockUser);

      const result = await service.create(createUserDto);
      expect(result).toEqual(mockUser);
      expect(repository.create).toHaveBeenCalledWith(createUserDto);
      expect(repository.save).toHaveBeenCalledWith(mockUser);
    });
  });

  describe('update', () => {
    it('should update an existing user', async () => {
      const updateUserDto = {
        firstName: 'Updated',
        lastName: 'Name',
      };

      const mockUser = {
        id: '1',
        email: 'test@example.com',
        ...updateUserDto,
        role: 'patient',
      };

      mockRepository.update.mockResolvedValue({ affected: 1 });
      mockRepository.findOne.mockResolvedValue(mockUser);

      const result = await service.update('1', updateUserDto);
      expect(result).toEqual(mockUser);
      expect(repository.update).toHaveBeenCalledWith('1', updateUserDto);
    });

    it('should return null if user not found for update', async () => {
      const updateUserDto = { firstName: 'Updated' };

      mockRepository.update.mockResolvedValue({ affected: 0 });

      const result = await service.update('999', updateUserDto);
      expect(result).toBeNull();
    });
  });

  describe('remove', () => {
    it('should remove a user', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 1 });

      const result = await service.remove('1');
      expect(result).toBe(true);
      expect(repository.delete).toHaveBeenCalledWith('1');
    });

    it('should return false if user not found for removal', async () => {
      mockRepository.delete.mockResolvedValue({ affected: 0 });

      const result = await service.remove('999');
      expect(result).toBe(false);
    });
  });
});
