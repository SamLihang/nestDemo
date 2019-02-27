import { Controller, Delete, Get, HttpException, HttpStatus, Param, Post, Put } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { UsersService } from './services/users.service';
import { ApiException } from '../common/exceptions/api.exception';
import { ApiErrorCode } from '../common/enums/api-error-code.enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersservice: UsersService) {}
  @Get()
  async findAll(): Promise<User[]> {
    return await this.usersservice.findAll();
  }

  @Get(':id')
  async findOne(@Param() params): Promise<User> {
    const id = parseInt(params.id, 10);

    if (isNaN(id) || typeof id !== 'number' || id <= 0) {
      throw new ApiException('用户ID无效', ApiErrorCode.USER_ID_INVALID, HttpStatus.BAD_REQUEST)
    }

    return await this.usersservice.findOne(params.id);
  }

  @Post()
  async create() {
    return await this.usersservice.create();
  }

  @Put()
  async edit() {
    return await this.usersservice.edit();
  }

  @Delete()
  async remove() {
    return await this.usersservice.remove();
  }
}
