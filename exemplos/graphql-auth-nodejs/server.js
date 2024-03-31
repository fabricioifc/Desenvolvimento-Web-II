const { ApolloServer, gql } = require('apollo-server');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Dados fictícios de usuários e cervejas
const users = [];
let beers = [];

// Chave secreta para geração de token JWT
const SECRET_KEY = 'sua_chave_secreta_aqui';

// Definição do schema GraphQL
const typeDefs = gql`
  type Query {
    me: User
    beers: [Beer]
  }

  type Mutation {
    register(username: String!, email: String!, password: String!): AuthPayload
    login(username: String!, password: String!): AuthPayload
    addBeer(name: String!, style: String!): Beer
    updateBeer(id: ID!, name: String, style: String): Beer
    deleteBeer(id: ID!): Beer
  }

  type AuthPayload {
    token: String
    user: User
  }

  type User {
    id: Int
    username: String
    email: String
  }

  type Beer {
    id: ID!
    name: String
    style: String
  }
`;

// Implementação dos resolvers
const resolvers = {
  Query: {
    me: (parent, args, context) => {
      return context.user;
    },
    beers: () => beers,
  },
  Mutation: {
    register: (parent, args, context) => {
      const { username, email, password } = args;
      const existingUser = users.find(u => u.username === username || u.email === email);
      if (existingUser) {
        throw new Error('Nome de usuário ou email já estão em uso.');
      }

      const hashedPassword = bcrypt.hashSync(password, 10); // Hash da senha antes de armazená-la no banco de dados
      const newUser = { id: users.length + 1, username, email, password: hashedPassword };
      users.push(newUser);
      
      // Gerar token JWT para o novo usuário registrado
      const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, { expiresIn: '1h' });

      return {
        token,
        user: newUser
      };
    },
    login: (parent, args, context) => {
      const { username, password } = args;
      const user = users.find(u => u.username === username);
      if (!user) {
        throw new Error('Usuário não encontrado');
      }

      const passwordMatch = bcrypt.compareSync(password, user.password);
      if (!passwordMatch) {
        throw new Error('Senha incorreta');
      }

      const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

      return {
        token,
        user
      };
    },
    addBeer: (parent, args, context) => {
      if (!context.user) {
        throw new Error('Usuário não autenticado');
      }

      const { name, style } = args;
      const newBeer = { id: beers.length + 1, name, style };
      beers.push(newBeer);
      return newBeer;
    },
    updateBeer: (parent, args, context) => {
      if (!context.user) {
        throw new Error('Usuário não autenticado');
      }

      const { id, name, style } = args;
      const index = beers.findIndex(beer => beer.id === parseInt(id));
      if (index === -1) {
        throw new Error('Cerveja não encontrada');
      }

      if (name) {
        beers[index].name = name;
      }

      if (style) {
        beers[index].style = style;
      }

      return beers[index];
    },
    deleteBeer: (parent, args, context) => {
      if (!context.user) {
        throw new Error('Usuário não autenticado');
      }

      const { id } = args;
      const index = beers.findIndex(beer => beer.id === parseInt(id));
      if (index === -1) {
        throw new Error('Cerveja não encontrada');
      }

      const deletedBeer = beers.splice(index, 1)[0];
      return deletedBeer;
    }
  }
};

// Middleware para verificar e extrair o token do cabeçalho de autorização
const contextMiddleware = ({ req }) => {
  const authHeader = req.headers.authorization;
  if (authHeader && authHeader.startsWith('Bearer ')) {
    const token = authHeader.split(' ')[1];
    try {
      const decoded = jwt.verify(token, SECRET_KEY);
      const userId = decoded.userId;
      const user = users.find(u => u.id === userId);
      return { user };
    } catch (error) {
      console.error('Erro ao verificar token:', error);
    }
  }
  return {};
};

// Configuração do servidor Apollo
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: contextMiddleware,
});

// Inicialização do servidor
server.listen().then(({ url }) => {
  console.log(`Servidor Apollo GraphQL rodando em ${url}`);
});


// const express = require('express');
// const { graphqlHTTP } = require('express-graphql');
// const { buildSchema } = require('graphql');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcryptjs');

// // Dados fictícios de usuários e cervejas
// const users = [];
// let beers = [];

