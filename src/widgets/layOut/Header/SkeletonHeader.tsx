/** ✅ 스켈레톤 UI 컴포넌트 */
export default function SkeletonHeader() {
  return (
    <div className="bg-white shadow-md w-full fixed top-0 left-0 z-50">
      <div className="container gap-4 mx-auto flex justify-between items-center py-4 px-6 text-xs lg:text-base">
        {/* 로고 스켈레톤 */}
        <div className="w-24 h-10 bg-gray-200 rounded-md animate-pulse"></div>

        {/* 네비게이션 스켈레톤 */}
        <nav className="hidden md:flex space-x-4 lg:space-x-6 items-center">
          {Array(3)
            .fill(0)
            .map((_, index) => (
              <div
                key={index}
                className="w-20 h-4 bg-gray-200 rounded-md animate-pulse"
              ></div>
            ))}
        </nav>

        {/* 아이콘 스켈레톤 */}
        <nav className="hidden md:flex space-x-2">
          <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
          <div className="w-6 h-6 bg-gray-200 rounded-full animate-pulse"></div>
        </nav>
      </div>
    </div>
  );
}
