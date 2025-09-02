export const getProductsController = async (req, res, next) => {
    try {
        const {
            limit = 10,
            offset = 0,
            productIds,
            categoryIds,
            minPrice,
            maxPrice,
            searchQuery
        } = req.query;

        const products = await getAllProductsService(
            parseInt(limit),
            parseInt(offset),
            productIds ? productIds.split(',').map(id => parseInt(id)) : undefined,
            categoryIds ? categoryIds.split(',').map(id => parseInt(id)) : undefined,
            minPrice ? parseFloat(minPrice) : undefined,
            maxPrice ? parseFloat(maxPrice) : undefined,
            searchQuery
        );

        res.json(new AppResponse({
            message: 'Products fetched successfully',
            statusCode: 200,
            data: products,
        }));
    } catch (error) {
        next(error);
    }
}