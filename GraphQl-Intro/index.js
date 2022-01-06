const { ApolloServer } = require("apollo-server");
const { categories, products, reviews } = require("./data");
const { typeDefs } = require("./model/Schema");
const { Category } = require("./Resolvers/CategoryResolver");
const { Mutation } = require("./Resolvers/Mutation");
const { Product } = require("./Resolvers/ProductResolver");
const { Query } = require("./Resolvers/Query");

const server = new ApolloServer({
    typeDefs,
    resolvers: {
        Query, Category, Product, Mutation
    },
    context: { categories, products, reviews }
}); 
const startServer = async () => {
    try {
        const { url } = await server.listen();
        console.log(`Server is ready at ${url}`)
    } catch (error) {
        console.log("error")
        process.exit = 1
    }
}

startServer()