'use strict';
// INTERFACES
// ================================================================================================
export interface Validator {
    (condition: any, message: string): void;
    request?    : (condition: any, message: string) => void;
    exists?     : (condition: any, message: string) => void;
    authorized? : (condition: any, message: string) => void;
    content?    : (condition: any, message: string) => void;
    accepts?    : (condition: any, message: string) => void;
    allowed?    : (condition: any, message: string) => void;
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
		super(message, 400, false);
		this.name = 'Bad Request';
	}
}

export class UnauthorizedException extends Exception {
    constructor(message: string) {
        super(message, 401, false);
        this.name = 'Unauthorized';
    }
}

export class ForbiddenException extends Exception {
    constructor(message: string) { 
        super(message, 403, false);
        this.name = 'Forbidden';
    }
}

export class NotFoundException extends Exception {
    constructor(message: string) { 
        super(message, 404, false);
        this.name = 'Not Found';
    }
}

export class NotAllowedException extends Exception {
    constructor(message: string) {
        super(message, 405, false);
        this.name = 'Method Not Allowed';
    }
}

export class NotAcceptableException extends Exception {
    constructor(message: string) {
        super(message, 406, false);
        this.name = 'Not Acceptable';
    }
}

export class UnsupportedContentException extends Exception {
    constructor(message: string) {
        super(message, 415, false);
        this.name = 'Unsupported Media Type';
    }
}

export class TooManyRequestsException extends Exception {
    constructor(message: string) {
        super(message, 429, false);
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
export var validate: Validator = function(condition: any, message: string, isCritical?: boolean) {
    isCritical = typeof isCritical === 'boolean' ? isCritical : false ;
    if (!condition) throw new InternalServerError(message, isCritical);
} 

validate.request = function (condition: any, message: string) {
    if (!condition) throw new BadRequestException(message);
}

validate.exists = function (condition: any, message: string) {
    if (!condition) throw new NotFoundException(message);
}

validate.authorized = function (condition: any, message: string) {
    if (!condition) throw new UnauthorizedException(message);
}
    
validate.content = function (condition: any, message: string) {
    if (!condition) throw new UnsupportedContentException(message);
}
    
validate.accepts = function (condition: any, message: string) {
    if (!condition) throw new NotAcceptableException(message);
}

validate.allowed = function (condition: any, message: string) {
    if (!condition) throw new ForbiddenException(message);
}