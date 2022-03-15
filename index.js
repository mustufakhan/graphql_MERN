const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const mongoose =  require('mongoose');
const typeDefs =  require('./typeDefs');
const resolvers = require('./resolvers');
const URL = 'mongodb+srv://mustufa:fNABWrRnP2WNbVGd@cluster0.99lrn.mongodb.net/myFirstDatabase?retryWrites=true&w=majority';

mongoose.connect(URL, {
  useUnifiedTopology: true,
  useNewUrlParser: true
},
()=>{
  console.log(' Db connected')
});


const startServer = async() => {
  const app = express();
  const apolloServer = new ApolloServer({
    typeDefs,
    resolvers,
  });
  await apolloServer.start();
  apolloServer.applyMiddleware({app:app});
  app.listen(4000,()=>{
    console.log('server is up and running at 4000')
  })
};

startServer()