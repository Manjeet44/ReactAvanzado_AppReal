const {ApolloServer} = require('apollo-server');
const typeDefs =require('./db/schema');
const resolvers =require('./db/resolvers');
const conectarDB = require('./config/db');

//Conectar con la Base de datos
conectarDB();

const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

//Servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
          // options
        })
    ]
});

server.listen().then(({url}) => {
    console.log(`Servidor listo en la URL ${url}`)
})