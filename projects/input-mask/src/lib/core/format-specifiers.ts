export interface FormatSpecifier {
    invalid: boolean;
    specifier: string;
    valid: boolean;
    value: () => string;    
}

export interface DynFormatSpecifier extends FormatSpecifier {
    set: (source: string) => boolean;
    clear: () => void;
}

export class AlphaNumericSpecifier implements DynFormatSpecifier {

    private _pattern = /[a-zA-Z0-9]/m;
    private _value: string;

    get invalid(): boolean {
        return !this.valid;
    }    

    get specifier(): string {
        return 'A';
    }

    get valid(): boolean {
        return this._value != null;
    }    

    clear(): void {
        this._value = undefined;
    }

    set(source: string): boolean {

        if(this._pattern.test(source)){
            this._value = source;
            return true;
        }
        else {
            this._value = undefined;
        };

        return false;
    }

    value(): string {
        return this._value;
    }
}

export class ConstantSpecifier implements FormatSpecifier {

    get invalid(): boolean {
        return false;
    }    

    get specifier(): string {
        return this.constant || '';
    }

    get valid(): boolean {
        return true;
    }    

    constructor(private constant: string) {
        if(!constant) {
            throw new Error('Argument "constant" is required.');
        }
    }    

    value(): string {
        return this.constant;
    }
}

export class DigitSpecifier implements DynFormatSpecifier {

    private _pattern = /\d/m;
    private _value: string;

    get invalid(): boolean {
        return !this.valid;
    }    

    get specifier(): string {
        return '9';
    }

    get valid(): boolean {
        return this._value != null;
    }    

    clear(): void {
        this._value = undefined;
    }

    set(source: string): boolean {

        if(this._pattern.test(source)){
            this._value = source;
            return true;
        }
        else {
            this._value = undefined;
        };

        return false;
    }

    value(): string {
        return this._value;
    }

}

export class LetterSpecifier implements DynFormatSpecifier {

    private _pattern = /[a-zA-Z]/m;
    private _value: string;

    get invalid(): boolean {
        return !this.valid;
    }    

    get specifier(): string {
        return 'L';
    }

    get valid(): boolean {
        return this._value != null;
    }    

    clear(): void {
        this._value = undefined;
    }

    set(source: string): boolean {

        if(this._pattern.test(source)){
            this._value = source;
            return true;
        }
        else {
            this._value = undefined;
        };

        return false;
    }

    value(): string {
        return this._value;
    }
}