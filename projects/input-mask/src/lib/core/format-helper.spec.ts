import { FormatHelper } from './format-helper';

describe('FormatHelper', () => {

    it('Formatter: phone with expected digits', () => {    
        const format = new FormatHelper('(999) 999-9999');   
        const fvalue = format.apply('5555611234');
        expect(fvalue).toEqual('(555) 561-1234');
      });  
    
      it('Formatter: phone with country as constant', () => {    
        const format = new FormatHelper('+1 (999) 999-9999');   
        const fvalue = format.apply('5555611234');
        expect(fvalue).toEqual('+1 (555) 561-1234');
      });
    
      it('Formatter: not enough digits to reach next constant', () => {    
        const format = new FormatHelper('(999) 999-9999');   
        const fvalue = format.apply('64');
        expect(fvalue).toEqual('(64');
      });  
    
      it('Formatter: not enough digits to reach all constants', () => {    
        const format = new FormatHelper('+1 (999) 999-9999');   
        const fvalue = format.apply('5555');
        expect(fvalue).toEqual('+1 (555) 5');
      });
      
      it('Formatter: invalid digits entered after constant position', () => {    
        const format = new FormatHelper('+1 (999) 999-9999');   
        const fvalue = format.apply('555561X');
        expect(fvalue).toEqual('+1 (555) 561');
      }); 
    
      it('Formatter: not enough digits with invalid in between', () => {    
        const format = new FormatHelper('+1 (999) 999-9999');   
        const fvalue = format.apply('555561X1');
        expect(fvalue).toEqual('+1 (555) 561-1');
      }); 
      
      it('Formatter: more digits then expected', () => {    
        const format = new FormatHelper('+1 (999) 999-9999');   
        const fvalue = format.apply('5555611234567');
        expect(fvalue).toEqual('+1 (555) 561-1234');
      });
    
      it('Formatter: more digits then expected with invalid in between', () => {    
        const format = new FormatHelper('+1 (999) 999-9999');   
        const fvalue = format.apply('X@5555EB611V234567');
        expect(fvalue).toEqual('+1 (555) 561-1234');
      });
      
      it('Formatter: with sufix and exact amount of digits', () => {    
        const format = new FormatHelper('M9 999-999 SSP/MG');   
        const fvalue = format.apply('5123456');
        expect(fvalue).toEqual('M5 123-456 SSP/MG');
      });  
    
      it('Formatter: with sufix but not enough digits', () => {    
        const format = new FormatHelper('M9 999-999 SSP/MG');   
        const fvalue = format.apply('512345');
        expect(fvalue).toEqual('M5 123-45');
      });
      
      it('Formatter: with sufix but not enough digits 2', () => {    
        const format = new FormatHelper('M9 999-999 SSP/MG');   
        const fvalue = format.apply('5123X56');
        expect(fvalue).toEqual('M5 123-56');
      });  
      
      it('Formatter: with sufix and extra digits', () => {    
        const format = new FormatHelper('M9 999-999 SSP/MG');   
        const fvalue = format.apply('5123X45B6789');
        expect(fvalue).toEqual('M5 123-456 SSP/MG');
      });
      
      it('Formatter: with sufix but and extra digits', () => {    
        const format = new FormatHelper('M9 999-999 SSP/MG');   
        const fvalue = format.apply('5123456789');
        expect(fvalue).toEqual('M5 123-456 SSP/MG');
      });  
        
});
