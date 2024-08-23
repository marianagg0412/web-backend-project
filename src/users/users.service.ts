import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { In, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { User } from "./entities/user.entity";
import { PasswordService } from "../Auth/security/PasswordService";
import { Role } from "src/role/entities/role.entity";
import { Membership } from "src/memberships/entities/membership.entity";

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Role)
    private roleRepository: Repository<Role>,
    @InjectRepository(Membership)
    private membershipRepository: Repository<Membership>,
    private readonly passwordService: PasswordService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<User> {
    const existingUser = await this.userRepository.findOne({ where: { email: createUserDto.email } });
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }

    const hashedPassword = await this.passwordService.hashPassword(createUserDto.password);
    const user = new User();
    user.email = createUserDto.email;
    user.password = hashedPassword;
    user.name = createUserDto.name;
    user.membershipstatus = createUserDto.membershipstatus || '';

    if (createUserDto.roleIds && createUserDto.roleIds.length > 0) {
      user.roles = await this.roleRepository.findBy({
        id: In(createUserDto.roleIds),
      });
    } else {
      const defaultRole = await this.roleRepository.findOne({ where: { name: 'User' } });
      if (!defaultRole) {
        throw new NotFoundException('Default role "User" not found');
      }
      user.roles = [defaultRole];
    }

    return this.userRepository.save(user);
  }

  async validateUser(email: string, pass: string): Promise<User | null> {
    const user = await this.userRepository.findOne({ where: { email }, relations: ['roles'] });
    if (user && await this.passwordService.comparePassword(pass, user.password)) {
      return user;
    }
    return null;
  }

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['memberships', 'roles', 'events'] });
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id }, relations: ['memberships', 'roles', 'events'] });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    const user = await this.userRepository.preload({
      id,
      ...updateUserDto,
    });

    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    return this.userRepository.save(user);
  }

  async remove(id: number): Promise<{ message: string }> {
    const result = await this.userRepository.delete(id);

    if (result.affected === 0) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    // Return a success message
    return { message: `User with ID ${id} successfully deleted` };
  }

  async addRoleToUser(userId: number, roleId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['roles'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const role = await this.roleRepository.findOne({ where: { id: roleId } });
    if (!role) {
      throw new NotFoundException(`Role with ID ${roleId} not found`);
    }

    // Add role if it does not already exist in the user's roles
    if (!user.roles.some(r => r.id === roleId)) {
      user.roles.push(role);
      return this.userRepository.save(user);
    }
    return user;
  }

  async addMembershipToUser(userId: number, membershipId: number): Promise<User> {
    const user = await this.userRepository.findOne({
      where: { id: userId },
      relations: ['memberships'],
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${userId} not found`);
    }

    const membership = await this.membershipRepository.findOne({ where: { id: membershipId } });
    if (!membership) {
      throw new NotFoundException(`Membership with ID ${membershipId} not found`);
    }

    // Add membership if it does not already exist in the user's memberships
    if (!user.memberships.some(m => m.id === membershipId)) {
      user.memberships.push(membership);
      return this.userRepository.save(user);
    }
    return user;
  }
}
