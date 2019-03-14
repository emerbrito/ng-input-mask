import { 
    DigitRule, 
    DigitOrSpaceRule, 
    DigitSpaceOrSignRule, 
    LettersRule, 
    LettersOrSpacesRule, 
    CharacterRule, 
    CharacterOrSpaceRule, 
    AlphanumericRule, 
    AlphanumericOrSpaceRule, 
    LiteralRule } from './mask-rules';

describe('Format Rules', () => {

    it('DigitRule: should accept digit', () => {
        const rule = new DigitRule;    
        const value = '9';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.specifier).toEqual('9');
        expect(rule.valid).toEqual(true);        
    });     

    it('DigitRule: should not accept multiple digits', () => {
        const rule = new DigitRule;    
        const value = '90';
        const result = rule.trySet(value);

        expect(result).toEqual(false);
        expect(rule.currentValue).toEqual('');
        expect(rule.valid).toEqual(false);        
    });   

    it('DigitRule: should not accept space', () => {
        const rule = new DigitRule;    
        const value = ' ';
        const result = rule.trySet(value);

        expect(result).toEqual(false);
        expect(rule.currentValue).toEqual('');
        expect(rule.valid).toEqual(false);        
    });  
    
    it('DigitRule: should not accept alphabetic char', () => {
        const rule = new DigitRule;    
        const value = 'A';
        const result = rule.trySet(value);

        expect(result).toEqual(false);
        expect(rule.currentValue).toEqual('');
        expect(rule.valid).toEqual(false);        
    });      

    it('DigitOrSpaceRule: should accept space', () => {
        const rule = new DigitOrSpaceRule;    
        const value = ' ';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.specifier).toEqual('0');
        expect(rule.valid).toEqual(true);        
    });  
    
    it('DigitOrSpaceRule: should not accept multiple spaces', () => {
        const rule = new DigitOrSpaceRule;    
        const value = '  ';
        const result = rule.trySet(value);

        expect(result).toEqual(false);
        expect(rule.currentValue).toEqual('');
        expect(rule.valid).toEqual(false);        
    }); 
    
    it('DigitSpaceOrSignRule: should accept digit', () => {
        const rule = new DigitSpaceOrSignRule;    
        const value = '9';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.specifier).toEqual('#');
        expect(rule.valid).toEqual(true);        
    });  
    
    it('DigitSpaceOrSignRule: should accept space', () => {
        const rule = new DigitSpaceOrSignRule;    
        const value = ' ';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.valid).toEqual(true);        
    }); 
    
    it('DigitSpaceOrSignRule: should accept plus sign', () => {
        const rule = new DigitSpaceOrSignRule;    
        const value = '+';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.valid).toEqual(true);        
    }); 
    
    it('DigitSpaceOrSignRule: should accept minus sign', () => {
        const rule = new DigitSpaceOrSignRule;    
        const value = '-';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.valid).toEqual(true);        
    });
    
    it('DigitSpaceOrSignRule: should not accept alphabetic chars', () => {
        const rule = new DigitSpaceOrSignRule;    
        const value = 'A';
        const result = rule.trySet(value);

        expect(result).toEqual(false);
        expect(rule.currentValue).toEqual('');
        expect(rule.valid).toEqual(false);        
    });  
    
    it('LettersRule: should accept alphabetic characters', () => {
        const rule = new LettersRule;    
        const value = 'A';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.specifier).toEqual('L');
        expect(rule.valid).toEqual(true);        
    }); 
    
    it('LettersRule: should not accept digits', () => {
        const rule = new LettersRule;    
        const value = '9';
        const result = rule.trySet(value);

        expect(result).toEqual(false);
        expect(rule.currentValue).toEqual('');
        expect(rule.valid).toEqual(false);        
    }); 
    
    it('LettersOrSpacesRule: should accept alphabetic characters', () => {
        const rule = new LettersOrSpacesRule;    
        const value = 'A';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.specifier).toEqual('?');
        expect(rule.valid).toEqual(true);        
    }); 
    
    it('LettersOrSpacesRule: should accept space', () => {
        const rule = new LettersOrSpacesRule;    
        const value = ' ';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.valid).toEqual(true);        
    });   
    
    it('LettersOrSpacesRule: should not accept digit', () => {
        const rule = new LettersOrSpacesRule;    
        const value = '9';
        const result = rule.trySet(value);

        expect(result).toEqual(false);
        expect(rule.currentValue).toEqual('');
        expect(rule.valid).toEqual(false);        
    }); 
    
    it('CharacterRule: should accept alphabetic characters', () => {
        const rule = new CharacterRule;    
        const value = 'A';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.specifier).toEqual('&');
        expect(rule.valid).toEqual(true);        
    }); 
    
    it('CharacterRule: should accept digit', () => {
        const rule = new CharacterRule;    
        const value = '9';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.valid).toEqual(true);        
    });  
    
    it('CharacterRule: should accept special char', () => {
        const rule = new CharacterRule;    
        const value = '@';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.valid).toEqual(true);        
    }); 
    
    it('CharacterRule: should not accept space', () => {
        const rule = new CharacterRule;    
        const value = ' ';
        const result = rule.trySet(value);

        expect(result).toEqual(false);
        expect(rule.currentValue).toEqual('');
        expect(rule.valid).toEqual(false);        
    });  
    
    it('CharacterOrSpaceRule: should accept any character', () => {
        const rule = new CharacterOrSpaceRule;    
        const value = '!';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.specifier).toEqual('C');
        expect(rule.valid).toEqual(true);        
    });     
    
    it('CharacterOrSpaceRule: should accept space', () => {
        const rule = new CharacterOrSpaceRule;    
        const value = ' ';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.valid).toEqual(true);        
    }); 

    it('AlphanumericRule: should accept digit', () => {
        const rule = new AlphanumericRule;    
        const value = '9';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.specifier).toEqual('A');
        expect(rule.valid).toEqual(true);        
    }); 
    
    it('AlphanumericRule: should accept letter', () => {
        const rule = new AlphanumericRule;    
        const value = 'A';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.valid).toEqual(true);        
    }); 
    
    it('AlphanumericRule: should not accept space', () => {
        const rule = new AlphanumericRule;    
        const value = ' ';
        const result = rule.trySet(value);

        expect(result).toEqual(false);
        expect(rule.currentValue).toEqual('');
        expect(rule.valid).toEqual(false);        
    });   
    
    it('AlphanumericOrSpaceRule: should accept digit', () => {
        const rule = new AlphanumericOrSpaceRule;    
        const value = '9';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.specifier).toEqual('a');
        expect(rule.valid).toEqual(true);        
    }); 
    
    it('AlphanumericOrSpaceRule: should accept letter', () => {
        const rule = new AlphanumericOrSpaceRule;    
        const value = 'A';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(value);
        expect(rule.valid).toEqual(true);        
    }); 
    
    it('AlphanumericOrSpaceRule: should accept space', () => {
        const rule = new AlphanumericOrSpaceRule;    
        const value = ' ';
        const result = rule.trySet(value);

        expect(result).toEqual(true);
        expect(rule.currentValue).toEqual(' ');
        expect(rule.valid).toEqual(true);        
    });
    
    it('AlphanumericOrSpaceRule: should accept non alpha char', () => {
        const rule = new AlphanumericOrSpaceRule;    
        const value = '@';
        const result = rule.trySet(value);

        expect(result).toEqual(false);
        expect(rule.currentValue).toEqual('');
        expect(rule.valid).toEqual(false);        
    });    

    it('LiteralRule: should match literal', () => {
        const value = ',';
        const rule = new LiteralRule(value);

        expect(rule.currentValue).toEqual(value);
        expect(rule.specifier).toEqual(value);
        expect(rule.valid).toEqual(true);        
    });  

});
