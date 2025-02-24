"use client";

import { useEffect, useState } from "react";
import { getUser, updateUserInfo } from "@/shared/api/auth";
import { useRouter } from "next/navigation";
import { Input, Button } from "@/shared/ui";
import { toast } from "react-toastify";

export default function EditProfilePage() {
  const router = useRouter();
  const [userInfo, setUserInfo] = useState({
    username: "",
    phone: "",
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const data = await getUser();
        setUserInfo({
          username: data.username || "",
          phone: data.phone || "",
        });
      } catch (error) {
        console.error("🚨 회원 정보 불러오기 실패:", error);
      }
    };

    loadUserData();
  }, []);

  /** ✅ 입력 값 변경 핸들러 */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUserInfo({ ...userInfo, [e.target.name]: e.target.value });
  };

  /** ✅ 회원 정보 수정 */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      await updateUserInfo(userInfo);
      toast.success("✅ 회원 정보가 수정되었습니다!");
      router.push("/profile");
    } catch (error) {
      console.error("🚨 회원 정보 수정 실패:", error);
      toast.error("회원 정보 수정에 실패했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-lg mx-auto mt-8 p-6 bg-white shadow-lg rounded-lg">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        회원 정보 수정
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            이름
          </label>
          <Input
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleChange}
            placeholder="이름을 입력하세요"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700">
            전화번호
          </label>
          <Input
            type="text"
            name="phone"
            value={userInfo.phone}
            onChange={handleChange}
            placeholder="전화번호 입력 (예: 010-1234-5678)"
          />
        </div>

        <Button
          type="submit"
          className="w-full bg-primary text-white py-2 font-semibold rounded-lg"
          disabled={loading}
        >
          {loading ? "저장 중..." : "수정 완료"}
        </Button>
      </form>
    </div>
  );
}
