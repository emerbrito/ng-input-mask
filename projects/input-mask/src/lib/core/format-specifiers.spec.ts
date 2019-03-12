import { ConstantSpecifier, DigitSpecifier, LetterSpecifier, AlphaNumericSpecifier } from './format-specifiers';

describe('Format Specifiers', () => {

    it('ConstantSpecifier: create with constant', () => {
        const format = new ConstantSpecifier("(");    
        expect(format.invalid).toEqual(false);
        expect(format.specifier).toEqual('(');
        expect(format.valid).toEqual(true);
        expect(format.value()).toEqual('(');
      });

      it('AlphaNumericSpecifier: valid character alpha', () => {    
        const format = new AlphaNumericSpecifier();   
        format.set('b') ;
        expect(format.invalid).toEqual(false);
        expect(format.specifier).toEqual('A');
        expect(format.valid).toEqual(true);
        expect(format.value()).toEqual('b');
      });
      
      it('AlphaNumericSpecifier: valid character number', () => {    
        const format = new AlphaNumericSpecifier();   
        format.set('9') ;
        expect(format.invalid).toEqual(false);
        expect(format.specifier).toEqual('A');
        expect(format.valid).toEqual(true);
        expect(format.value()).toEqual('9');
      });      
    
      it('AlphaNumericSpecifier: invalid character', () => {    
        const format = new AlphaNumericSpecifier();   
        format.set('$') ;
        expect(format.invalid).toEqual(true);
        expect(format.specifier).toEqual('A');
        expect(format.valid).toEqual(false);
        expect(format.value()).toBeUndefined();
      });   
    
      it('AlphaNumericSpecifier: clear value', () => {    
        const format = new AlphaNumericSpecifier();   
        format.set('b') ;
        format.clear();
        expect(format.invalid).toEqual(true);
        expect(format.specifier).toEqual('A');
        expect(format.valid).toEqual(false);
        expect(format.value()).toBeUndefined();
      });      
      
      it('DigitSpecifier: valid digit', () => {    
        const format = new DigitSpecifier();   
        format.set('7') ;
        expect(format.invalid).toEqual(false);
        expect(format.specifier).toEqual('9');
        expect(format.valid).toEqual(true);
        expect(format.value()).toEqual('7');
      });  
      
      it('DigitSpecifier: invalid digit', () => {    
        const format = new DigitSpecifier();   
        format.set('A') ;
        expect(format.invalid).toEqual(true);
        expect(format.specifier).toEqual('9');
        expect(format.valid).toEqual(false);
        expect(format.value()).toBeUndefined();
      }); 
      
      it('DigitSpecifier: clear value', () => {    
        const format = new DigitSpecifier();   
        format.set('7') ;
        format.clear();
        expect(format.invalid).toEqual(true);
        expect(format.specifier).toEqual('9');
        expect(format.valid).toEqual(false);
        expect(format.value()).toBeUndefined();
      }); 
      
      it('LetterSpecifier: valid character', () => {    
        const format = new LetterSpecifier();   
        format.set('b') ;
        expect(format.invalid).toEqual(false);
        expect(format.specifier).toEqual('L');
        expect(format.valid).toEqual(true);
        expect(format.value()).toEqual('b');
      });  
    
      it('LetterSpecifier: invalid character', () => {    
        const format = new LetterSpecifier();   
        format.set('2') ;
        expect(format.invalid).toEqual(true);
        expect(format.specifier).toEqual('L');
        expect(format.valid).toEqual(false);
        expect(format.value()).toBeUndefined();
      });   
    
      it('LetterSpecifier: clear value', () => {    
        const format = new LetterSpecifier();   
        format.set('b') ;
        format.clear();
        expect(format.invalid).toEqual(true);
        expect(format.specifier).toEqual('L');
        expect(format.valid).toEqual(false);
        expect(format.value()).toBeUndefined();
      });
    
});
