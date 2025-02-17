import axiosInstance from "./axiosInstance";

/** 모든 상품 조회 */
export async function fetchAllProducts() {
  const { data } = await axiosInstance.get("/products");
  return data;
}

/** 특정 상품 조회 */
export async function fetchProductById(productId: string) {
  const { data } = await axiosInstance.get(`/products/${productId}`);
  return data;
}

/** 상품 추가 */
export async function addProduct(formData: FormData) {
  const { data } = await axiosInstance.post("/products/product", formData);
  return data;
}

/** 상품 수정 */
export async function updateProduct(productId: string, formData: FormData) {
  const { data } = await axiosInstance.put(
    `/products/product/${productId}`,
    formData
  );
  return data;
}

/** 상품 속성 수정 (이름, 가격, 카테고리, 태그) */
export async function updateProductAttributes(
  productId: string,
  data: Record<string, any>
) {
  const { data: response } = await axiosInstance.put(
    `/products/${productId}`,
    data
  );
  return response;
}

/** 상품 삭제 */
export async function deleteProduct(productId: string) {
  const { data } = await axiosInstance.delete(`/products/product/${productId}`);
  return data;
}

/** 검색 기능 */
export async function searchProducts(query: string) {
  const { data } = await axiosInstance.get(`/products/search`, {
    params: { query },
  });
  return data;
}

/** 필터 기능 */
export async function filterProducts(filters: Record<string, any>) {
  const { data } = await axiosInstance.get("/products/filter", {
    params: filters,
  });
  return data;
}

/** 비슷한 상품 조회 */
export async function fetchSimilarProducts(productId: string) {
  const { data } = await axiosInstance.get(`/products/${productId}/similar`);
  return data;
}

/** 추천 상품 조회 */
export async function fetchRecommendedProducts(productId: string) {
  const { data } = await axiosInstance.get(
    `/products/${productId}/recommendations`
  );
  return data;
}
