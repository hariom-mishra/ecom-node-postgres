import pool from "../db/index.js";


// export const addProduct = async (
//     name,
//     image,
//     price,
//     selling_price,
//     stock
// ){
//     try {

//     } catch (error) {

//     }
// }

export const getProducts = async (
    limit = 10,
    offset = 0,
    productIds,
    categoryIds,
    minPrice,
    maxPrice,
    searchQuery,

) => {
    try {
        const query = `SELECT * FROM products`;
        const values = [];
        let conditions = [];

        if (productIds && productIds.length > 0) {
            conditions.push(`id = ANY($${values.length + 1})`);
            values.push(productIds);
        }

        if (categoryIds && categoryIds.length > 0) {
            conditions.push(`category_id = ANY($${values.length + 1})`);
            values.push(categoryIds);
        }

        if (minPrice !== undefined) {
            conditions.push(`price >= $${values.length + 1}`);
            values.push(minPrice);
        }

        if (maxPrice !== undefined) {
            conditions.push(`price <= $${values.length + 1}`);
            values.push(maxPrice);
        }

        if (searchQuery) {
            conditions.push(`(name ILIKE $${values.length + 1} OR description ILIKE $${values.length + 1})`);
            values.push(`%${searchQuery}%`);
        }

        if (conditions.length > 0) {
            query += ` WHERE ` + conditions.join(' AND ');
        }

        query += ` LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
        values.push(limit, offset);

        const { rows } = await pool.query(query, values);
        return rows;

    } catch (error) {
        throw new Error('Failed to fetch products: ' + error.message);
    }
}