export interface IPagination {
  limit: number;
  page: number;
}

export interface IPaginatedResponse<T> {
  data: T;
  total: number;
  page: number;
  limit: number;
}
