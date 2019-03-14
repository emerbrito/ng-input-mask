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
    CharacterRule, 
    RegExpRuleBase} from './format-rules';

class GreaterLessThanRule extends RegExpRuleBase {
    constructor() {
        super('!', new RegExp(/^[<>]$/));
    }
}

describe('Format Rules', () => {

    it('StringFormat: create instance of AlphanumericRule', () => {
        let util = new MaskHelper('A');        
        expect(util.rules[0]).toEqual(jasmine.any(AlphanumericRule))     
    });  
    
    it('StringFormat: create instance of AlphanumericOrSpaceRule', () => {
        let util = new MaskHelper('a');        
        expect(util.rules[0]).toEqual(jasmine.any(AlphanumericOrSpaceRule))     
    });      

    it('StringFormat: create instance of CharacterOrSpaceRule', () => {
        let util = new MaskHelper('C');        
        expect(util.rules[0]).toEqual(jasmine.any(CharacterOrSpaceRule))     
    });  
    
    it('StringFormat: create instance of LettersRule', () => {
        let util = new MaskHelper('L');        
        expect(util.rules[0]).toEqual(jasmine.any(LettersRule))     
    });  
    
    it('StringFormat: create instance of DigitOrSpaceRule', () => {
        let util = new MaskHelper('0');        
        expect(util.rules[0]).toEqual(jasmine.any(DigitOrSpaceRule))     
    }); 
    
    it('StringFormat: create instance of DigitRule', () => {
        let util = new MaskHelper('9');        
        expect(util.rules[0]).toEqual(jasmine.any(DigitRule))     
    }); 
    
    it('StringFormat: create instance of LettersOrSpacesRule', () => {
        let util = new MaskHelper('?');        
        expect(util.rules[0]).toEqual(jasmine.any(LettersOrSpacesRule))     
    }); 
    
    it('StringFormat: create instance of DigitSpaceOrSignRule', () => {
        let util = new MaskHelper('#');        
        expect(util.rules[0]).toEqual(jasmine.any(DigitSpaceOrSignRule))     
    }); 
    
    it('StringFormat: create instance of CharacterRule', () => {
        let util = new MaskHelper('&');        
        expect(util.rules[0]).toEqual(jasmine.any(CharacterRule))     
    }); 
    
    it('StringFormat: create instance of LiteralRule', () => {
        let util = new MaskHelper('-');        
        expect(util.rules[0]).toEqual(jasmine.any(LiteralRule))     
    }); 
    
    it('StringFormat: create mask with literal', () => {
        let util = new MaskHelper('99-9');        
        expect(util.rules[0]).toEqual(jasmine.any(DigitRule))
        expect(util.rules[1]).toEqual(jasmine.any(DigitRule))
        expect(util.rules[2]).toEqual(jasmine.any(LiteralRule))
        expect(util.rules[3]).toEqual(jasmine.any(DigitRule))
    });

    it('StringFormat: create mask with scaped charater', () => {
        let util = new MaskHelper('A|A99');       
        expect(util.rules[0]).toEqual(jasmine.any(AlphanumericRule))
        expect(util.rules[1]).toEqual(jasmine.any(LiteralRule))
        expect(util.rules[2]).toEqual(jasmine.any(DigitRule))
        expect(util.rules[3]).toEqual(jasmine.any(DigitRule))
    }); 
    
    it('StringFormat: should generate placeholder', () => {
        let util = new MaskHelper('|A-&99X');       
        expect(util.placeHolder).toEqual('A-___X');
    });

    it('StringFormat: should pass validation without a mask.', () => {
        let util = new MaskHelper(null);

        expect(util.set('abc')).toEqual(true);
        expect(util.formattedValue).toEqual('abc');
    });
    
    it('StringFormat: should not pass validation with empty target.', () => {
        let util = new MaskHelper('999');

        expect(util.set(null)).toEqual(false);
        expect(util.formattedValue).toEqual('');
    });
              
    it('StringFormat: (apply) start with literal', () => {
        let util = new MaskHelper('|A-L99');

        expect(util.set('*')).toEqual(false);
        expect(util.formattedValue).toEqual('');
        expect(util.set('*D')).toEqual(false);
        expect(util.formattedValue).toEqual('A-D');
        expect(util.set('*D3')).toEqual(false);
        expect(util.formattedValue).toEqual('A-D3');
        expect(util.set('*D*3')).toEqual(false);
        expect(util.formattedValue).toEqual('A-D3');          
        expect(util.set('*D34')).toEqual(true);
        expect(util.formattedValue).toEqual('A-D34');     
        expect(util.set('*D34*A')).toEqual(true);
        expect(util.formattedValue).toEqual('A-D34');        
    });

    it('StringFormat: (apply) end with literal', () => {
        let util = new MaskHelper('9-L99Z');

        expect(util.set('*')).toEqual(false);
        expect(util.formattedValue).toEqual('');
        expect(util.set('*1')).toEqual(false);
        expect(util.formattedValue).toEqual('1');
        expect(util.set('*1*')).toEqual(false);
        expect(util.formattedValue).toEqual('1');
        expect(util.set('*12')).toEqual(false);
        expect(util.formattedValue).toEqual('1');
        expect(util.set('*12A')).toEqual(false);
        expect(util.formattedValue).toEqual('1-A');
        expect(util.set('*12A3')).toEqual(false);
        expect(util.formattedValue).toEqual('1-A3');        
        expect(util.set('*12A34')).toEqual(true);
        expect(util.formattedValue).toEqual('1-A34Z')        
    });    
    
    it('StringFormat: (apply) start and end with literals', () => {
        let util = new MaskHelper('|A-L99X');

        expect(util.set('*')).toEqual(false);
        expect(util.formattedValue).toEqual('');
        expect(util.set('*D')).toEqual(false);
        expect(util.formattedValue).toEqual('A-D');
        expect(util.set('*D3')).toEqual(false);
        expect(util.formattedValue).toEqual('A-D3');
        expect(util.set('*D*3')).toEqual(false);
        expect(util.formattedValue).toEqual('A-D3');        
        expect(util.set('*D*34')).toEqual(true);
        expect(util.formattedValue).toEqual('A-D34X');
        expect(util.set('*D*34*')).toEqual(true);
        expect(util.formattedValue).toEqual('A-D34X');        
    });   
    
    it('StringFormat: (apply) start and end with non literals', () => {
        let util = new MaskHelper('9-99');

        expect(util.set('*')).toEqual(false);
        expect(util.formattedValue).toEqual('');
        expect(util.set('*1')).toEqual(false);
        expect(util.formattedValue).toEqual('1');
        expect(util.set('*1*')).toEqual(false);
        expect(util.formattedValue).toEqual('1');        
        expect(util.set('*1*2')).toEqual(false);
        expect(util.formattedValue).toEqual('1-2');
        expect(util.set('*1*23')).toEqual(true);
        expect(util.formattedValue).toEqual('1-23');        
        expect(util.set('*1*234')).toEqual(true);
        expect(util.formattedValue).toEqual('1-23');                
        expect(util.set('*1*234A')).toEqual(true);
        expect(util.formattedValue).toEqual('1-23');                        
    }); 

    it('StringFormat: (apply) custom rule', () => {

        let customRules = [ new GreaterLessThanRule() ]
        let util = new MaskHelper('|!9-9!9', customRules);

        expect(util.set('*')).toEqual(false);
        expect(util.formattedValue).toEqual('');
        expect(util.set('*1')).toEqual(false);
        expect(util.formattedValue).toEqual('!1');
        expect(util.set('*1*')).toEqual(false);
        expect(util.formattedValue).toEqual('!1');        
        expect(util.set('*1*2')).toEqual(false);
        expect(util.formattedValue).toEqual('!1-2');
        expect(util.set('*1*23')).toEqual(false);
        expect(util.formattedValue).toEqual('!1-2');        
        expect(util.set('*1*23<')).toEqual(false);
        expect(util.formattedValue).toEqual('!1-2<');                
        expect(util.set('*1*23<4')).toEqual(true);
        expect(util.formattedValue).toEqual('!1-2<4');                        
        expect(util.set('*1*23<4A')).toEqual(true);
        expect(util.formattedValue).toEqual('!1-2<4');                                
    }); 
    
    it('validChar: should determine if charater is valid for mask.', () => {
        let util = new MaskHelper('!A-999A?');

        expect(util.validChar('0')).toEqual(true);
        expect(util.validChar('C')).toEqual(true);
        expect(util.validChar(' ')).toEqual(true);
        expect(util.validChar('!')).toEqual(false);
    });      
    
});
