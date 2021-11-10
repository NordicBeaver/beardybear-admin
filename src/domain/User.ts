import { UserDto } from '../api';

export interface User {
  id: number;
  name: string;
}

export function userFromDto(dto: UserDto) {
  const user: User = {
    id: dto.id,
    name: dto.name,
  };
  return user;
}
