const http = require('http');
const url = require('url');
const config = require('./config');

const server = http.createServer((req, res) => {

    const parsedUrl = url.parse(req.url, true);
    const trimmedPath = parsedUrl.pathname.replace(/^\/+|\/+$/g, '');

    const handler = typeof(router[trimmedPath]) !== 'undefined' 
        ? router[trimmedPath] 
        : handlers.notFound;

    const data = {
        'trimmedPath': trimmedPath
    }

    handler(data, (statusCode, payload) => {
        statusCode = typeof(statusCode) === 'number' ? statusCode : 200;
        payload = typeof(payload) == 'object' ? payload : {};

        const payloadJson = JSON.stringify(payload);

        res.setHeader('Content-Type', 'application/json');
        res.writeHead(statusCode);
        res.end(payloadJson);
    });

    console.log(`Request received to path '${trimmedPath}'`);
});

server.listen(config.httpPort, () => {
    console.log(`Server is listening on port ${config.httpPort}`);
});

const handlers = {};

handlers.notFound = (data, callback) => {
    callback(404, { 'message': `Path '${data.trimmedPath}' not found.` });
};

handlers.hello = (data, callback) => {
    callback(200, { 'message': 'Hello World!' });
};

const router = {
    'hello': handlers.hello
}