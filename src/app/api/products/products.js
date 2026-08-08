

// const products = [
//   {
//     id: "p1",
//     title: "Golden Radiance Elixir",
//     price: 85,
//     badge: "Best Seller",
//     rating: 4,
//     reviews: 124,
//     description:
//       "Infused with saffron and 24k gold for deep hydration and glow.",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuC90zohkl60Ubh_sg5ErNBdwAofg9zCBteKHCoZ4Fp1STm_pkXCqKKuONblAU8idGwM7fVZaXrIWsSq6szdKI1bX4Uk-ET71Mnxpd4MJd3VjxIH8GtTSd-0y0sj6FVpPide0xU2GTXEIIuGJve6ZDq8ZtX-6HZGMfzvG7Qgub9Ua1VsG22IP8_nIeeG6yvFcuBhQsE4lSvxbs0_xSQSRQsB42T25GKpHEn9zuIeLgS-TKd5XVxVHldwKq52NFuqLsYfccX2WP1FTcE",
//   },
//   {
//     id: "p2",
//     title: "Matcha Detox Clay Mask",
//     price: 42,
//     rating: 5,
//     reviews: 89,
//     description:
//       "Purifying green tea clay mask to unclog pores and refresh skin.",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuAr3WkCfePV9ofHsTzqJATNIE6j8R-lg7fTxSA9wq54BYb48_EthDwrFCqqNwWPNajmyNQhuVnGfSgGN93d99sJRTxnm6qzB4eiQlaNoMLDNETSDLIDdfFiisUZ9IcoefwBvS5iXjH4vIUTJPq9ijVxUhbRrPhFadjb7UQ8O07Bp8GNobQbMzsV7MnvLlYBt9F1Zsxg-I8mf3MKRA-1s-y_g3hc75NsnhmsJlhcV01-gToJ492vckcOn4cdF12CxpoovwLOSo-TzO0",
//   },
//   {
//     id: "p3",
//     title: "Midnight Repair Oil",
//     price: 68,
//     rating: 4,
//     reviews: 45,
//     description:
//       "Lavender and chamomile blend for a restful beauty sleep.",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuC-FtVe_GoVTOiSWkEpoIGwy94DlYB5w3zW_MnOS11L_IMEFienZyiY73uvSpm9SIjhYmLOFp_SBwouQvB4xihA5rtBAotlIy7Wv-Epmv9FQd84pL7YMc_hq1o5PBXf1HwJ1nU6X7YBXvoJzCMX1RMehLpqyl0mKPaiOOv9bvW0ETCm4ylE5yZGiT_VahWFW8vPzRxIF2EQOQG2COl8AdAklRnFt2p-T2bKQrZ58NHQzarlw2zqQ5aTwW29qoRjJJe51LMlII-QUVQ",
//   },
//   {
//     id: "p4",
//     title: "Gentle Oat Cleansing Bar",
//     price: 18,
//     rating: 5,
//     reviews: 210,
//     description:
//       "Fragrance-free, hypoallergenic bar for sensitive skin types.",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuCA2yu7TAIqenWHxD18FcULeyMTThH6gLTL0AVUPHMBx55f0BIurztolZfxUBa-Cziubaaf2eHt0guo2p51v1KI8k-9lgDHNj52iFo8wlhw6-PSBhR-Jqf84M7mL66J4_U4vpSOZnWmt0xUbF3wketY5p649nO9sQvZMke3WvpK_atDHCypsX5wj0bSZsAwzBBVjv5CLqDBaL1uGH7owbNyKh109bLqvGXC1hM37jm12WhleTqFiFqBU3iBK45PQabyXeLwwkL70xM",
//   },
//   {
//     id: "p5",
//     title: "Aqua Surge Gel",
//     price: 36,
//     badge: "New",
//     rating: 3,
//     reviews: 12,
//     description:
//       "Lightweight hydration bomb with hyaluronic acid.",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuB0XPFFJ5iVCnllkP3HzMhy6S9jFSpf5aP8n3hRzpfOvBxZjErHXfkjamPrx60-7dZoQmozaODftjqKonhoo4cNMkWz0Csnyg5641p42rTS7WAh2CYUZBtyGpx7i_vESyvEDyBxc6uI1RCjakkfAZtUFE0irKKbkNp7eGCMbtWEPY2uh2RUVWkPGoneDSt3JfTaCNHGFqwAV2tFomIlOqC0JryOzCo1MDWhKjom3836KQRQZ7r1r5PWWyxKMWP1xq6r8kUgLzU24LM",
//   },
//   {
//     id: "p6",
//     title: "Pure Rosewater Toner",
//     price: 28,
//     rating: 5,
//     reviews: 342,
//     description:
//       "Distilled from organic Bulgarian roses to balance pH.",
//     image:
//       "https://lh3.googleusercontent.com/aida-public/AB6AXuABdzQ3kof6jI5wHeIDYDH1qYZBEWxFLSP2VPC8AXzyjMKIeqWR0cz-CeTcfiuhWTAEQPZQ-Oi8b3EK1NRLmZs10vtWEVqiLhuMasndrWZnhwVZr_4E4UTtjQhrFtG470gx5RvktIF2OPIdEscjPMuNGEstlEJXllcMMuWCuZ1M-a0xXsO2q7dMX7SC6qOZdm3-gCrPdbFyEGxAJSudU85n7FU-jmwbABSxtuLTb4USpLqKp1xDsT9XyO7yntSZlaC0E11A0fMwT4A",
//   },
// ];

