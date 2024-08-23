import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/users/entities/user.entity';
import { UniqueEmailConstraint } from 'src/common/validators/is-unique.decorator';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [UniqueEmailConstraint],
  exports: [UniqueEmailConstraint],
})
export class CommonModule {}
