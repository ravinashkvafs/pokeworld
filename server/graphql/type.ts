import { GraphQLID, GraphQLList, GraphQLObjectType, GraphQLString } from "graphql";

const PokemonType: any = new GraphQLObjectType({
    name: 'Pokemon',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        image: { type: GraphQLString },
        types: { type: new GraphQLList(GraphQLString) }
    })
});

module.exports = {
    PokemonType: PokemonType
};