const { gql } = require("apollo-server")

module.exports.typeDefs = gql`
    type Query {
        products(filter: ProductsFilterInput): [Product!]!
        product(id: ID!): Product
        categories: [Category!]!
        category(id: ID!): Category
    }
    type Mutation {
        addCategory(input: AddCategory!): Category!
        addProduct(input: AddProduct!): Product!
        addReview(input: AddReview!): Review!
        deleteCategory(id: ID!): Boolean!
        deleteProduct(id: ID!): Boolean!
        deleteReview(id: ID!): Boolean!
    }
    type Product {
        id: ID!
        name: String!
        description: String!
        quantity: Int!
        image: String!
        price: Float!
        onSale: Boolean!
        category: Category
        reviews: [Review!]!
    }
    type Category {
        id: ID!
        name: String!
        products(filter: ProductsFilterInput): [Product!]! 
    }
    type Review {
        id: ID!
        date: String!
        title: String!
        comment: String!
        rating: Int!
        productId: ID!
    }
    input ProductsFilterInput {
        onSale: Boolean
        avgRating: Float
    }
    input AddCategory {
        name: String!
    }
    input AddReview {
        id: ID!
        date: String!
        title: String!
        comment: String!
        rating: Int!
        productId: ID!

    }
    input AddProduct {
        name: String!
        description: String!
        quantity: Int!
        image: String!
        price: Float!
        onSale: Boolean!
        categoryId: ID
    }
`
