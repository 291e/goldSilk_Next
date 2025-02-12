"use client";

import { fetchAllProducts } from "@/shared/api";
import { Product } from "@/shared/types/products";
import { useEffect, useState } from "react";
import { ProductCard } from "./ProductCard";
import Pagination from "@/widgets/community/Pagination";
import FilterSelect from "@/widgets/community/FilterSelect";
import SearchBar from "@/widgets/community/SearchBar";
import { motion } from "framer-motion";

interface ProductListProps {
  category: string;
}

export const ProductList = ({ category }: ProductListProps) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState<string | null>(null);
  const productsPerPage = 12;

  useEffect(() => {
    const loadProducts = async () => {
      try {
        setIsLoading(true);
        const data = await fetchAllProducts();
        const categoryFiltered = data.filter(
          (product: Product) => product.category === category
        );
        setProducts(categoryFiltered);
        setFilteredProducts(categoryFiltered);
      } catch (error) {
        console.error("상품 불러오기 실패:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadProducts();
  }, [category]);

  // 🔍 검색 기능
  const handleSearch = () => {
    const searchFiltered = products.filter((product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredProducts(searchFiltered);
    setCurrentPage(1);
  };

  // 🔽 정렬 기능
  useEffect(() => {
    let sortedProducts = [...filteredProducts];
    if (filter === "latest") {
      sortedProducts = sortedProducts.sort(
        (a, b) => Number(b.product_id) - Number(a.product_id)
      );
    } else if (filter === "low_price") {
      sortedProducts = sortedProducts.sort(
        (a, b) => Number(a.price) - Number(b.price)
      );
    } else if (filter === "high_price") {
      sortedProducts = sortedProducts.sort(
        (a, b) => Number(b.price) - Number(a.price)
      );
    }
    setFilteredProducts(sortedProducts);
  }, [filter]);

  // 📌 페이지네이션 처리
  const indexOfLastPost = currentPage * productsPerPage;
  const indexOfFirstPost = indexOfLastPost - productsPerPage;
  const currentProducts = filteredProducts.slice(
    indexOfFirstPost,
    indexOfLastPost
  );
  const totalPages = Math.ceil(filteredProducts.length / productsPerPage);

  return (
    <motion.div
      className="container mx-auto px-0 sm:px-6 py-8"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* 🔍 검색 & 필터 */}
      <motion.div
        className="flex justify-between gap-4 mb-6 items-center w-full"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3, delay: 0.2 }}
      >
        <SearchBar
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          onSearch={handleSearch}
        />
        <FilterSelect
          filter={filter}
          setFilter={setFilter}
          options={[
            { value: "latest", label: "최신순" },
            { value: "low_price", label: "낮은 가격순" },
            { value: "high_price", label: "높은 가격순" },
          ]}
        />
      </motion.div>

      {/* 🛒 상품 리스트 */}
      {isLoading ? (
        <p className="text-gray-500 text-center">상품을 불러오는 중...</p>
      ) : (
        <motion.div
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        >
          {currentProducts.map((product) => (
            <motion.div
              key={product.product_id}
              whileHover={{ scale: 1.01 }}
              transition={{ duration: 0.2 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* 📌 페이지네이션 */}
      {totalPages > 1 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        </motion.div>
      )}
    </motion.div>
  );
};
