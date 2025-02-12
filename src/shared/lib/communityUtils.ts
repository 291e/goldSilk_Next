/** 날짜 포맷 함수 */
export const formatDate = (isoString: string) => isoString.split("T")[0];

/** map_id 정리 함수 (JSON 문자열 정리) */
export const cleanMapId = (mapId: string) => mapId.replace(/[{""}]/g, "");

/** 카테고리 리스트 */
export const categories = [
  { name: "공지사항", type: "notice", href: "/community/notice" },
  { name: "이벤트", type: "event", href: "/community/event" },
  { name: "체인점 안내", type: "branches", href: "/community/branches" },
  { name: "FAQ", type: "faq", href: "/community/faq" },
];

/** 카테고리 한글 변환 매핑 */
export const categoryNames: Record<string, string> = {
  notice: "공지사항",
  event: "이벤트",
  branches: "체인점 안내",
  faq: "FAQ",
};

/** 카테고리 변환 함수 */
export const getCategoryName = (category: string): string =>
  categoryNames[category] || category;
