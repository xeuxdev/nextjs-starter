export type QueryResponse<T> = {
  data: T;
  message: string;
  status: number | string;
};
