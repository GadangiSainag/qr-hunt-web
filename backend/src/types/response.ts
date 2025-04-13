export interface IAuthResponse {
  accessToken: string;
}

export interface IMessageResponse {
  message: string;
  error?: any;
}

export interface IErrorResponse {
  message: string;
  error?: any;
  status: number;
}

export class ApiError extends Error {
  status: number;
  constructor(message: string, status: number) {
    super(message);
    this.status = status;
    this.name = 'ApiError';
  }
} 