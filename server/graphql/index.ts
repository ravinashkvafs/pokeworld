import { GraphQLSchema } from "graphql";
const { graphqlHTTP } = require('express-graphql');
const Query = require('./query');

// const Mutation = new GraphQLObjectType({
//     name: 'Mutations',
//     fields: {
//         addArticle: {
//             type: ArticleType,
//             args: {
//                 name: { type: new GraphQLNonNull(GraphQLString) }
//             },
//             resolve(parent: any, args: any) {
//                 articles.push({ ...args, id: articles.length });
//                 return articles[articles.length - 1];
//             }
//         }
//     }
// });

const schema = new GraphQLSchema({
    query: Query,
    // mutation: Mutation
});

module.exports = function (app: any) {
    app.use(
        "/graphql",
        graphqlHTTP({
            schema: schema,
            graphiql: true,
        })
    );
};

// ref: https://www.section.io/engineering-education/build-a-graphql-server-using-nodejs/