export interface User {
  user_id: number;
  username: string;
  email: string;
  phone: string;
  is_admin: boolean;
  refresh_token: string;
}

export interface RegisterRequest {
  username: string;
  email: string;
  password: string;
  phone: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface UpdateUserRequest {
  email?: string;
  phone?: string;
  address?: string;
}

export interface ChangePasswordRequest {
  oldPassword: string;
  newPassword: string;
}
