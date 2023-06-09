const JsonResponse = require("../src/general/JsonResponse");

class HomeController {

    ping(data, callback) {
        return callback(JsonResponse.respondSuccess({ 'id': 1, 'name': 'obaida' }), 200)
    }
}

module.exports = new HomeController;