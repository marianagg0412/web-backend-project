import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Membership } from './entities/membership.entity';
import { User } from 'src/users/entities/user.entity';  // Import User entity

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,

    @InjectRepository(User)
    private readonly userRepository: Repository<User>, // Inject User repository
  ) {}

  async create(createMembershipDto: CreateMembershipDto): Promise<Membership> {
    const membership = this.membershipRepository.create(createMembershipDto);
    return this.membershipRepository.save(membership);
  }

  findAll(): Promise<Membership[]> {
    return this.membershipRepository.find();
  }

  findAllActive(): Promise<Membership[]> {
    return this.membershipRepository.find({ where: { isActive: 1 } });
  }

  async findOne(id: number): Promise<Membership> {
    const membership = await this.membershipRepository.findOne({ where: { id } });
    if (!membership) {
      throw new NotFoundException('Membership not found');
    }
    return membership;
  }

  async update(id: number, updateMembershipDto: UpdateMembershipDto): Promise<Membership> {
    const membership = await this.findOne(id);
    const updatedMembership = this.membershipRepository.merge(membership, updateMembershipDto);
    return this.membershipRepository.save(updatedMembership);
  }

  async remove(id: number): Promise<void> {
    const result = await this.membershipRepository.findOne({ where: { id } });
    if (!result) {
      throw new NotFoundException('Membership not found');
    }
    result.isActive = 0;
    await this.membershipRepository.save(result);
  }



  // Add a User to a Membership
  async addUserToMembership(userId: number, membershipId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['memberships'] });
    const membership = await this.findOne(membershipId);

    if (!user || !membership) {
      throw new NotFoundException('User or Membership not found');
    }

    user.memberships.push(membership);
    await this.userRepository.save(user);
  }

  // Remove a User from a Membership
  async removeUserFromMembership(userId: number, membershipId: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id: userId }, relations: ['memberships'] });
    if (!user) {
      throw new NotFoundException('User not found');
    }

    user.memberships = user.memberships.filter(m => m.id !== membershipId);
    await this.userRepository.save(user);
  }
}
