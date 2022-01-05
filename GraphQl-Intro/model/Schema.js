const { gql } = require("apollo-server")

module.exports.typeDefs = gql`
    type Query {
        products: [Product!]!
        product(id: ID!): Product
        categories: [Category!]!
        category(id: ID!): Category
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
    }
    type Category {
        id: ID!
        name: String
        products: [Product!]! 
    }
`
