module.exports.Query = {
    products: (parent, args, {products}) => products,
    product: (parent, { id }, { products }) => products.filter(product => {
        return product.id === id
    })[0],
    categories: (parent, args, {categories}) => categories,
    category: (parent, {id}, {categories}) => categories.filter(category => {
        return category.id === id
    })[0],
}
