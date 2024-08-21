import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMembership } from './entities/userxmembership.entity';
import { CreateUserXMembershipDto } from './dto/create-userxmembership.dto';
import { UpdateUserxmembershipDto } from './dto/update-userxmembership.dto';

@Injectable()
export class UserMembershipService {
  constructor(
    @InjectRepository(UserMembership)
    private userMembershipRepository: Repository<UserMembership>,
  ) {}

  // Create a new user membership
  async create(createUserMembershipDto: CreateUserXMembershipDto): Promise<UserMembership> {
    const userMembership = this.userMembershipRepository.create(createUserMembershipDto);
    return this.userMembershipRepository.save(userMembership);
  }

  async findAll(): Promise<UserMembership[]> {
    return this.userMembershipRepository.find();
  }

  // Find a user membership by composite key
  async findOne(userId: number, membershipId: number): Promise<UserMembership> {
    const userMembership = await this.userMembershipRepository.findOne({
      where: { userId, membershipId },
    });

    if (!userMembership) {
      throw new NotFoundException(`UserMembership with userId ${userId} and membershipId ${membershipId} not found`);
    }

    return userMembership;
  }

  // Update a user membership
  async update(userId: number, membershipId: number, updateUserMembershipDto: UpdateUserxmembershipDto): Promise<UserMembership> {
    const userMembership = await this.userMembershipRepository.preload({
      userId,
      membershipId,
      ...updateUserMembershipDto,
    });

    if (!userMembership) {
      throw new NotFoundException(`UserMembership with userId ${userId} and membershipId ${membershipId} not found`);
    }

    return this.userMembershipRepository.save(userMembership);
  }

  // Remove a user membership
  async remove(userId: number, membershipId: number): Promise<void> {
    const result = await this.userMembershipRepository.delete({ userId, membershipId });

    if (result.affected === 0) {
      throw new NotFoundException(`UserMembership with userId ${userId} and membershipId ${membershipId} not found`);
    }
  }
}
