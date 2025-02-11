// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";

// export function middleware(request: NextRequest) {
//   const protectedRoutes = ["/dashboard", "/profile"];

//   // 🔹 미들웨어에서 토큰을 확인하지 않음 (서버는 localStorage 접근 불가)
//   if (protectedRoutes.includes(request.nextUrl.pathname)) {
//     return NextResponse.next();
//   }

//   return NextResponse.next();
// }

// // ✅ 보호할 경로 설정
// export const config = {
//   matcher: ["/dashboard/:path*", "/profile/:path*"],
// };
// //