// // Chave secreta para geração de token JWT
// const SECRET_KEY = 'sua_chave_secreta_aqui';

// // Definição do schema GraphQL
// const schema = buildSchema(`
//   type Query {
//     me: User
//     beers: [Beer]
//   }

//   type Mutation {
//     register(username: String!, email: String!, password: String!): AuthPayload
//     login(username: String!, password: String!): AuthPayload
//     addBeer(name: String!, style: String!): Beer
//     updateBeer(id: ID!, name: String, style: String): Beer
//     deleteBeer(id: ID!): Beer
//   }

//   type AuthPayload {
//     token: String
//     user: User
//   }

//   type User {
//     id: Int
//     username: String
//     email: String
//   }

//   type Beer {
//     id: ID!
//     name: String
//     style: String
//   }
// `);

// // Implementação dos resolvers
// const root = {
//   me: (args, context) => {
//     return context.user;
//   },
//   register: ({ username, email, password }) => {
//     const existingUser = users.find(u => u.username === username || u.email === email);
//     if (existingUser) {
//       throw new Error('Nome de usuário ou email já estão em uso.');
//     }

//     const hashedPassword = bcrypt.hashSync(password, 10); // Hash da senha antes de armazená-la no banco de dados
//     const newUser = { id: users.length + 1, username, email, password: hashedPassword };
//     users.push(newUser);
    
//     // Gerar token JWT para o novo usuário registrado
//     const token = jwt.sign({ userId: newUser.id }, SECRET_KEY, { expiresIn: '1h' });

//     return {
//       token,
//       user: newUser
//     };
//   },
//   login: ({ username, password }) => {
//     const user = users.find(u => u.username === username);
//     if (!user) {
//       throw new Error('Usuário não encontrado');
//     }

//     const passwordMatch = bcrypt.compareSync(password, user.password);
//     if (!passwordMatch) {
//       throw new Error('Senha incorreta');
//     }

//     const token = jwt.sign({ userId: user.id }, SECRET_KEY, { expiresIn: '1h' });

//     return {
//       token,
//       user
//     };
//   },
//   addBeer: ({ name, style }, context) => {
//     if (!context.user) {
//       throw new Error('Usuário não autenticado');
//     }

//     const newBeer = { id: beers.length + 1, name, style };
//     beers.push(newBeer);
//     return newBeer;
//   },
//   updateBeer: ({ id, name, style }) => {
//     if (!context.user) {
//       throw new Error('Usuário não autenticado');
//     }

//     const index = beers.findIndex(beer => beer.id === parseInt(id));
//     if (index === -1) {
//       throw new Error('Cerveja não encontrada');
//     }

//     if (name) {
//       beers[index].name = name;
//     }

//     if (style) {
//       beers[index].style = style;
//     }

//     return beers[index];
//   },
//   deleteBeer: ({ id }) => {
//     if (!context.user) {
//       throw new Error('Usuário não autenticado');
//     }

//     const index = beers.findIndex(beer => beer.id === parseInt(id));
//     if (index === -1) {
//       throw new Error('Cerveja não encontrada');
//     }

//     const deletedBeer = beers.splice(index, 1)[0];
//     return deletedBeer;
//   }
// };

// // Middleware para verificar e extrair o token do cabeçalho de autorização
// const authMiddleware = (req, res, next) => {
//   const authHeader = req.headers.authorization;
//   console.log('authHeader:', authHeader);
//   if (authHeader && authHeader.startsWith('Bearer ')) {
//     const token = authHeader.split(' ')[1];
//     try {
//       const decoded = jwt.verify(token, SECRET_KEY);
//       const userId = decoded.userId;
//       const user = users.find(u => u.id === userId);
//       req.user = user;
//     } catch (error) {
//       console.error('Erro ao verificar token:', error);
//     }
//   }
//   next();
// };

// // Configuração do servidor Express
// const app = express();
// app.use(authMiddleware);
// app.use('/graphql', graphqlHTTP((req, res, graphQLParams) => ({
//   schema: schema,
//   rootValue: root,
//   graphiql: true,
//   context: { user: req.user }
// })));

// // Inicialização do servidor
// const port = 4000;
// app.listen(port, () => {
//   console.log(`Servidor GraphQL rodando em http://localhost:${port}/graphql`);
// });