export class CreateUserDto {
    readonly name: string;
    readonly email: string;
    readonly password: string;
    readonly membershipstatus?: string; // optional with a default value
    readonly roleId: number;
  }
  