export const categoryMapping: Record<string, string> = {
  honju_hanbok: "혼주",
  k_hanbok: "생활",
  wedding_hanbok: "웨딩",
  custom_hanbok: "맞춤",
  little_hwanggeumdan: "아동",
  kids: "아동",
  first_birthday: "돌잔치",
  hanbok_accessories: "한복소품",
  pet_hanbok: "반려동물",
  k_goods: "K-Goods",
};

export const getCategoryName = (slug: string): string =>
  categoryMapping[slug] || slug;
