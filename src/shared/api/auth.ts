import axiosInstance from "./axiosInstance";
import {
  LoginRequest,
  RegisterRequest,
  User,
  UpdateUserRequest,
  ChangePasswordRequest,
} from "@/shared/types/auth";

/** 회원가입 */
// features/auth/api/authApi.ts
export async function registerUser(userData: RegisterRequest) {
  const { data } = await axiosInstance.post("/auth/register", {
    username: userData.username,
    email: userData.email,
    password: userData.password,
    phone: userData.phone, // 🔹 phone 추가
  });
  return data;
}

/** 이메일 중복 체크 */
export async function checkEmailDuplicate(email: string) {
  const { data } = await axiosInstance.get("/auth/check-email", {
    params: { email },
  });
  return data;
}

/** 로그인 */
export async function loginUser(credentials: LoginRequest) {
  const { data } = await axiosInstance.post("/auth/login", credentials);
  return data;
}

/** 액세스 토큰 갱신 */
export async function refreshToken(refreshToken: string) {
  const { data } = await axiosInstance.post("/auth/refresh-token", {
    refresh_token: refreshToken,
  });
  return data;
}

/** 사용자 정보 조회 */
export async function getUser(): Promise<User> {
  const { data } = await axiosInstance.get("/auth/me");
  return data;
}

/** 회원 정보 수정 */
export async function updateUserInfo(userData: {
  username?: string;
  phone?: string;
}) {
  const { data } = await axiosInstance.put("/auth/me", userData);
  return data;
}

/** 비밀번호 변경 */
export async function changePassword(
  userId: number,
  passwords: ChangePasswordRequest
) {
  const { data } = await axiosInstance.put(
    `/auth/${userId}/password`,
    passwords
  );
  return data;
}

/** 회원 탈퇴 */
export async function deleteUser(userId: number) {
  const { data } = await axiosInstance.delete(`/auth/${userId}`);
  return data;
}

/** 모든 사용자 조회 (관리자용) */
export async function fetchAllUsers() {
  const { data } = await axiosInstance.get("/auth/users");
  return data;
}

/** 특정 사용자 조회 (관리자용) */
export async function fetchUserById(userId: number) {
  const { data } = await axiosInstance.get(`/auth/users/${userId}`);
  return data;
}
