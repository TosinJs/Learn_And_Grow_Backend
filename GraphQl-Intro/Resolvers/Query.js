module.exports.Query = {
    products: (parent, { filter = {} }, {products, reviews}) => {
        const { onSale, avgRating } = filter;
        let filteredProducts = products;
        if (Object.keys(filter).length) {
            if (onSale) {
                filteredProducts = filteredProducts.filter(product => product.onSale === onSale)
            }
            if ([1,2,3,4,5].includes(avgRating)) {
                filteredProducts = filteredProducts.filter(product => {
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
        return filteredProducts
    },
    product: (parent, { id }, { products }) => products.filter(product => {
        return product.id === id
    })[0],
    categories: (parent, args, {categories}) => categories,
    category: (parent, {id}, {categories}) => categories.filter(category => {
        return category.id === id
    })[0],
}
