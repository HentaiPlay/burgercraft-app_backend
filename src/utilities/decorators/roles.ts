import { SetMetadata } from '@nestjs/common';
import { Role } from 'src/roles/types/roles.types'; 

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);
