export function APIKeyValidator(req, res, next) {
    var _a;
    var APIKey = (_a = req.headers["x-api-key"]) === null || _a === void 0 ? void 0 : _a.toString();
    if (!APIKey) {
        throw { type: "notFound", message: "api key dosent exist" };
    }
    next();
}