// export default products;
export const dynamic = 'force-dynamic'
export const fetchCache = 'default-no-store'

import { apiService } from "@/lib/api";
import { getImageUrl } from "@/lib/ImageService";


async function getLanguage() {
  if (typeof window !== "undefined") {
    return localStorage.getItem("appLanguage") || "en";
  }
  try {
    const { cookies } = require("next/headers");
    const cookieStore = await cookies();
    return cookieStore.get("appLanguage")?.value || "en";
  } catch (error) {
    return "en";
  }
}

// fetch all products
export async function getAllProducts(page = 1, size = 20) {
  try {
    const lang = await getLanguage();

    const response = await apiService.get(
      `/Configuration/items?pageNumber=${page}&pageSize=${size}&culture=${lang}&lang=${lang}`,
      {
        cache: "no-store",
      },
      {}
    );

    console.log(`[API] Fetching all products (Page: ${page}, Size: ${size}) - Cache: no-store`);
    if (!response?.success || !response?.data) {
      return { products: [], pagination: null };
    }

    const data = response.data;
    console.log(data);
    const products = data.items.map((item) => ({
      id: item.itemId,
      title: item.itemName,
      name: item.itemName,
      price: item.unitPrice,
      rating: 4,
      reviews: item.availableQuantity ?? 0,
      description: item.itemDisplayName,
      badge: item.isItemOutOfStock ? "Out of Stock" : null,
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      vatPercentage: item.vatPercentage ?? 0,

      image: item.thumbnailUrl
        ? getImageUrl(item.thumbnailUrl)
        : null,
    }));

    return {
      products,
      pagination: {
        pageNumber: data.pageNumber,
        pageSize: data.pageSize,
        totalPages: data.totalPages,
        totalCount: data.totalCount,
        hasNextPage: data.hasNextPage,
        hasPreviousPage: data.hasPreviousPage,
      },
    };

  } catch (error) {
    console.error("Products API Error:", error);
    return [];
  }
}

// fetch single product by ID
export async function getProductById(id) {
  try {
    const lang = await getLanguage();
    const response = await apiService.get(
      `/Configuration/items/${id}?culture=${lang}&lang=${lang}`,
      {},
      { cache: 'no-store' }
    );
    if (!response?.success || !response?.data) return null;

    const item = response.data;

    return {
      id: item.id,
      title: item.name || item.itemName,
      name: item.name || item.itemName,
      price: item.price,
      rating: 4,
      reviews: item.quantity ?? 0,
      description: item.description ?? "No description available",
      badge: item.isItemOutOfStock ? "Out of Stock" : null,
      categoryId: item.categoryId,
      categoryName: item.categoryName,
      vatPercentage: item.vatPercentage ?? 0,
      image:
        item.fileUrl
          ? getImageUrl(item.fileUrl)
          : null,
      itemImages: item.itemImages
        ? item.itemImages.map(img => getImageUrl(img.fileUrl))
        : []
    };
  } catch (error) {
    console.error("Single Product API Error:", error);
    return null;
  }
}

// optional: ek default export agar chaho
export default getAllProducts;
