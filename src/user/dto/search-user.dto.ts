export class SearchUsersDto {
  fullName: string;
  email: string;
  id?: 'DESC' | 'ASC';
  limit?: number;
  take?: number;
}
