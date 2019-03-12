import { FormatSpecifier, ConstantSpecifier, DynFormatSpecifier, DigitSpecifier, LetterSpecifier, AlphaNumericSpecifier } from './format-specifiers';

export class FormatHelper {

    private _formattedValue: string;
    private _cleanValue: string;
    private _specifiers: FormatSpecifier[] = [];
    private _maxInputLength: number;
    private _placeHolder: string;

    get cleanValue(): string {
        return this._cleanValue || '';
    }    

    get placeHolder(): string {
        return this._placeHolder || '';
    }

    get valid(): boolean {
        return this.value.length === this.mask.length;
    }

    get value(): string {
        return this._formattedValue;
    }

    constructor(private mask: string) {
        if(!mask) {
            throw new Error('Argument "mask" is required.')
        }
        this.init();
    }

    apply(target: string): string {        

        let slength: number;
        let fs: FormatSpecifier;
        let chars: string[];
        let char: string;
        let matchFound: boolean;
        let constants: string;

        this.clear();
        if(!target) {            
            return target;
        }

        constants = '';
        chars = target.split('');        
        slength = this._specifiers.length;

        for(let i=0; i < slength; i++) {

            fs = this._specifiers[i];
            matchFound = false;            

            if(fs instanceof ConstantSpecifier) {           
                constants = constants.concat(fs.value());
                continue;
            }            
            else {
                while(chars.length > 0 && !matchFound) {
                    char = chars.shift();
                    if((fs as DynFormatSpecifier).set(char)) {
                        this._cleanValue = this._cleanValue.concat(char);
                        this._formattedValue = this._formattedValue.concat(constants, char);
                        constants = '';
                        matchFound = true;
                    }
                }
            }
        }

        if(constants && this._cleanValue.length === this._maxInputLength) {
            this._formattedValue = this.value.concat(constants);
        }

        return this.value;
    }

    private clear(): void {

        this._specifiers.forEach((s: DynFormatSpecifier) => {
            if(s.clear) {
                s.clear();
            }
        });
        
        this._formattedValue = '';
        this._cleanValue = '';
    }

    private init(): void {

        let length = this.mask.length;
        let char: string;

        if(length === 0) {
            return;
        }

        this._maxInputLength = 0;
        for(let i=0; i < length; i++) {
            char = this.mask[i];
            switch(char){
                case '9':
                    this._maxInputLength += 1;
                    this._specifiers.push(new DigitSpecifier());
                    break;
                case 'A':
                    this._maxInputLength += 1;
                    this._specifiers.push(new AlphaNumericSpecifier());
                    break;
                case 'L':
                    this._maxInputLength += 1;
                    this._specifiers.push(new LetterSpecifier());
                    break;                    
                default:
                    this._specifiers.push(new ConstantSpecifier(char));
                    break;                
            }
        }

        this.setPlaceHolder();
    }

    private setPlaceHolder(): void {

        this._placeHolder = '';

        this._specifiers.forEach(s => {

            if(s instanceof ConstantSpecifier) {
                this._placeHolder = this._placeHolder.concat(s.specifier)
            }
            else {
                this._placeHolder = this._placeHolder.concat('_')
            }
        });
    }
}
