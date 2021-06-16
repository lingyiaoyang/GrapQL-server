const express = require('express');
const app = express();
const PORT = 7000;
const userData = require('./fake_data.json');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');
const { graphqlHTTP } = require('express-graphql');

const DetailType = new GraphQLObjectType({
  name: 'detail',
  description: 'This is detail information',
  fields: () => ({
    // id: { type: new GraphQLNonNull(GraphQLInt) },
    details: { type: new GraphQLNonNull(GraphQLString) },
    // career: { type: new GraphQLNonNull(GraphQLString) },
    // socialId: { type: new GraphQLNonNull(GraphQLInt) },
  }),
});

// const SocialType = new GraphQLObjectType({
//   name: 'socialMedia',
//   description: 'This is detail information',
//   fields: () => ({
//     id: { type: new GraphQLNonNull(GraphQLInt) },
//     socialMedia: { type: new GraphQLNonNull(GraphQLString) },
//   }),
// });

const DataType = new GraphQLObjectType({
  name: 'data',
  description: 'This is details and socialMedias',
  fields: () => ({
    detail: { type: new GraphQLList(DetailType) },
    // socialMedia: { type: new GraphQLList(SocialType) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'rootQuery',
  description: 'This is rootQuery',
  fields: () => ({
    list: {
      type: new GraphQLList(DataType),
      description: 'List of All information',
      resolve: () => userData,
    },
  }),
});

const schema = new GraphQLSchema({
  query: RootQueryType,
  // mutation: RootMutationType,
});

app.use(
  '/graphql',
  graphqlHTTP({
    graphiql: true,
    schema: schema,
  })
);
app.listen(PORT, () => {
  console.log('Server running');
});
// const UserType = new GraphQLObjectType({
//   name: 'User',
//   fields: () => {
//     id: {
//       type: GraphQLInt;
//     }
//     name: {
//       type: GraphQLString;
//     }
//     career: {
//       type: GraphQLString;
//     }
//   },
// });

// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     getAllUsers: {
//       type: new GraphQLList(UserType),
//       args: { id: { type: GraphQLInt } },
//       resolve(parent, args) {
//         return userData;
//       },
//     },
//   },
// });
// const Mutation = new GraphQLObjectType({
//   name: 'Mutation',
//   fields: {
//     createUser: {
//       type: UserType,
//       args: {
//         name: { type: GraphQLString },
//         career: { type: GraphQLString },
//       },
//       resolve(parent, args) {
//         userData.push({
//           id: userData.length + 1,
//           name: args.name,
//           career: args.career,
//         });
//         return args;
//       },
//     },
//   },
// });

// const schema = new GraphQLSchema({ query: RootQuery, mutation: Mutation });

// app.use(
//   '/graphql',
//   graphqlHTTP({
//     schema,
//     graphiql: true,
//   })
// );
