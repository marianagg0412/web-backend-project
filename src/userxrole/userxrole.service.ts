import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserXRoleDto } from './dto/create-userxrole.dto';
import { UpdateUserxroleDto } from './dto/update-userxrole.dto';
import { UserRole } from './entities/userxrole.entity';
import { User } from '../users/entities/user.entity';
import { Role } from '../role/entities/role.entity';

@Injectable()
export class UserxroleService {
  constructor(
    @InjectRepository(UserRole)
    private userxroleRepository: Repository<UserRole>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
  ) {}

  async create(createUserxroleDto: CreateUserXRoleDto): Promise<UserRole> {
    const { userId, roleId } = createUserxroleDto;

    const user = await this.userRepository.findOne({ where: { id: userId } });
    const role = await this.roleRepository.findOne({ where: { id: roleId } });

    if (!user || !role) {
      throw new NotFoundException('User or Role not found');
    }

    const userRole = this.userxroleRepository.create({
      user,
      role,
    });

    return this.userxroleRepository.save(userRole);
  }

  async findAll(): Promise<UserRole[]> {
    return this.userxroleRepository.find({ relations: ['user', 'role'] });
  }

  async findOne(id: number): Promise<UserRole> {
    const userRole = await this.userxroleRepository.findOne({
      where: { id },
      relations: ['user', 'role'],
    });

    if (!userRole) {
      throw new NotFoundException(`UserRole with ID ${id} not found`);
    }

    return userRole;
  }

  async update(id: number, updateUserxroleDto: UpdateUserxroleDto): Promise<UserRole> {
    const userRole = await this.userxroleRepository.preload({
      id,
      ...updateUserxroleDto,
    });

    if (!userRole) {
      throw new NotFoundException(`UserRole with ID ${id} not found`);
    }

    return this.userxroleRepository.save(userRole);
  }

  async remove(id: number): Promise<void> {
    const result = await this.userxroleRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`UserRole with ID ${id} not found`);
    }
  }
}
