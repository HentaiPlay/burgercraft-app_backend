import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/utilities/types';

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
