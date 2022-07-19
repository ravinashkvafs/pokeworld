import * as request from 'request';

module.exports = {
    getPokemonImageUrlFromId: function (id: number) {
        return `${process.env.POKE_BASE_IMAGE_URL}${id}${process.env.POKE_BASE_IMAGE_URL_EXTN}`;
    },
    requestSync: function (config: any) {
        return new Promise((resolve, reject) => {
            request.get(config, (err: any, resp: any, body: any) => {
                if (err) return reject(err);
                resolve(body);
            });
        });
    },
};