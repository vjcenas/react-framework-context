import { IUser } from 'src/models/user.model';

export const getDisplayName = (data: IUser[]): string[] =>
  data.map((value) => `${value.name} (${value.username})`);
