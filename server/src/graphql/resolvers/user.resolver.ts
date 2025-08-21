import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from '../../services/user.service';
import { User } from '../../entities/user.entity';
import { CreateUserInput, UpdateUserInput } from '../inputs/user.input';

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

  @Mutation(() => User)
  async login(
    @Args('email', { type: () => String }) email: string,
    @Args('password', { type: () => String }) password: string,
  ) {
    return this.userService.login(email, password);
  }

  @Mutation(() => User)
  async googleLogin(
    @Args('token', { type: () => String }) token: string,
  ) {
    return this.userService.googleLogin(token);
  }
}
