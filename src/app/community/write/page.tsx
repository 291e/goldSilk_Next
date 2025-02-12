// "use client";

// import { useState } from "react";
// import { createCommunityPost } from "@/shared/api/community";
// import { useRouter } from "next/navigation";
// import dynamic from "next/dynamic";

// // ✅ TipTap 에디터 동적 로딩
// const Editor = dynamic(() => import("@/features/community/ui/TiptapEditor"), { ssr: false });

// export default function CommunityWritePage() {
//   const router = useRouter();
//   const [title, setTitle] = useState("");
//   const [content, setContent] = useState("");

//   const handleSubmit = async () => {
//     if (!title || !content) {
//       alert("제목과 내용을 입력하세요.");
//       return;
//     }

//     try {
//       const formData = new FormData();
//       formData.append("title", title);
//       formData.append("content", content);

//       await createCommunityPost(formData);
//       router.push("/community/home");
//     } catch (error) {
//       console.error("게시글 작성 실패:", error);
//     }
//   };

//   return (
//     <div className="container mx-auto px-6 py-8">
//       <h1 className="text-2xl font-bold mb-6">게시글 작성</h1>

//       <input
//         type="text"
//         className="border p-2 w-full mb-4 rounded-md"
//         value={title}
//         onChange={(e) => setTitle(e.target.value)}
//         placeholder="제목을 입력하세요"
//       />

//       {/* TipTap 에디터 */}
//       <Editor value={content} onChange={setContent} />

//       <button className="bg-blue-500 text-white px-4 py-2 rounded-md mt-4" onClick={handleSubmit}>
//         작성 완료
//       </button>
//     </div>
//   );
// }
