import { NextFunction } from "express";
import * as request from 'request';

const resS = require('../utils/sendFormat.util');
const { getPokemonImageUrlFromId } = require('../utils/common.util');

const limit: number = process.env.POKE_DEFAULT_LIMIT ? parseInt(process.env.POKE_DEFAULT_LIMIT, 10) : 20;

async function getPokemonList(req: any, res: Response, next: NextFunction) {

    const { page = 1 } = req.query;

    const offset = (page - 1) * limit;

    request.get({ method: 'GET', uri: `${process.env.POKE_BASE_URL}pokemon?limit=${limit}&offset=${offset}`, json: true, }, (err: any, resp: any, body: any) => {
        if (err) resS.sendError(resS, 500, err?.message || 'Some Error Occured!', err);

        const list = body?.results?.map((e: any, i: number) => {
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

        Promise.all(list.map((i: any) => i?.promise))
            .then((values) => {
                values = values.reduce((acc, e) => {
                    acc[e?.name || ''] = {
                        id: e?.id,
                        image: e?.sprites?.front_default || getPokemonImageUrlFromId(e?.id),
                        types: e?.types?.map((type: any) => type?.type?.name)
                    };
                    return acc;
                }, {});

                return resS.send(res, 'Fetched!', list.map((pokemon: any) => {
                    return {
                        id: values[pokemon?.name]?.id || -1,
                        name: pokemon?.name,
                        image: values[pokemon?.name]?.image || '',
                        types: values[pokemon?.name]?.types || [],
                    };
                }));
            })
            .catch((err) => {
                return resS.sendError(resS, 500, err?.message || 'Some Error Occured!', err);
            });

    });

}

async function getSpecificPokemon(req: any, res: Response, next: NextFunction) {

    const { idOrName = 1 } = req.params;

    request.get({ method: 'GET', uri: `${process.env.POKE_BASE_URL}pokemon/${idOrName}`, json: true, }, (err: any, resp: any, body: any) => {
        if (err) resS.sendError(resS, 500, err?.message || 'Some Error Occured!', err);
        return resS.send(res, 'Fetched!', {
            id: body?.id || '',
            name: body?.name || '',
            types: body?.types?.map((type: any) => type?.type?.name),
            image: body?.sprites?.front_default || getPokemonImageUrlFromId(body?.id),
        });
    });

}

export {
    getPokemonList,
    getSpecificPokemon
};