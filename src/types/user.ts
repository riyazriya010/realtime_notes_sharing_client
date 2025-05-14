export interface UserLogin {
    _id: string;
    username: string;
    email: string;
    password: string
}

export interface UserSignup {
    _id: string;
    username: string;
    email: string;
    password: string
}

export interface LoginResponse {
  result: UserLogin;
  message: string;
  success: boolean;
}

export interface SignUpResponse {
  result: UserSignup;
  message: string;
  success: boolean;
}