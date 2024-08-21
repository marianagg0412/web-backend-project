import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateMembershipDto } from './dto/create-membership.dto';
import { UpdateMembershipDto } from './dto/update-membership.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserMembership } from 'src/userxmembership/entities/userxmembership.entity';
import { Repository } from 'typeorm';
import { Membership } from './entities/membership.entity';

@Injectable()
export class MembershipsService {
  constructor(
    @InjectRepository(Membership)
    private readonly membershipRepository: Repository<Membership>,

    @InjectRepository(UserMembership)
    private readonly userMembershipRepository: Repository<UserMembership>,
  ) {}

  async create(createMembershipDto: CreateMembershipDto): Promise<Membership> {
    const membership = this.membershipRepository.create(createMembershipDto);
    return this.membershipRepository.save(membership);
  }

  findAll(): Promise<Membership[]> {
    return this.membershipRepository.find();
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
    const result = await this.membershipRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Membership not found');
    }
  }
}
