declare module "@credo/validator" {
    
    // EXCEPTIONS
    // --------------------------------------------------------------------------------------------
	export class Exception extends Error {
    	name: string;
		status: number;
		isCritical: boolean;
		
		constructor(message: string, status?: number, isCritical?: boolean);
	}
	
	export class BadRequestException extends Exception {
		constructor(message: string);
	}

	export class UnauthorizedException extends Exception {
		constructor(message: string);
	}

	export class ForbiddenException extends Exception {
		constructor(message: string);
	}

	export class NotFoundException extends Exception {
		constructor(message: string);
	}

	export class NotAllowedException extends Exception {
		constructor(message: string);
	}
	
	export class NotAcceptableException extends Exception {
		constructor(message: string);
	}
	
	export class UnsupportedContentException extends Exception {
		constructor(message: string);
	}
	
	export class NotReadyException extends Exception {
		constructor(message: string);
	}
	
	export class TooManyRequestsException extends Exception {
		constructor(message: string);
	}
    
	export class InternalServerError extends Exception {
    	cause: Error;
    
    	constructor(cause: Error, isCritical?: boolean);
    	constructor(message: string, isCritical?: boolean, cause?: Error);
	}

	export class ServiceUnavailableError extends Exception {
		constructor(message: string);
	}
	
    // VALIDATORS
    // --------------------------------------------------------------------------------------------
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

	export var validate: Validator;
}