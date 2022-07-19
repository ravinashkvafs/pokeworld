import { NextFunction } from "express";
import * as request from 'request';

const resS = require('../utils/sendFormat.util');
const { getPokemonImageUrlFromId, requestSync } = require('../utils/common.util');

const limit: number = process.env.POKE_DEFAULT_LIMIT ? parseInt(process.env.POKE_DEFAULT_LIMIT, 10) : 20;

async function getPokemonListResolve(parent: any, args: any) {

    const { page = 1 } = args;

    const offset = (page - 1) * limit;

    const { results = [] } = (await requestSync({ method: 'GET', uri: `${process.env.POKE_BASE_URL}pokemon?limit=${limit}&offset=${offset}`, json: true, })) || {};

    const list = results?.map((e: any, i: number) => {
        return {
            name: e?.name || '',
            promise: new Promise((resolve: any, reject: any) => {
                request.get({ method: 'GET', uri: `${process.env.POKE_BASE_URL}pokemon-form/${e?.name || ''}`, json: true, }, (err: any, resp: any, body: any) => {
                    if (err) return reject(err);
                    return resolve(body);
                });
            })
        };
    });

    let values = await Promise.all(list.map((i: any) => i?.promise));

    values = values.reduce((acc, e) => {
        acc[e?.name || ''] = {
            id: e?.id,
            image: e?.sprites?.front_default || getPokemonImageUrlFromId(e?.id),
            types: e?.types?.map((type: any) => type?.type?.name)
        };
        return acc;
    }, {});

    return list.map((pokemon: any) => {
        return {
            id: values[pokemon?.name]?.id || -1,
            name: pokemon?.name,
            image: values[pokemon?.name]?.image || '',
            types: values[pokemon?.name]?.types || [],
        };
    });

}

export {
    getPokemonListResolve,
    // getSpecificPokemon
};