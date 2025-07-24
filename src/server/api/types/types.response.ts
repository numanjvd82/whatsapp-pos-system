type ApiResponse<T> = {
  success: boolean;
  data?: T;
  error?: string;
};

export type SignUpResponse = ApiResponse<{
  message: string;
  user: {
    id: string;
    email: string;
    name: string;
  };
}>;

export type LoginResponse = ApiResponse<{
  accessToken: {
    token: string;
  };
  refreshToken: string;
}>;
