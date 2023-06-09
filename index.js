const http = require('http');
const url = require('url');
const string_decoder = require('string_decoder')
const router = require('./router');
const Handler = require('./src/general/Handler');
const config = require('./src/config/index');


const server = http.createServer(function (request, response) {
    let data = getDataFromRequest(request)

    // get body
    let decoder = new string_decoder.StringDecoder('utf-8')
    let body = ''
    request.on('data', function (data) {
        body += decoder.write(data);
    })

    request.on('end', function () {
        data[body] = JSON.parse(body);

        // wrap to handler method
        var responseHandler = router[data.urlPath] !== undefined ? router[data.urlPath] : Handler.notFound;

        console.log(data.method + ' ' + data.urlPath + ' ---------------------- function name [' + responseHandler.name + '] ---------------------- at:' + (new Date()).toLocaleTimeString());

        // write response
        writeResponse(response, data, responseHandler)
        console.log(data.method + ' ' + data.urlPath + ' ---------------------- closed');

        // end response
        response.end();
    })
})

server.listen(3000, function () {
    console.log('server is runnig on port 3000 ....');
})

function getDataFromRequest(request) {
    // get request method
    let method = request.method;

    // get url path and query params
    let urlParser = url.parse(request.url, true);
    let urlPath = urlParser.pathname;
    let params = urlParser.query;

    // get headers
    let headers = request.headers;

    return {
        method: method,
        urlPath: urlPath,
        params: params,
        headers: headers,
    };
}

function writeResponse(response, data, responseHandler) {
    responseHandler(data, function (payload = {}, statusCode = 200) {
        response.setHeader('Content-Type', 'application/json');
        response.writeHead(statusCode);
        response.write(JSON.stringify(payload))
    })
}