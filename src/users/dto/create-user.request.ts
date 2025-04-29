import { IsEmail, IsStrongPassword } from 'class-validator';

export class CreateUserRequest {
  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;
}

// TODO: This isn't quite the place for this. I'm keeping it here for now to keep TS happy.
export interface User {
  id: string;
  email: string;
  password: string;
}
