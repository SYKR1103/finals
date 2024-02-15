import { User } from '../user/entities/user.entity';
import { Request } from 'express';

export interface RequestWIthUser extends Request {
  user: User;
}
