import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/utilites/types';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
