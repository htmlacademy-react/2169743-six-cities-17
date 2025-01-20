export type Nullish<T> = T | null;

export type TOption = {
  id: number;
  value: string;
};

export type ApiError = {
  errorType: string;
  message: string;
  details?: Array<{
    property: string;
    value: string;
    messages: Array<string>;
  }>;
};
