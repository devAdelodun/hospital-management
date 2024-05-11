import { constants } from "../constants.js";

export const errorHandler = (err, req, res, next) => {
    const statusCode = res.statusCode || constants.SERVER_ERROR;

    switch (statusCode) {
        case constants.BAD_REQUEST:
            res.status(constants.BAD_REQUEST).json({
                title: "BAD REQUEST",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.CONFLICT:
            res.status(constants.CONFLICT).json({
                title: "CONFLICT",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.FORBIDDEN:
            res.status(constants.FORBIDDEN).json({
                title: "FORBIDDEN",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.NOT_FOUND:
            res.status(constants.NOT_FOUND).json({
                title: "NOT FOUND",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.SERVER_ERROR:
            res.status(constants.SERVER_ERROR).json({
                title: "SERVER ERROR",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        case constants.UNAUTHORIZED:
            res.status(constants.UNAUTHORIZED).json({
                title: "UNAUTHORIZED",
                message: err.message,
                stackTrace: err.stack
            });
            break;
        default:
            console.log("All good, no error");
            break;
    }
};
