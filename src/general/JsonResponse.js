class JsonResponse {
    respondSuccess(data = {}, message = 'success', status = true) {
        return {
            status: status,
            message: message,
            data: data
        };
    }

    respondError(message = 'error', data = {}, status = false) {
        return  {
            status: status,
            message: message,
            data: data
        };
    }
}

module.exports = new JsonResponse