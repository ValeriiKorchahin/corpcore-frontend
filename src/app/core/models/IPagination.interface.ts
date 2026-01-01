export interface IPagination {
  limit: number | null;
  page: number | null;
}

export interface IPaginatedResponse<T>{
  data: T;
  total: number;
  page: number;
  limit: number;
}
