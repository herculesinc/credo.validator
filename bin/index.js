'use strict';
// BASE EXCEPTION DEFINITION
// ================================================================================================
class Exception extends Error {
    constructor(message, status, isCritical) {
        super(message);
        this.name = 'Exception';
        this.status = status || 500;
        this.isCritical = typeof isCritical === 'boolean' ? isCritical : true;
        Error.captureStackTrace(this, this.constructor);
    }
}
exports.Exception = Exception;
// CLIENT ERRORS
// ================================================================================================
class BadRequestException extends Exception {
    constructor(message) {
        super(message, 400, false);
        this.name = 'Bad Request';
    }
}
exports.BadRequestException = BadRequestException;
class UnauthorizedException extends Exception {
    constructor(message) {
        super(message, 401, false);
        this.name = 'Unauthorized';
    }
}
exports.UnauthorizedException = UnauthorizedException;
class ForbiddenException extends Exception {
    constructor(message) {
        super(message, 403, false);
        this.name = 'Forbidden';
    }
}
exports.ForbiddenException = ForbiddenException;
class NotFoundException extends Exception {
    constructor(message) {
        super(message, 404, false);
        this.name = 'Not Found';
    }
}
exports.NotFoundException = NotFoundException;
class NotAllowedException extends Exception {
    constructor(message) {
        super(message, 405, false);
        this.name = 'Method Not Allowed';
    }
}
exports.NotAllowedException = NotAllowedException;
class NotAcceptableException extends Exception {
    constructor(message) {
        super(message, 406, false);
        this.name = 'Not Acceptable';
    }
}
exports.NotAcceptableException = NotAcceptableException;
class UnsupportedContentException extends Exception {
    constructor(message) {
        super(message, 415, false);
        this.name = 'Unsupported Media Type';
    }
}
exports.UnsupportedContentException = UnsupportedContentException;
class TooManyRequestsException extends Exception {
    constructor(message) {
        super(message, 429, false);
        this.name = 'Too Many Requests';
    }
}
exports.TooManyRequestsException = TooManyRequestsException;
// SERVER ERRORS
// ================================================================================================
class InternalServerError extends Exception {
    constructor(messageOrCause, isCritical, cause) {
        if (typeof messageOrCause === 'string') {
            super(cause ? `${messageOrCause}: ${cause.message}` : messageOrCause, 500, isCritical);
            this.cause = cause;
        }
        else {
            super(messageOrCause.message, 500, isCritical);
            this.cause = messageOrCause;
        }
        this.name = 'Internal Server Error';
    }
}
exports.InternalServerError = InternalServerError;
class ServiceUnavailableError extends Exception {
    constructor(message) {
        super(message, 503, false);
        this.name = 'Service Unavailable';
    }
}
exports.ServiceUnavailableError = ServiceUnavailableError;
// VALIDATORS
// ================================================================================================
exports.validate = function (condition, message, isCritical) {
    isCritical = typeof isCritical === 'boolean' ? isCritical : false;
    if (!condition)
        throw new InternalServerError(message, isCritical);
};
exports.validate.request = function (condition, message) {
    if (!condition)
        throw new BadRequestException(message);
};
exports.validate.exists = function (condition, message) {
    if (!condition)
        throw new NotFoundException(message);
};
exports.validate.authorized = function (condition, message) {
    if (!condition)
        throw new UnauthorizedException(message);
};
exports.validate.content = function (condition, message) {
    if (!condition)
        throw new UnsupportedContentException(message);
};
exports.validate.accepts = function (condition, message) {
    if (!condition)
        throw new NotAcceptableException(message);
};
exports.validate.allowed = function (condition, message) {
    if (!condition)
        throw new ForbiddenException(message);
};
//# sourceMappingURL=index.js.map