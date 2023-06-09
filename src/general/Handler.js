const JsonResponse = require("./JsonResponse");

class Handler {
    notFound(data, callback) {
        return callback(JsonResponse.respondError('not found'), 404)
    }
}

module.exports = new Handler;