const { v4: uuid } = require("uuid");

module.exports.Mutation = {
    addCategory: (parent, { input }, { categories }) => {
        const newCategory = {...input, id: uuid()}
        categories.push(newCategory)
        return newCategory
    },
    addProduct: (parent, { input }, { products }) => {
        const newProduct = {...input, id:uuid() }
        products.push(newProduct)
        return newProduct
    },
    addReview: (parent, { input }, { reviews }) => {
        const newReview = { ...input, id:uuid() }
        reviews.push(newReview)
        return newReview
    },
    deleteCategory: (parent, { id }, { categories, products }) => {
        categories = categories.filter(category => category.id !== id)
        products = products.map(product => {
            if(product.categoryId === id) {
                return {...product, categoryId: null}
            }
            return product
        })
    }
}