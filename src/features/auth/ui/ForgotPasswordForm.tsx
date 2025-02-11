"use client";

import { useState } from "react";
import axiosInstance from "@/shared/api/axiosInstance";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setMessage("");

    if (!email) {
      setError("이메일을 입력해주세요.");
      return;
    }

    setLoading(true);

    try {
      await axiosInstance.post("/auth/forgot-password", { email });
      setMessage("비밀번호 재설정 링크가 이메일로 전송되었습니다.");
    } catch (err) {
      setError("비밀번호 찾기 요청이 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-bold mb-4">비밀번호 찾기</h2>
      {error && <p className="text-red-500">{error}</p>}
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="이메일을 입력하세요"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-3 py-2 border rounded"
          required
        />
        <button
          type="submit"
          className="w-full bg-blue-500 text-white py-2 rounded disabled:bg-gray-300"
          disabled={loading}
        >
          {loading ? "전송 중..." : "비밀번호 찾기"}
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordForm;
