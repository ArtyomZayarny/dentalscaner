import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user.entity';
import { CreateUserInput, UpdateUserInput } from '../inputs/user.input';
import { LoginResponse, GoogleLoginResponse } from '../types/user.type';

@Resolver(() => User)
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Query(() => [User], { name: 'users' })
  async findAll() {
    return this.userService.findAll();
  }

  @Query(() => User, { name: 'user' })
  async findOne(@Args('id', { type: () => String }) id: string) {
    return this.userService.findOne(id);
  }

  @Mutation(() => User)
  async createUser(@Args('createUserInput') createUserInput: CreateUserInput) {
    return this.userService.create(createUserInput);
  }

  @Mutation(() => User)
  async updateUser(
    @Args('id', { type: () => String }) id: string,
    @Args('updateUserInput') updateUserInput: UpdateUserInput,
  ) {
    return this.userService.update(id, updateUserInput);
  }

  @Mutation(() => Boolean)
  async removeUser(@Args('id', { type: () => String }) id: string) {
    return this.userService.remove(id);
  }

  @Mutation(() => LoginResponse)
  async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    const user = await this.userService.login(email, password);
    return {
      token: `token-${user.id}-${Date.now()}`, // Simple token generation for demo
      user,
    };
  }

  @Mutation(() => LoginResponse)
  async register(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
    @Args('firstName', { type: () => String }) firstName: string,
    @Args('lastName', { type: () => String }) lastName: string,
  ) {
    const user = await this.userService.register(
      email,
      password,
      firstName,
      lastName,
    );
    return {
      token: `token-${user.id}-${Date.now()}`, // Simple token generation for demo
      user,
    };
  }

  @Mutation(() => GoogleLoginResponse)
  async googleLogin(@Args('token', { type: () => String }) token: string) {
    const user = await this.userService.googleLogin(token);
    return {
      token: `google-token-${user.id}-${Date.now()}`, // Simple token generation for demo
      user,
    };
  }
}
