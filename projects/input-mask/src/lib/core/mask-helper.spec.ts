import { RegExpRuleBase } from '../common-models';
import { MaskHelper } from "./mask-helper";
import { 
    LiteralRule, 
    AlphanumericRule, 
    AlphanumericOrSpaceRule, 
    CharacterOrSpaceRule, 
    LettersRule, 
    DigitOrSpaceRule, 
    DigitRule, 
    LettersOrSpacesRule, 
    DigitSpaceOrSignRule, 
    CharacterRule} from './mask-rules';

class GreaterLessThanRule extends RegExpRuleBase {
    constructor() {
        super('!', new RegExp(/^[<>]$/));
    }
}

describe('MaskHelper', () => {

    it('create instance of AlphanumericRule', () => {
        let helper = new MaskHelper('A');        
        expect(helper.rules[0]).toEqual(jasmine.any(AlphanumericRule))     
    });  
    
    it('create instance of AlphanumericOrSpaceRule', () => {
        let helper = new MaskHelper('a');        
        expect(helper.rules[0]).toEqual(jasmine.any(AlphanumericOrSpaceRule))     
    });      

    it('create instance of CharacterOrSpaceRule', () => {
        let helper = new MaskHelper('C');        
        expect(helper.rules[0]).toEqual(jasmine.any(CharacterOrSpaceRule))     
    });  
    
    it('create instance of LettersRule', () => {
        let helper = new MaskHelper('L');        
        expect(helper.rules[0]).toEqual(jasmine.any(LettersRule))     
    });  
    
    it('create instance of DigitOrSpaceRule', () => {
        let helper = new MaskHelper('0');        
        expect(helper.rules[0]).toEqual(jasmine.any(DigitOrSpaceRule))     
    }); 
    
    it('create instance of DigitRule', () => {
        let helper = new MaskHelper('9');        
        expect(helper.rules[0]).toEqual(jasmine.any(DigitRule))     
    }); 
    
    it('instance of LettersOrSpacesRule', () => {
        let helper = new MaskHelper('?');        
        expect(helper.rules[0]).toEqual(jasmine.any(LettersOrSpacesRule))     
    }); 
    
    it('create instance of DigitSpaceOrSignRule', () => {
        let helper = new MaskHelper('#');        
        expect(helper.rules[0]).toEqual(jasmine.any(DigitSpaceOrSignRule))     
    }); 
    
    it('create instance of CharacterRule', () => {
        let helper = new MaskHelper('&');        
        expect(helper.rules[0]).toEqual(jasmine.any(CharacterRule))     
    }); 
    
    it('create instance of LiteralRule', () => {
        let helper = new MaskHelper('-');        
        expect(helper.rules[0]).toEqual(jasmine.any(LiteralRule))     
    }); 
    
    it('should parse mask with literal', () => {
        let helper = new MaskHelper('99-9');        
        expect(helper.rules[0]).toEqual(jasmine.any(DigitRule))
        expect(helper.rules[1]).toEqual(jasmine.any(DigitRule))
        expect(helper.rules[2]).toEqual(jasmine.any(LiteralRule))
        expect(helper.rules[3]).toEqual(jasmine.any(DigitRule))
    });

    it('should escape charater known as specifier', () => {
        let helper = new MaskHelper('A|A99');       
        expect(helper.rules[0]).toEqual(jasmine.any(AlphanumericRule))
        expect(helper.rules[1]).toEqual(jasmine.any(LiteralRule))
        expect(helper.rules[2]).toEqual(jasmine.any(DigitRule))
        expect(helper.rules[3]).toEqual(jasmine.any(DigitRule))
    }); 
    
    it('should generate mask placeholder', () => {
        let helper = new MaskHelper('|A-&99X');       
        expect(helper.placeHolder).toEqual('A-___X');
    });

    it('should pass validation if there is no mask.', () => {
        let helper = new MaskHelper(null);

        expect(helper.set('abc')).toEqual(true);
        expect(helper.formattedValue).toEqual('abc');
    });
    
    it('should not pass validation with target string is empty', () => {
        let helper = new MaskHelper('999');

        expect(helper.set(null)).toEqual(false);
        expect(helper.formattedValue).toEqual('');
    });
              
    it('should format when starting with literal', () => {
        let helper = new MaskHelper('|A-L99');

        expect(helper.set('*')).toEqual(false);
        expect(helper.formattedValue).toEqual('');
        expect(helper.set('*D')).toEqual(false);
        expect(helper.formattedValue).toEqual('A-D');
        expect(helper.set('*D3')).toEqual(false);
        expect(helper.formattedValue).toEqual('A-D3');
        expect(helper.set('*D*3')).toEqual(false);
        expect(helper.formattedValue).toEqual('A-D3');          
        expect(helper.set('*D34')).toEqual(true);
        expect(helper.formattedValue).toEqual('A-D34');     
        expect(helper.set('*D34*A')).toEqual(true);
        expect(helper.formattedValue).toEqual('A-D34');        
    });

    it('should format when ending with literal', () => {
        let helper = new MaskHelper('9-L99Z');

        expect(helper.set('*')).toEqual(false);
        expect(helper.formattedValue).toEqual('');
        expect(helper.set('*1')).toEqual(false);
        expect(helper.formattedValue).toEqual('1');
        expect(helper.set('*1*')).toEqual(false);
        expect(helper.formattedValue).toEqual('1');
        expect(helper.set('*12')).toEqual(false);
        expect(helper.formattedValue).toEqual('1');
        expect(helper.set('*12A')).toEqual(false);
        expect(helper.formattedValue).toEqual('1-A');
        expect(helper.set('*12A3')).toEqual(false);
        expect(helper.formattedValue).toEqual('1-A3');        
        expect(helper.set('*12A34')).toEqual(true);
        expect(helper.formattedValue).toEqual('1-A34Z')        
    });    
    
    it('should format when start and end are literals', () => {
        let helper = new MaskHelper('|A-L99X');

        expect(helper.set('*')).toEqual(false);
        expect(helper.formattedValue).toEqual('');
        expect(helper.set('*D')).toEqual(false);
        expect(helper.formattedValue).toEqual('A-D');
        expect(helper.set('*D3')).toEqual(false);
        expect(helper.formattedValue).toEqual('A-D3');
        expect(helper.set('*D*3')).toEqual(false);
        expect(helper.formattedValue).toEqual('A-D3');        
        expect(helper.set('*D*34')).toEqual(true);
        expect(helper.formattedValue).toEqual('A-D34X');
        expect(helper.set('*D*34*')).toEqual(true);
        expect(helper.formattedValue).toEqual('A-D34X');        
    });   
    
    it('should format when start and end are not literals', () => {
        let helper = new MaskHelper('9-99');

        expect(helper.set('*')).toEqual(false);
        expect(helper.formattedValue).toEqual('');
        expect(helper.set('*1')).toEqual(false);
        expect(helper.formattedValue).toEqual('1');
        expect(helper.set('*1*')).toEqual(false);
        expect(helper.formattedValue).toEqual('1');        
        expect(helper.set('*1*2')).toEqual(false);
        expect(helper.formattedValue).toEqual('1-2');
        expect(helper.set('*1*23')).toEqual(true);
        expect(helper.formattedValue).toEqual('1-23');        
        expect(helper.set('*1*234')).toEqual(true);
        expect(helper.formattedValue).toEqual('1-23');                
        expect(helper.set('*1*234A')).toEqual(true);
        expect(helper.formattedValue).toEqual('1-23');                        
    }); 

    it('should format work with custom rule', () => {

        let customRules = [ new GreaterLessThanRule() ]
        let helper = new MaskHelper('|!9-9!9', customRules);

        expect(helper.set('*')).toEqual(false);
        expect(helper.formattedValue).toEqual('');
        expect(helper.set('*1')).toEqual(false);
        expect(helper.formattedValue).toEqual('!1');
        expect(helper.set('*1*')).toEqual(false);
        expect(helper.formattedValue).toEqual('!1');        
        expect(helper.set('*1*2')).toEqual(false);
        expect(helper.formattedValue).toEqual('!1-2');
        expect(helper.set('*1*23')).toEqual(false);
        expect(helper.formattedValue).toEqual('!1-2');        
        expect(helper.set('*1*23<')).toEqual(false);
        expect(helper.formattedValue).toEqual('!1-2<');                
        expect(helper.set('*1*23<4')).toEqual(true);
        expect(helper.formattedValue).toEqual('!1-2<4');                        
        expect(helper.set('*1*23<4A')).toEqual(true);
        expect(helper.formattedValue).toEqual('!1-2<4');                                
    }); 
    
    it('should determine if charater is valid for mask', () => {
        let helper = new MaskHelper('!A-999A?');

        expect(helper.validChar('0')).toEqual(true);
        expect(helper.validChar('C')).toEqual(true);
        expect(helper.validChar(' ')).toEqual(true);
        expect(helper.validChar('!')).toEqual(false);
    });      
    
});
