export const INPUTMASK_PARSE_ERROR: string = 'inputMaskParse';

export interface MaskEvent {
    mask: string,
    placeHolder: string,
    value: string,
    cleanValue: string
}

/**
 * Rule base class. 
 * When using it to create your own rule you must override the 'test()' method.
 */
export class RuleBase {

    private _currentValue: string;

    valid: boolean = false;

    get currentValue(): string {
        return this._currentValue || '';
    }

    get literal(): boolean {
        return false;
    }

    get specifier(): string {
        return this.specifierChar;
    }

    constructor(protected specifierChar: string) {}

    test(value: string): boolean {      
        throw new Error('Method not implemented: test()');
    }

    trySet(value: string): boolean {
        
        let success: boolean = false;

        if(this.test(value)){
            success = true;
            this._currentValue = value;            
        }
        else {
            this._currentValue = '';
        }

        this.valid = success;
        return success
    }      

}

/**
 * Base class for Regular Expression based rules. 
 * When using it to create your own rule pass the 'specifier' and custom regex
 * through the constructor. No need to override any methods.
 */
export class RegExpRuleBase extends RuleBase  {

    get pattern(): RegExp {
        return this.regex;        
    }

    constructor(
        protected specifierChar: string, 
        protected regex: RegExp
    ) {
        super(specifierChar)
    }

    test(value: string): boolean {      
        return this.regex.test(value);        
    }

}