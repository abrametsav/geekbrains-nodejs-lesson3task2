'use strict';

const request = require( 'request' );
const urlUtils = require( 'url' );
const http = require( 'http' );

http.createServer( (req, res) => {
    const text = urlUtils.parse(req.url, true).query.text;
    res.writeHead( 200, {"content-type" : "text/html"} );
    res.write( '<html><head><title>MiniTranslator</title><meta charset="utf-8"/></head>' );
    getTranslate( text, res );
}).listen( 5000 );

function getTranslate( text, res ) {
    const apiKey = 'trnsl.1.1.20160402T194715Z.af3cd6659bf20581.ff6fb5aa234633123721e33b291be2805c0a30f2';
    const url = 'https://translate.yandex.net/api/v1.5/tr.json/translate?key=' + apiKey + '&lang=en-ru' + '&text=' + text;
    request( url, ( error, response, body ) => {
        if( error ) {
            console.log( error );
            res.write( 'Error happend!' );
            res.end();
            return;
        };
        if( response.statusCode != 200 ) {
            res.write( 'Ошибка! Сервер вернул статус "' + response.statusCode + '"' );
            res.end();
            return;
        }
        const answer = JSON.parse( body ).text[0];
        res.write( answer );
        res.end();
    });
}