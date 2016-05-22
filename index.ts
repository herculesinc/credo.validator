// INTERFACES
// ================================================================================================
export interface BaseValidator {
    (condition: any, message: string): void;
    from?: (error: Error) => void;
}

export interface Validator extends BaseValidator {
    request?    : BaseValidator;
    exists?     : BaseValidator;
    authorized? : BaseValidator;
    content?    : BaseValidator;
    accepts?    : BaseValidator;
    allowed?    : BaseValidator;
    ready?      : BaseValidator;
}

// BASE EXCEPTION DEFINITION
// ================================================================================================
export class Exception extends Error {
	name: string;
	status: number;
    isCritical: boolean;
    
	constructor(message: string, status?: number, isCritical?: boolean) {
        super(message);
		this.name = 'Exception';
        this.status = status || 500;
        
        this.isCritical = typeof isCritical === 'boolean' ? isCritical : true;
        (Error as any).captureStackTrace(this, this.constructor);
	}
}

// CLIENT ERRORS
// ================================================================================================
export class BadRequestException extends Exception {
	constructor(message: string) {
		super(message || 'Bad Request', 400, false);
		this.name = 'Bad Request';
	}
}

export class UnauthorizedException extends Exception {
    constructor(message: string) {
        super(message || 'Unauthorized', 401, false);
        this.name = 'Unauthorized';
    }
}

export class ForbiddenException extends Exception {
    constructor(message: string) { 
        super(message || 'Forbidden', 403, false);
        this.name = 'Forbidden';
    }
}

export class NotFoundException extends Exception {
    constructor(message: string) { 
        super(message || 'Not Found', 404, false);
        this.name = 'Not Found';
    }
}

export class NotAllowedException extends Exception {
    constructor(message: string) {
        super(message || 'Method Not Allowed', 405, false);
        this.name = 'Method Not Allowed';
    }
}

export class NotAcceptableException extends Exception {
    constructor(message: string) {
        super(message || 'Not Acceptable', 406, false);
        this.name = 'Not Acceptable';
    }
}

export class UnsupportedContentException extends Exception {
    constructor(message: string) {
        super(message || 'Unsupported Media Type', 415, false);
        this.name = 'Unsupported Media Type';
    }
}

export class NotReadyException extends Exception {
    constructor(message: string) {
        super(message || 'Not Ready', 425, false);
        this.name = 'Not Ready';
    }
}

export class TooManyRequestsException extends Exception {
    constructor(message: string) {
        super(message || 'Too Many Requests', 429, false);
        this.name = 'Too Many Requests';
    }
}

// SERVER ERRORS
// ================================================================================================
export class InternalServerError extends Exception {
    cause: Error;
    
    constructor(cause: Error, isCritical?: boolean);
    constructor(message: string, isCritical?: boolean, cause?: Error);
    constructor(messageOrCause: string | Error, isCritical?: boolean, cause?: Error) {
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

export class ServiceUnavailableError extends Exception {
    constructor(message: string) {
        super(message, 503, false);
        this.name = 'Service Unavailable';
    }
}

// VALIDATORS
// ================================================================================================
export var validate: Validator = function(condition: any, message?: string, isCritical?: boolean) {
    isCritical = typeof isCritical === 'boolean' ? isCritical : false ;
    if (!condition) throw new InternalServerError(message, isCritical);
} 

validate.from = function(error: Error) {
    if (error) throw new InternalServerError(error.message, false);
}

// REQUEST
// ------------------------------------------------------------------------------------------------
validate.request = function (condition: any, message?: string) {
    if (!condition) throw new BadRequestException(message);
}

validate.request.from = function (error: Error) {
    if (error) throw new BadRequestException(error.message);
}

// EXISTS
// ------------------------------------------------------------------------------------------------
validate.exists = function (condition: any, message?: string) {
    if (!condition) throw new NotFoundException(message);
}

validate.exists.from = function (error: Error) {
    if (error) throw new NotFoundException(error.message);
}

// AUTOHRIZED
// ------------------------------------------------------------------------------------------------
validate.authorized = function (condition: any, message?: string) {
    if (!condition) throw new UnauthorizedException(message);
}

validate.authorized.from = function (error: Error) {
    if (error) throw new UnauthorizedException(error.message);
}

// CONTENT
// ------------------------------------------------------------------------------------------------
validate.content = function (condition: any, message?: string) {
    if (!condition) throw new UnsupportedContentException(message);
}

validate.content.from = function (error: Error) {
    if (error) throw new UnsupportedContentException(error.message);
}

// ACCEPTS
// ------------------------------------------------------------------------------------------------
validate.accepts = function (condition: any, message?: string) {
    if (!condition) throw new NotAcceptableException(message);
}

validate.accepts.from = function (error: Error) {
    if (error) throw new NotAcceptableException(error.message);
}

// ALLOWED
// ------------------------------------------------------------------------------------------------
validate.allowed = function (condition: any, message?: string) {
    if (!condition) throw new ForbiddenException(message);
}

validate.allowed.from = function (error: Error) {
    if (error) throw new ForbiddenException(error.message);
}

// REQUEST
// ------------------------------------------------------------------------------------------------
validate.ready = function (condition: any, message?: string) {
    if (!condition) throw new NotReadyException(message);
}

validate.ready.from = function (error: Error) {
    if (error) throw new NotReadyException(error.message);
}