const express = require('express');
const app = express();
const PORT = 7000;
const Data = require('./fake_data.json');
const {
  GraphQLObjectType,
  GraphQLSchema,
  GraphQLInt,
  GraphQLString,
  GraphQLNonNull,
  GraphQLList,
} = require('graphql');
const { graphqlHTTP } = require('express-graphql');

console.log(Data);

const DetailType = new GraphQLObjectType({
  name: 'detail',
  description: 'This is all detail',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    name: { type: GraphQLNonNull(GraphQLString) },
    socialid: { type: GraphQLNonNull(GraphQLInt) },
    social: {
      type: SocialType,
      resolve: (detail) => {
        return SocialType.find((social) => social.id === detail.socialid);
      },
    },
  }),
});

const SocialType = new GraphQLObjectType({
  name: 'social',
  description: 'This is all social media',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    socialmedia: { type: GraphQLNonNull(GraphQLString) },
  }),
});

const DataType = new GraphQLObjectType({
  name: 'twoThings',
  description: 'This is two information',
  fields: () => ({
    id: { type: GraphQLNonNull(GraphQLInt) },
    details: { type: GraphQLList(DetailType) },
    socials: { type: GraphQLList(SocialType) },
  }),
});

const RootQueryType = new GraphQLObjectType({
  name: 'Query',
  description: 'rootQuery',
  fields: () => ({
    Twothings: {
      type: new GraphQLList(DataType),
      description: 'List of All detail',
      resolve: () => Data,
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
