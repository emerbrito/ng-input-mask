import { 
    RuleBase, 
    LiteralRule, 
    AlphanumericRule, 
    AlphanumericOrSpaceRule, 
    CharacterOrSpaceRule, 
    LettersRule, 
    DigitOrSpaceRule, 
    DigitRule, 
    LettersOrSpacesRule, 
    DigitSpaceOrSignRule, 
    CharacterRule, 
    RegExpRuleBase} from './format-rules';

export class FormatUtility{

    private _rules: RuleBase[] = [];
    private _mask: string;
    private _placeHolder: string;
    private _placeHolderChar: string = '_';
    private _formattedValue: string;
    private _cleanValue: string;
    private _maskLength: number = 0;
    private _nextIndex: number = 0;
    private _customRules: RuleBase[];
    private _allpatterns: string;
    private _customTests: RuleBase[];
    private _allregexp: RegExp;

    /**
     * A string containing the unformatted value.
     */
    get cleanValue(): string {
        return this._cleanValue || '';
    }  
    
    /**
     * User defined rules.
     */
    get customRules(): RuleBase[] {
        return this._customRules || [];
    }

    /**
     * A string containing the formatted value.
     */
    get formattedValue(): string {
        return this._formattedValue || '';
    }

    /**
     * Whether current value is invalid.
     */
    get invalid(): boolean {
        return !this.valid;
    }    

    /**
     * Current mask.
     */
    get mask(): string {
        return this._mask || '';
    }

    /**
     * Placeholder representing the mask.
     * E.g.: For (999) 999 placeholder will be (___) ___
     */
    get placeHolder(): string {
        return this._placeHolder || '';
    }

    /**
     * Internal rules generated by the mask.
     */
    get rules(): RuleBase[] {
        return this._rules || [];
    }

    /**
     * Whether current value is valid.
     */
    get valid(): boolean {

        if(!this.mask) {
            return true;
        }

        return this.formattedValue.length === this._maskLength;
    }

    /**
     * Instantiate object.
     * @param mask The mask to be used.
     * @param rules Array of custom (user defined) rules.
     */
    constructor(mask: string, rules?: RuleBase[]) {
        this._mask = mask;
        this._customRules = rules;
        this.parse(mask);
    }

    /**
     * Whether the charater is valid for the given mask.
     */
    validChar(char: string): boolean {

        let ok: boolean;

        if(!char) {
            return false;
        }

        if(this._allregexp) {
            ok = this._allregexp.test(char);
        }

        if(!ok && this._customTests.length > 0) {

            for(let i=0; i < this._customTests.length; i++) {
                ok = this._customTests[i].test(char);
                if(ok) break;
            }
        }

        return ok;
    }    

    /**
     * Set the current value. The target string will be sanitized and formatted.
     * Values (clean and formatted value) will be available through the corresponding properties.
     * @param target 
     */
    set(target: string): boolean {

        let chars: string[];
        let char: string;
        let literals: string = '';
        let fvalue: string = '';
        let cvalue: string = '';
        let rule: RuleBase;
                
        this.resetRules();
        rule = this.nextRule();

        if(!target || !this.mask) {
            this._formattedValue = target;
            this._cleanValue = target;
            return this.valid;
        }

        chars = target.split('');
        
        while(true) {

            char = chars.shift();          
            
            while(rule && rule.literal) {
                literals = literals.concat(rule.specifier);
                rule = this.nextRule();        
            }

            if(rule && rule.trySet(char)) {
                fvalue = fvalue.concat(literals, char);
                cvalue = cvalue.concat(char);
                literals = '';
                rule = this.nextRule();
            } 

            if(!char || !rule) {
                if(literals && !rule) {
                    fvalue = fvalue.concat(literals);
                }                
                break;
            }
            
        }

        this._cleanValue = cvalue;
        this._formattedValue = fvalue;

        return this.valid;
    }

    private appendCharValidation(rule: RuleBase): void {

        let pattern: string;
        let sep: string;

        if(rule instanceof LiteralRule) {
            return;
        }
        else if(rule instanceof RegExpRuleBase) {
            pattern = rule.pattern ? rule.pattern.source : '';
            if(pattern){
                sep = this._allpatterns.length > 0 ? '|' : '';
                pattern = `(?:${pattern})`;
                if(this._allpatterns.indexOf(pattern) < 0) {
                    this._allpatterns = this._allpatterns.concat(sep, pattern)
                }                
            }
        }        
        else {
            this._customTests.push(rule);
        }
    }

    private createRule(specifier: string): RuleBase {

        let rule: RuleBase;
        let pl: string = this._placeHolderChar;
        let literal: boolean;

        switch(specifier) {
            case 'A':
                rule = new AlphanumericRule();
                break;
            case 'a':
                rule = new AlphanumericOrSpaceRule();
                break;
            case 'C':
                rule = new CharacterOrSpaceRule();
                break;                                
            case 'L':
                rule = new LettersRule();
                break;
            case '0':
                rule = new DigitOrSpaceRule();
                break;                                
            case '9':
                rule = new DigitRule();
                break;
            case '?':
                rule = new LettersOrSpacesRule();
                break;                
            case '#':
                rule = new DigitSpaceOrSignRule();
                break;
            case '&':
                rule = new CharacterRule();
                break;
            default:
                
                if(specifier.length > 1 && specifier.indexOf('|') === 0) {
                    specifier = specifier.substr(1, 1);
                    literal = true;
                }
                else {
                    rule = this.matchCustom(specifier);
                    literal = (rule == null);
                }

                if(literal) {                    
                    rule = new LiteralRule(specifier);
                    pl = specifier;
                }
        }

        this._maskLength += 1;
        this._placeHolder = this._placeHolder.concat(pl);



        return rule;
    }

    private matchCustom(specifier: string): RuleBase {

        if(specifier == null) {
            return null;
        }  

        return this.customRules.find(r => r.specifier === specifier);
    }

    private parse(mask: string): void {

        let chars: string[];
        let char: string;
        let rule: RuleBase;

        this._rules = [];     
        this._placeHolder = '';
        this._maskLength = 0;
        this._allpatterns = '';
        this._customTests = [];
        this._allregexp = null;

        if(!mask) {
            return;
        }

        chars = mask.split('');   

        while(chars.length > 0) {

            char = chars.shift();

            if(char === '|') {
                if(chars.length != 0) {
                    char = char.concat(chars.shift())
                }                
            }            

            rule = this.createRule(char);
            this._rules.push(rule);
            this.appendCharValidation(rule);
        }

        if(this._allpatterns.length > 0) {
            this._allregexp = new RegExp(this._allpatterns);
        }
    }    
    
    private nextRule(): RuleBase {

        let rule = this.rules[this._nextIndex];
        this._nextIndex++;

        return rule;
    }

    private resetRules(): void {

        this._nextIndex = 0;
        this.rules.forEach(r => r.trySet(null));
    }

}