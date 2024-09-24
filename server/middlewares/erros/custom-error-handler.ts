import { Request, Response, NextFunction } from "express";
import CustomError from "../../helpers/error/custom-error";

interface CustomErrorType extends Error {
    statusCode?: number;
    code?: number | string;
}

const customErrorHandler = (err: CustomErrorType, req: Request, res: Response, next: NextFunction) => {
    if (err.code == 11000) {
        err = new CustomError("Duplicate Field Value Enter", 404);
    }

    if (err.name === 'SyntaxError') {
        err = new CustomError('Unexpected Syntax', 400);
    }

    if (err.name === 'ValidationError') {
        err = new CustomError(err.message, 400);
    }

    if (err.name === "CastError") {
        err = new CustomError("Please provide a valid id", 400);
    }

    if (err.name === "TokenExpiredError") {
        err = new CustomError("Jwt expired", 401);
    }

    if (err.name === "JsonWebTokenError") {
        err = new CustomError("Jwt malformed", 401);
    }

    console.log("Custom Error Handler =>", err.name, err.message, err.statusCode);

    return res.status(err.statusCode || 500).json({
        success: false,
        error: err.message || "Server Error"
    });
};

export default customErrorHandler;
