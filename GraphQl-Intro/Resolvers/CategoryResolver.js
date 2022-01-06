module.exports.Category = {
    products: ({ id: categoryId }, { filter = {} }, {products, reviews}) => {
        const { onSale, avgRating } = filter;
        let filteredCategoryProducts = products.filter(product => product.categoryId === categoryId)
        if (Object.keys(filter).length) {
            if (onSale) {
                filteredCategoryProducts = filteredCategoryProducts.filter(product => product.onSale === onSale)
            }
            if ([1,2,3,4,5].includes(avgRating)) {
                filteredCategoryProducts = filteredCategoryProducts.filter(product => {
                    let totalRating = 0
                    let count = 0
                    reviews.map(review => {
                        if (review.productId === product.id) {
                            count++
                            totalRating += review.rating
                        }
                    })
                    return totalRating/count >= avgRating
                })
            }
        }
        return filteredCategoryProducts
    }
}