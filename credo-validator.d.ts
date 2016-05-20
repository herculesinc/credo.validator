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
	export interface Validator {
		(condition: any, message?: string): void;
		request?    : (condition: any, message?: string) => void;
		exists?     : (condition: any, message?: string) => void;
		authorized? : (condition: any, message?: string) => void;
		content?    : (condition: any, message?: string) => void;
		accepts?    : (condition: any, message?: string) => void;
		allowed?    : (condition: any, message?: string) => void;
		ready?      : (condition: any, message?: string) => void;
	}
	
	export var validate: Validator;
}