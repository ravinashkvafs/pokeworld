import { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLList, GraphQLNonNull, GraphQLArgumentConfig } from "graphql";

const { PokemonType } = require('./type');
const { getPokemonListResolve } = require('../handlers/pokemon.handler');

const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        healthCheck: {
            type: GraphQLString,
            resolve: () => 'Welcome to GraphQL!'
        },
        pokemon: {
            type: new GraphQLList(PokemonType),
            args: {
                page: <GraphQLArgumentConfig>{
                    type: new GraphQLNonNull(GraphQLID), description: 'Page Number > 0'
                }
            },
            resolve: getPokemonListResolve,
        },
    }
});

module.exports = RootQuery;
