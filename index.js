const {ApolloServer} = require('apollo-server');
const typeDefs =require('./db/schema');
const resolvers =require('./db/resolvers');
const conectarDB = require('./config/db');
const jwt = require('jsonwebtoken');
require('dotenv').config({path: 'variables.env'});

//Conectar con la Base de datos
conectarDB();

const { ApolloServerPluginLandingPageGraphQLPlayground } = require('apollo-server-core');

//Servidor
const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({req}) => {
        //console.log(req.headers['authorization'])
        const token = req.headers['authorization'] || '';
        if(token) {
            try {
                const usuario = jwt.verify(token.replace('Bearer ', ''), process.env.SECRETA);
                
                return {
                    usuario
                }
                    
            } catch (error) {
                console.log(error)
            }
        }
    },
    plugins: [
        ApolloServerPluginLandingPageGraphQLPlayground({
          // options
        })
    ]
});

server.listen().then(({url}) => {
    console.log(`Servidor listo en la URL ${url}`)
})