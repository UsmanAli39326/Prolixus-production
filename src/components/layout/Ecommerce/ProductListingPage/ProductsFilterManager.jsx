"use client";
import React, { useState, useMemo, useEffect, useCallback } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import ShopLayout from "./ProductLayout";
import FiltersSidebar from "./SideBar";
import ProductGrid from "./ProductGrid";
import ShopTopBar from "./ProductHeader";
import ProductCardSkeleton from "./ProductCardSkeleton";
import getAllProducts from "@/app/api/products/products";
export default function ProductsFilterManager({ categoryList, filters, initialPage = 1, initialSort, initialPriceRange, localization }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1. Sync state with searchParams (Single Source of Truth)
  const currentCategory = searchParams.get("category") || "";
  const currentMinPrice = Number(searchParams.get("minPrice")) || initialPriceRange.min;
  const currentMaxPrice = Number(searchParams.get("maxPrice")) || initialPriceRange.max;
  const currentSort = searchParams.get("sort") || initialSort || filters.sort[0];
  const currentPageParams = Number(searchParams.get("page")) || initialPage;

  const [products, setProducts] = useState([]);
  const [pagination, setPagination] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);

  const updateFilters = useCallback((newFilters) => {
    const params = new URLSearchParams(searchParams.toString());
    Object.entries(newFilters).forEach(([key, value]) => {
      if (value === null || value === undefined || value === "") {
        params.delete(key);
      } else {
        params.set(key, value);
      }
    });
    // Reset page if filters change (except when specifically updating page)
    if (!newFilters.page && searchParams.get("page")) {
      params.delete("page");
    }
    router.push(`${pathname}?${params.toString()}`, { scroll: false });
  }, [router, pathname, searchParams]);

  const onPriceChange = (range) => {
    updateFilters({ minPrice: range.min, maxPrice: range.max });
  };

  const onSortChange = (sort) => {
    updateFilters({ sort });
  };

  const onCategoryChange = (category) => {
    updateFilters({ category });
  };

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        // Fetch all items for client-side filtering if API doesn't support it
        // Or if you have a lot of items, call API with filters if supported.
        // For now, we'll fetch a larger set or use the current paginated set.
        const data = await getAllProducts(currentPageParams, 50); // Fetch more for better client-side filtering
        if (data && data.products) {
          setProducts(data.products);
          setPagination(data.pagination);
        }
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, [currentPageParams]);

  const { filteredAndSortedProducts, dynamicLimits } = useMemo(() => {
    let result = [...products];

    // Calculate dynamic limits of ALL fetched products (ignoring current price filter)
    let minBound = filters.price.min;
    let maxBound = filters.price.max;

    if (products.length > 0) {
      const prices = products.map(p => p.price);
      const actualMin = Math.min(...prices);
      const actualMax = Math.max(...prices);

      // logic: if 170-630 then 100-700
      minBound = Math.floor(actualMin / 100) * 100;
      maxBound = Math.ceil(actualMax / 100) * 100;
    }

    // 1. Filter by Category
    if (currentCategory) {
      // Find the category (parent or child) that matches the currentCategory ID/label
      const selectedCategory = categoryList.find(c => c.id === currentCategory || c.label === currentCategory) 
        || categoryList.flatMap(c => c.children).find(child => child.id === currentCategory || child.label === currentCategory);

      const categoryIdsToMatch = new Set();
      if (selectedCategory) {
        categoryIdsToMatch.add(selectedCategory.id || selectedCategory.label);
        if (selectedCategory.children) {
          selectedCategory.children.forEach(child => categoryIdsToMatch.add(child.id || child.label));
        }
      } else {
        // Fallback for cases where selectedCategory isn't found in current list
        categoryIdsToMatch.add(currentCategory);
      }

      result = result.filter(p => {
        return categoryIdsToMatch.has(p.categoryId) || categoryIdsToMatch.has(p.categoryName);
      });
    }

    // 2. Filter by Price
    result = result.filter(
      (p) => p.price >= currentMinPrice && p.price <= currentMaxPrice
    );

    // 3. Sort
    if (currentSort === "Price: Low to High") {
      result.sort((a, b) => a.price - b.price);
    } else if (currentSort === "Price: High to Low") {
      result.sort((a, b) => b.price - a.price);
    } else if (currentSort === "Name (A-Z)") {
      result.sort((a, b) => (a.title || "").localeCompare(b.title || ""));
    }

    return {
      filteredAndSortedProducts: result,
      dynamicLimits: { min: minBound, max: maxBound }
    };
  }, [products, currentMinPrice, currentMaxPrice, currentSort, currentCategory, filters]);

  return (
    <ShopLayout
      showFilters={showFilters}
      sidebar={
        <FiltersSidebar
          categories={categoryList}
          filters={filters}
          minLimit={dynamicLimits.min}
          maxLimit={dynamicLimits.max}
          currentPriceRange={{ min: currentMinPrice, max: currentMaxPrice }}
          onPriceChange={onPriceChange}
          currentSort={currentSort}
          onSortChange={onSortChange}
          currentCategory={currentCategory}
          onCategoryChange={onCategoryChange}
          localization={localization}
        />
      }
      content={
        <>
          {loading ? (
            <div className="flex flex-col gap-2">
              {/* TopBar Skeleton */}
              <div className="mb-6 flex items-center justify-between animate-pulse">
                <div className="h-4 w-40 rounded bg-gray-200"></div>
                <div className="h-9 w-24 rounded-full bg-gray-200 lg:hidden"></div>
              </div>

              {/* Grid Skeleton - Matching ProductGrid grid settings */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <ProductCardSkeleton key={i} />
                ))}
              </div>
            </div>
          ) : (
            <>
              <ShopTopBar
                total={pagination?.totalCount}
                showing={filteredAndSortedProducts.length}
                onOpenFilters={() => setShowFilters(prev => !prev)}
                filtersOpen={showFilters}
                localization={localization}
              />
              <ProductGrid products={filteredAndSortedProducts} localization={localization} />
            </>
          )}
        </>
      }
    />
  );
}
