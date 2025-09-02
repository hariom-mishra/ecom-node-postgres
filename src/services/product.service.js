import { getProducts } from "../models/product.model";

export const getAllProductsService = async (
    limit, offset, productIds, categoryIds, minPrice, maxPrice, searchQuery
) => {
    try {
        return await getProducts(
            limit, offset, productIds, categoryIds, minPrice, maxPrice, searchQuery
        );
    } catch (error) {
        throw new Error('Failed to fetch products: ' + error.message);
    }
}